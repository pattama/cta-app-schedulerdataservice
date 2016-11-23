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
    const objId = context.data.payload.objId;
    const type = context.data.payload.type;
    this.deleteDB(objId, type, function(returnCode, brickName, scheduleObj) {
      if (returnCode === 'done') {
        if (scheduleObj === null) {
          context.emit('error', that.cementHelper.brickName, new Error('Schedule not found'));
        } else {
          const responseDB = scheduleObj;
          const quality = context.data.nature.quality;
          that.synchronizer.broadcast(quality, scheduleObj,
            function (returnCode2, brickName2, response) {
              if (returnCode2 !== 'done') {
                that.logger.error(`Cannot broadcast deleting schedule ${returnCode2} ${response}`);
                context.emit(returnCode2, brickName2, response);
              } else {
                context.emit(returnCode2, that.cementHelper.brickName, responseDB);
              }
            });
        }
      } else {
        that.logger.error(`Cannot update schedule to DB ${returnCode} ${scheduleObj}`);
        context.emit(returnCode, brickName, scheduleObj);
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

module.exports = DeleteByObjIdType;
