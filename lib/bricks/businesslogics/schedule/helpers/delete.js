'use strict';
const BaseHelper = require('../../base/basehelper.js');
const ObjectID = require('bson').ObjectID;
const scheduler = require('../scheduler.js');

/**
 * Business Logic Schedule Helper Delete class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Delete extends BaseHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates Query Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
    const job = context.data;
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      if (!job.payload.hasOwnProperty('id')
        || typeof job.payload.id !== 'string'
        || !(ObjectID.isValid(job.payload.id))) {
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
    this.saveDB(context.data.payload.id, function(returnCode, brickName, response) {
      if(returnCode === 'done') {
        scheduler.cancelSchedule(context.data.payload.id);
      }
      context.emit(returnCode, brickName, response);
    });
  }

  saveDB(scheduleId, callback) {
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
