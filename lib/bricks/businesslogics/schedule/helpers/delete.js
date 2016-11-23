'use strict';
const BaseHelper = require('../../base/basehelper.js');
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
    return this.deleteById(context.data.payload.id)
      .then((deletedSchedule) => {
        that.synchronizer.broadcast(context.data.nature.quality, context.data.payload)
          .then(() => {
            context.emit('done', that.cementHelper.brickName, deletedSchedule);
          })
          .catch((err) => {
            that.logger.error('Cannot broadcast deleting schedule' +
              `${err.returnCode} ${err.response}`);
            context.emit(err.returnCode, err.brickName, err.response);
          });
      })
      .catch((err) => {
        if (err instanceof Error) {
          that.logger.error(`Cannot delete schedule in DB ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          that.logger.error('Cannot delete schedule in DB' +
            `${err.returnCode} ${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      });
  }

  deleteById(scheduleId) {
    return new Promise((resolve, reject) => {
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
}

module.exports = Delete;
