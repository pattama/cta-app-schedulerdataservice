'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');
const Scheduler = require('../scheduler.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Save class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Create extends BaseHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.synchronizer = new Synchronizer(cementHelper, logger);
    this.scheduler = new Scheduler(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    return new Promise((resolve, reject) => {
      const keys = Schedule.keys();
      // TODO - validate payload.schedule. (It can be number or string)
      delete keys.schedule;
      const pattern = {
        type: 'object',
        items: keys,
      };
      pattern.items.id.optional = true;
      const validation = validate(context.data.payload, pattern);

      if (!validation.isValid) {
        const resultsKeysArray = Object.keys(validation.results);
        if (typeof validation.results === 'object'
          && resultsKeysArray.length > 0) {
          for (let i = 0; i < resultsKeysArray.length; i++) {
            const key = resultsKeysArray[i];
            if (!validation.results[key].isValid) {
              const error = validation.results[key].error;
              reject(new Error(`incorrect '${key}' in job payload: ${error}`));
              break;
            }
          }
        } else {
          reject(new Error('missing/incorrect \'payload\' Object in job'));
        }
      }

      resolve({ ok: 1 });
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    const that = this;
    const schedule = new Schedule(context.data.payload);
    this.saveSchedule(schedule)
      .then((scheduleObj) => {
        that.synchronizer.broadcast(context.data.nature.quality, schedule, function(returnCode, brickName, response) {
          if(returnCode !== 'done') {
            that.logger.error(`Cannot broadcast creating schedule ${returnCode} ${response}`);
            context.emit(returnCode, brickName, response);
          } else {
            context.emit(returnCode, that.cementHelper.brickName, scheduleObj);
          }
        });
      })
      .catch((err) => {
        if(err instanceof Error) {
          that.logger.error(`Cannot insert schedule in DB ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          that.logger.error(`Cannot insert schedule in DB ${err.returnCode} ${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      })
  }

  saveSchedule(payload) {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'insertone',
        },
        payload: {
          type: 'schedule',
          content: payload,
        },
      };
      const output = this.cementHelper.createContext(data);
      output.on('done', function(brickname, response) {
        resolve(response);
      });
      output.on('reject', function(brickname, response) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: response
        });
      });
      output.on('error', function(brickname, response) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: response
        });
      });
      output.publish();
    });
  }
}

module.exports = Create;
