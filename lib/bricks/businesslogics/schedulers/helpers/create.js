'use strict';
const BaseHelper = require('../../base/basehelper.js');
const scheduler = require('../scheduler.js');
const ObjectID = require('bson').ObjectID;

/**
 * Business Logic Execution Helper Save class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class CreateHelper extends BaseHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates Execution Model fields
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
    const that = this;
    context.data.payload.id = new ObjectID().toString();
    this.saveDB(context.data.payload, function(response) {
      scheduler.postASchedule(context.data.payload);
      context.emit('done', that.cementHelper.brickName, response);
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
    output.publish();
    output.on('done', function(brickname, response) {
      callback(response);
    });
  }
}

module.exports = CreateHelper;
