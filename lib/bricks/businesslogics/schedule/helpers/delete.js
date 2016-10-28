'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Scheduler = require('../scheduler.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Delete class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Delete extends BaseHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.synchronizer = new Synchronizer(cementHelper, logger);
    this.scheduler = new Scheduler(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Query Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    const job = context.data;
    return new Promise((resolve, reject) => {
      if (!validate(job.payload.id, { type: 'identifier' }).isValid) {
        reject(new Error('missing/incorrect \'id\' String value of ObjectID in job payload'));
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
    this.deleteDB(context.data.payload.id, function(returnCode, brickName, response) {
      if(returnCode === 'done') {
        //scheduler.deleteSchedule(context.data.payload.id);
        that.synchronizer.broadcast(context.data.nature.quality, context.data.payload, function(returnCode, brickName, response) {
          if(returnCode !== 'done') {
            that.logger.error(`Cannot broadcast deleting schedule ${returnCode} ${response}`);
            context.emit(returnCode, brickName, response);
          } else {
            context.emit(returnCode, that.cementHelper.brickName, response);
          }
        });
      } else {
        that.logger.error(`Cannot update schedule to DB ${returnCode} ${response}`);
        context.emit(returnCode, brickName, response);
      }
    });
  }

  deleteDB(scheduleId, callback) {
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'deleteone',
      },
      payload: {
        type: 'schedule',
        id: scheduleId,
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      callback('done', this.cementHelper.brickName, response);
    });
    output.on('reject', function(brickname, error) {
      callback('reject', brickname, error);
    });
    output.on('error', function(brickname, error) {
      callback('error', brickname, error);
    });
    output.publish();
  }
}

module.exports = Delete;
