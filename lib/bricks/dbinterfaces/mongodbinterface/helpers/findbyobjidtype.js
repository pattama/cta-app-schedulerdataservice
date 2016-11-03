'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const ObjectID = require('bson').ObjectID;
const validate = require('cta-common').validate;
const scheduleSchema = require('../schemas/schedule.js');

/**
 * Database Interface MongoDB Helper FindById class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class FindByObjIdType extends BaseDBInterfaceHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates abstract query fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
    const job = context.data;
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      if (!validate(job.payload.collection, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'collection\' String in job payload'));
      }

      if (!validate(job.payload.objId, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'id\' String in job payload'));
      }

      if (!validate(job.payload.type, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'type\' String in job payload'));
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
    const mongoDbCollection = context.data.payload.collection;

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: mongoDbCollection,
        action: 'find',
        args: [
          {
            objId: context.data.payload.objId,
            type: context.data.payload.type
          },
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (Array.isArray(response) && response.length > 0) {
        const result = scheduleSchema.toCTAData(response[0]);
        context.emit('done', that.cementHelper.brickName, result);
      } else {
        context.emit('done', that.cementHelper.brickName, null);
      }
    });
    output.on('reject', function(brickname, error) {
      context.emit('reject', brickname, error);
    });
    output.on('error', function(brickname, error) {
      context.emit('error', brickname, error);
    });
    output.publish();
  }
}

module.exports = FindByObjIdType;
