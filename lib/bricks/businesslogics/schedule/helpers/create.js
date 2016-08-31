'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Schedule = require('../models/schedule.js');
const scheduler = require('../scheduler.js');
const ObjectID = require('bson').ObjectID;

/**
 * Business Logic Schedule Helper Save class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class CreateHelper extends BaseHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
    // todo: validate execution object fields
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      resolve({ ok: 1 });
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    context.data.payload.id = new ObjectID().toString();
    const schedule = new Schedule(context.data.payload);
    this.saveDB(schedule, function(returnCode, brickname, response) {
      if(returnCode === 'done') {
        scheduler.setupSchedule(schedule);
      }
      context.emit(returnCode, brickname, response);
    });
  }

  saveDB(payload, callback) {
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
      callback('done', this.cementHelper.brickName, response);
    });
    output.on('reject', function(brickname, response) {
      callback('reject', brickname, response);
    });
    output.on('error', function(brickname, response) {
      callback('error', brickname, response);
    });
    output.publish();
  }
}

module.exports = CreateHelper;
