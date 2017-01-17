'use strict';

const schedule = require('node-schedule');
const Requester = require('./requester');

/**
 * Scheduler Helper class
 */
class Scheduler {

  constructor(cementHelper, logger, name) {
    this.requester = new Requester(logger);
    this.cementHelper = cementHelper;
    this.logger = logger;
    this.name = name;
  }

  /**
   * Set up a schedule
   * @param scheduleObj
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was setup successfully
   */
  setupSchedule(scheduleObj) {
    const that = this;
    return schedule.scheduleJob(scheduleObj.id, scheduleObj.schedule, function() {
      that.doTrigger(scheduleObj.id, scheduleObj.rest);
    });
  }

  /**
   * Update a schedule
   * @param {Object} scheduleObj - replacement schedule
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was updated successfully
   */
  updateSchedule(scheduleObj) {
    if (schedule.cancelJob(scheduleObj.id)) {
      return this.setupSchedule(scheduleObj);
    }
    // todo - need log here
    return null;
  }

  /**
   * Upsert a schedule
   * @param {Object} scheduleObj - replacement schedule
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was updated successfully
   */
  upsertSchedule(scheduleObj) {
    if (!this.isScheduled(scheduleObj.id)) {
      return this.setupSchedule(scheduleObj);
    }
    return this.updateSchedule(scheduleObj);
  }

  /**
   * Is scheduled? check if schedule's already scheduled
   * @param scheduleId
   * @returns {boolean}
   */
  isScheduled(scheduleId) {
    const scheduledJobs = schedule.scheduledJobs;
    return scheduleId in scheduledJobs && scheduledJobs.hasOwnProperty(scheduleId);
  }


  /**
   * Cancel a schedule
   * @param scheduleId - unique identifier of schedule
   * @returns {boolean} - returns true if the schedule was cancelled successfully
   */
  deleteSchedule(scheduleId) {
    return schedule.cancelJob(scheduleId);
  }

  doTrigger(scheduleId, restObj) {
    const that = this;
    this.reserveSchedule(scheduleId, function(returnCode, brickName, response) {
      if (returnCode === 'done') {
        if (response !== null) {
          // TODO change log level
          that.logger.info('Trigger schedule:', scheduleId, restObj.url);
          that.requester.sendRequest(restObj)
            .catch(function(requestErr) {
              that.logger.error(`Cannot send HTTP request to ${restObj.url}`,
                requestErr.nestedErr, requestErr.fail);
            });
        } else {
          // TODO-change log level
          that.logger.info('Cannot reserve schedule. This schedule already was triggered:',
            scheduleId);
        }
      } else {
        that.logger.error(`Cannot reserve schedule. ${returnCode}:`, response);
      }
    });
  }

  reserveSchedule(scheduleId, callback) {
    const scheduleTime = Date.now();
    const toleranceTime = 5; // seconds
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'reserveschedule',
      },
      payload: {
        type: 'schedule',
        id: scheduleId,
        toleranceTime: toleranceTime,
        content: {
          scheduledBy: this.name,
          scheduledTimestamp: scheduleTime,
        },
      },
    };
    const context = this.cementHelper.createContext(data);
    context.publish();
    context.on('done', function(brickName, response) {
      callback('done', brickName, response);
    });
    context.on('reject', function(brickName, error) {
      callback('reject', brickName, error);
    });
    context.on('error', function(brickName, error) {
      callback('error', brickName, error);
    });
  }
}

module.exports = Scheduler;
