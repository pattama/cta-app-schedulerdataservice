'use strict';

const Base = require('../base');
const CreateHelper = require('./helpers/create');
const DeleteHelper = require('./helpers/delete');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const UpdateHelper = require('./helpers/update');
const scheduler = require('./scheduler');

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
  }

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

  setupAllSchedules(schedules) {
    const that = this;
    if(!Array.isArray(schedules)) {
      this.logger.error('Schedules object is not an array:', schedules);
      return;
    }
    let errorNum = 0;
    schedules.forEach(function(scheduleObj) {
      if(!scheduler.setupSchedule(scheduleObj)) {
        that.logger.error('Cannot setup a schedule:', scheduleObj);
        errorNum++;
      }
    });
    if(errorNum === 0) {
      this.logger.info(`All ${schedules.length} schedules was setup`);
    } else {
      this.logger.error(`Cannot setup ${errorNum} schedules out of ${schedules.length}`);
    }
  }

  getAllSchedules(callback) {
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'find',
      },
      payload: {
        type: 'schedule',
        filter: {},
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
