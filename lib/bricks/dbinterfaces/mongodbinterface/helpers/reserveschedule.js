'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const ObjectID = require('bson').ObjectID;
const validate = require('cta-common').validate;
const ScheduleSchema = require('../schemas/schedule.js');

/**
 * Database Interface MongoDB Helper UpdateOne class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class ReserveSchedule extends BaseDBInterfaceHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates abstract query fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    const job = context.data;
    return new Promise((resolve, reject) => {
      if (!validate(job.payload.toleranceTime, { type: 'number' }).isValid) {
        reject(new Error('missing/incorrect \'toleranceTime\' number in job payload'));
      }

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
    const toleranceTime = context.data.payload.toleranceTime || 55; // sec
    const mongoDbCollection = context.data.payload.type;
    const mongoDbFilter = {
      _id: new ObjectID(context.data.payload.id),
      $or: [
        { scheduledTimestamp: { $exists: false } },
        { scheduledTimestamp: null },
        { scheduledTimestamp: { $lt: Date.now() - (toleranceTime * 1000) } },
      ],
    };
    const mongoDbDocument = {
      $set: new ScheduleSchema(context.data.payload.content),
    };
    const mongoDbOptions = {
      returnOriginal: false,
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

module.exports = ReserveSchedule;
