'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const sheduleSchema = require('../schemas/schedule.js');

/**
 * Database Interface MongoDB Helper DeleteOne class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class DeleteOneByObjIdType extends BaseDBInterfaceHelper {

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
        reject(new Error('missing/incorrect \'objId\' String in job payload'));
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
        action: 'findOneAndDelete',
        args: [
          {
            objId: context.data.payload.objId,
            type: context.data.payload.type,
          },
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (response.ok) {
        if (response.hasOwnProperty('value') && response.value !== null) {
          const object = sheduleSchema.toCTAData(response.value);
          context.emit('done', that.cementHelper.brickName, object);
        } else {
          context.emit('done', that.cementHelper.brickName, null);
        }
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

module.exports = DeleteOneByObjIdType;
