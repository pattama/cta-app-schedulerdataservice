'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');
const Scheduler = require('../scheduler.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Update class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Update extends BaseHelper {

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
      const updatePattern = {
        type: 'object',
        items: Schedule.queryKeys(),
      };
      updatePattern.items.id.optional = false;
      const validation = validate(context.data.payload, updatePattern);

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
    this.updateDB(context.data.payload, function(returnCode, brickname, response) {
      if(returnCode === 'done') {
        //const schedule = new Schedule(context.data.payload);
        //that.scheduler.updateSchedule(schedule);
        that.synchronizer.broadcast(context.data.nature.quality, context.data.payload);
      }
      context.emit(returnCode, brickname, response);
    });
  }

  updateDB(payload, callback) {
    const that = this;
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'updateone',
      },
      payload: {
        type: 'schedule',
        id: payload.id,
        content: payload.content,
      },
    };
    const updateContext = this.cementHelper.createContext(data);
    updateContext.on('done', function(brickname, response) {
      callback('done', that.cementHelper.brickName, response);
    });
    updateContext.on('reject', function(brickname, error) {
      callback('reject', brickname, error);
    });
    updateContext.on('error', function(brickname, error) {
      callback('error', brickname, error);
    });
    updateContext.publish();
  }
}

module.exports = Update;
