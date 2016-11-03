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
class DeleteByObjIdType extends BaseHelper {

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
    const that = this;
    this.deleteDB(context.data.payload.objId, context.data.payload.type, function(returnCode, brickName, response) {
      if(returnCode === 'done') {
        //scheduler.deleteSchedule(context.data.payload.id);
        if(response === null) {
          context.emit('error', that.cementHelper.brickName, new Error('Schedule not found'));
        } else {
          const responseDB = response;
          context.data.payload.id = responseDB.id;
          that.synchronizer.broadcast(context.data.nature.quality, context.data.payload, function (returnCode, brickName, response) {
            if (returnCode !== 'done') {
              that.logger.error(`Cannot broadcast deleting schedule ${returnCode} ${response}`);
              context.emit(returnCode, brickName, response);
            } else {
              context.emit(returnCode, that.cementHelper.brickName, responseDB);
            }
          });
        }
      } else {
        that.logger.error(`Cannot update schedule to DB ${returnCode} ${response}`);
        context.emit(returnCode, brickName, response);
      }
    });
  }

  deleteDB(objId, type, callback) {
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'deleteonebyobjidtype',
      },
      payload: {
        collection: 'schedule',
        objId: objId,
        type: type
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

module.exports = DeleteByObjIdType;
