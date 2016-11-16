'use strict'
/**
 * Created by U6039884 on 7/26/2016.
 */

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
  setupSchedule(scheduleObj){
    const that = this;
    return schedule.scheduleJob(scheduleObj.id, scheduleObj.schedule, function(){
      that.doTrigger(scheduleObj.id, scheduleObj.rest);
    });
  }

  /**
   * Update a schedule
   * @param scheduleId - unique identifier of schedule
   * @param {Object} scheduleObj - replacement schedule
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was updated successfully
   */
  updateSchedule(scheduleObj){
    //TODO log if cannot cancel or setup
    schedule.cancelJob(scheduleObj.id);
    this.setupSchedule(scheduleObj);
    return true;  //TODO
  }


  /**
   * Cancel a schedule
   * @param scheduleId - unique identifier of schedule
   * @returns {boolean} - returns true if the schedule was cancelled successfully
   */
  deleteSchedule(scheduleId){
    return schedule.cancelJob(scheduleId);
  }


  /**
   * Cancel a schedule
   * @param scheduleId - unique identifier of schedule
   * @returns {boolean} - returns true if the schedule was cancelled successfully
   */
  //static deleteSchedule(scheduleId){
  //  return schedule.cancelJob(scheduleId);
  //}

  doTrigger(scheduleId, restObj) {
    const that = this;
    this.reserveSchedule(scheduleId, function(returnCode, brickName, response) {
      if(returnCode === 'done') {
        if(response !== null) {
          that.logger.info('Trigger schedule:', scheduleId, restObj.url);  //TODO change log level
          that.requester.sendRequest(restObj)
            .catch(function(requestErr) {
              that.logger.error(`Cannot send HTTP request to ${restObj.url}`, requestErr.nestedErr, requestErr.fail);
            });
        } else {
          that.logger.info('Cannot reserve schedule. This schedule already was triggered:', scheduleId); //TODO-change log level
        }
      } else {
        that.logger.error(`Cannot reserve schedule. ${returnCode}:`, response);
      }
    });
  }

  reserveSchedule(scheduleId, callback) {
    const scheduleTime = Date.now();
    const toleranceTime = 5; //sec
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
    }
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
