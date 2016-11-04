'use strict';

const Base = require('../base');
const CreateHelper = require('./helpers/create');
const DeleteHelper = require('./helpers/delete');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const UpdateHelper = require('./helpers/update');
const SynchronizeHelper = require('./helpers/synchronize');
const Scheduler = require('./scheduler.js');
const CtaError = require('./ctaerror.js');

/**
 * Business Logic Schedule class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class Schedule extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    this.helpers.set('create', new CreateHelper(this.cementHelper, this.logger));
    this.deleteHelper = new DeleteHelper(this.cementHelper, this.logger);
    this.helpers.set('delete', this.deleteHelper);
    this.helpers.set('find', new FindHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyid', new FindByIdHelper(this.cementHelper, this.logger));
    this.helpers.set('update', new UpdateHelper(this.cementHelper, this.logger));
    this.helpers.set('synchronize', new SynchronizeHelper(this.cementHelper, this.logger));
  }

  /**
   * Start method. Query all schedules then setup all schedules
   *
   */
  start() {
    return this.getAllSchedules()
      .then((schedules) => {
        this.setupAllSchedules(schedules);
      })
      .catch((err) => {
        this.logger.error(`Cannot setup schedules from DB. ${err}`);
      });
  }

  /**
   * Setup all given schedules
   * @param {Array} schedules - an array of scheduleObj
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   */
  setupAllSchedules(schedules) {
    const that = this;
    // check parameter
    if(!Array.isArray(schedules)) {
      this.logger.error('Schedules object is not an array:', schedules);
      return;
    }

    // work
    let errorNum = 0, overdueNum = 0;
    const scheduler = new Scheduler(/*'Scheduler 1', */this.cementHelper, this.logger);
    schedules.forEach(function(scheduleObj) {
      if(!scheduler.setupSchedule(scheduleObj)) {
        if(that.isScheduleOverdue(scheduleObj)) {
          that.logger.info('Deleting schedule because it\'s overdue:', scheduleObj.id);
          that.deleteHelper.deleteDB(scheduleObj.id, function(returnCode, brickName, response) {
            if(returnCode !== 'done') {
              that.logger.error(`Cannot delete schedule: ${scheduleObj.id} ${returnCode} ${brickName}`, response);
            }
          });
          overdueNum++;
        } else {
          that.logger.error('Cannot setup a schedule:', scheduleObj);
          errorNum++;
        }
      }
    });

    //log
    if(overdueNum > 0) {
      this.logger.info(`There are ${overdueNum} schedules overdue`);
    }
    if(errorNum === 0) {
      this.logger.info(`Schedules was setup ${schedules.length - overdueNum} out of ${schedules.length}`);
    } else {
      this.logger.error(`Cannot setup ${errorNum} schedules out of ${schedules.length}`);
    }
  }

  isScheduleOverdue(scheduleObj) {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return isNumber(scheduleObj.schedule) && scheduleObj.schedule < new Date().getTime()
  }

  /**
   * Query all schedules from DB
   * @param {Function(returnCode, response)} - a callback function
   */
  getAllSchedules() {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'find',
        },
        payload: {
          type: 'schedule',
          filter: { limit: 0, offset: 0 },
          query: {},
        },
      };
      const output = this.cementHelper.createContext(data);
      output.on('done', function(brickName, response) {
        resolve(response);
      });
      output.on('reject', function(brickName, error) {
        reject(new CtaError('reject', brickName, error));
      });
      output.on('error', function(brickName, error) {
        reject(new CtaError('error', brickName, error));
      });
      output.publish();
    });
  }
}

module.exports = Schedule;
