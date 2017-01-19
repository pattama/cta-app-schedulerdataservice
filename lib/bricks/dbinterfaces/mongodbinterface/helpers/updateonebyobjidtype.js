'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const ScheduleSchema = require('../schemas/schedule.js');

/**
 * Database Interface MongoDB Helper UpdateOne class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class UpdateOneByObjIdType extends BaseDBInterfaceHelper {

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

      if (!validate(job.payload.content, { type: 'object' }).isValid) {
        reject(new Error('missing/incorrect \'content\' Object in job payload'));
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
    const mongoDbFilter = {
      objId: context.data.payload.objId,
      type: context.data.payload.type,
    };
    const mongoDbDocument = {
      $set: new ScheduleSchema(context.data.payload.content),
    };
    const mongoDbOptions = {
      returnOriginal: false,
      upsert: !!context.data.payload.upsert,
    };

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: mongoDbCollection,
        action: 'findOneAndUpdate',
        args: [
          mongoDbFilter,
          mongoDbDocument,
          mongoDbOptions,
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (response.ok) {
        if (response.hasOwnProperty('value') && response.value !== null) {
          const object = ScheduleSchema.toCTAData(response.value);
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

module.exports = UpdateOneByObjIdType;
