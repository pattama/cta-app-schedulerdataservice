'use strict';

const Base = require('../base');
const CreateHelper = require('./helpers/create');
const DeleteHelper = require('./helpers/delete');
const DeleteByObjIdTypeHelper = require('./helpers/deletebyobjidtype');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const FindByObjIdTypeHelper = require('./helpers/findbyobjidtype');
const UpdateHelper = require('./helpers/update');
const UpdateByObjIdTypeHelper = require('./helpers/updatebyobjidtype');
const SynchronizeHelper = require('./helpers/synchronize');
const Scheduler = require('./scheduler.js');
const os = require('os');

/**
 * Business Logic Schedule class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class Schedules extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    this.scheduler = new Scheduler(this.cementHelper, this.logger, this.getSchedulerName());
    this.helpers.set('create', new CreateHelper(this.cementHelper, this.logger, this.scheduler));
    this.deleteHelper = new DeleteHelper(this.cementHelper, this.logger);
    this.helpers.set('delete', this.deleteHelper);
    this.helpers.set('deletebyobjidtype', new DeleteByObjIdTypeHelper(this.cementHelper,
      this.logger));
    this.helpers.set('find', new FindHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyid', new FindByIdHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyobjidtype', new FindByObjIdTypeHelper(this.cementHelper, this.logger));
    this.helpers.set('update', new UpdateHelper(this.cementHelper, this.logger));
    this.helpers.set('updatebyobjidtype', new UpdateByObjIdTypeHelper(this.cementHelper,
      this.logger));
    this.helpers.set('synchronize', new SynchronizeHelper(this.cementHelper,
      this.logger, this.scheduler));
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
        if (err instanceof Error) {
          this.logger.error(`Cannot setup schedules from DB. ${err}`);
        } else {
          this.logger.error(`Cannot setup schedules from DB. ${err.returnCode}:` +
            `${err.brickName} ${err.response}`);
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
    // check parameter
    if (!Array.isArray(schedules)) {
      this.logger.error('Schedules object is not an array:', schedules);
      throw new Error('Schedules object is not an array');
    }

    // work
    let errorNum = 0;
    let overdueNum = 0;
    schedules.forEach(function(scheduleObj) {
      if (!that.scheduler.setupSchedule(scheduleObj)) {
        if (that.isScheduleOverdue(scheduleObj)) {
          that.logger.info('Deleting schedule because it\'s overdue:', scheduleObj.id);
          that.deleteSchedule(scheduleObj);
          overdueNum++;
        } else {
          that.logger.error('Cannot setup a schedule:', scheduleObj);
          errorNum++;
        }
      }
    });

    // log
    if (overdueNum > 0) {
      this.logger.info(`There are ${overdueNum} schedules overdue`);
    }
    if (errorNum === 0) {
      this.logger.info(`Schedules was setup ${schedules.length - overdueNum} ` +
        `out of ${schedules.length}`);
    } else {
      this.logger.error(`Cannot setup ${errorNum} schedules out of ${schedules.length}`);
    }
  }

  isScheduleOverdue(scheduleObj) {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return isNumber(scheduleObj.schedule) && scheduleObj.schedule < new Date().getTime();
  }

  deleteSchedule(scheduleObj) {
    return this.deleteHelper.deleteById(scheduleObj.id)
      .catch((err) => {
        this.logger.error(`Cannot delete schedule: ${scheduleObj.id} ${err.returnCode}:` +
          `${err.brickName}`, err.response);
      });
  }

  /**
   * Query all schedules from DB
   *
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
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: error,
        });
      });
      output.on('error', function(brickName, error) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: error,
        });
      });
      output.publish();
    });
  }

  getSchedulerName() {
    if (this.configuration.properties.name) {
      return this.configuration.properties.name;
    }
    return os.hostname();
  }
}

module.exports = Schedules;
