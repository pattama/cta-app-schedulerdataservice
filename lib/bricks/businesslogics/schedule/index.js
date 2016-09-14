'use strict';

const Base = require('../base');
const CreateHelper = require('./helpers/create');
const DeleteHelper = require('./helpers/delete');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const UpdateHelper = require('./helpers/update');
const SynchronizeHelper = require('./helpers/synchronize');
const Scheduler = require('./scheduler.js');

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
    this.helpers.set('delete', new DeleteHelper(this.cementHelper, this.logger));
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
    const that = this;
    this.getAllSchedules(function(returnCode, response) {
      if(returnCode === 'done') {
        that.setupAllSchedules(response);
      } else {
        that.logger.error(`Cannot query schedules from DB. ${returnCode}: ${response}`);
      }
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
    if(!Array.isArray(schedules)) {
      this.logger.error('Schedules object is not an array:', schedules);
      return;
    }
    let errorNum = 0;
    const scheduler = new Scheduler(/*'Scheduler 1', */this.cementHelper, this.logger);
    schedules.forEach(function(scheduleObj) {
      if(!scheduler.setupSchedule(scheduleObj)) {
        that.logger.error('Cannot setup a schedule:', scheduleObj);
        errorNum++;
      }
    });
    if(errorNum === 0) {
      this.logger.info(`All schedules was setup: ${schedules.length}`);
    } else {
      this.logger.error(`Cannot setup ${errorNum} schedules out of ${schedules.length}`);
    }
  }

  /**
   * Query all schedules from DB
   * @param {Function(returnCode, response)} - a callback function
   */
  getAllSchedules(callback) {
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
    output.on('done', function(brickname, response) {
      callback('done', response);
    });
    output.on('reject', function(brickname, error) {
      callback('reject', error);
    });
    output.on('error', function(brickname, error) {
      callback('error', error);
    });
    output.publish();
  }
}

module.exports = Schedule;
