'use strict';
const BaseHelper = require('../../base/basehelper.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class FindByObjIdType extends BaseHelper {

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
      if (!validate(job.payload.objId, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'objId\' String value in job payload'));
      }
      if (!validate(job.payload.type, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'type\' String value in job payload'));
      }
      resolve({ ok: 1 });
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    this.findDB(context.data.payload.objId, context.data.payload.type, function(returnCode, brickName, response) {
      context.emit(returnCode, brickName, response);
    });
  }

  findDB(objId, type, callback) {
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'findbyobjidtype',
      },
      payload: {
        collection: 'schedule',
        objId: objId,
        type: type,
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

module.exports = FindByObjIdType;
