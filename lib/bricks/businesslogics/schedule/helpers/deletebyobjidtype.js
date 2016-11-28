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
    const objId = context.data.payload.objId;
    const type = context.data.payload.type;
    return this.deleteDB(objId, type)
      .then((deletedSchedule) => {
        if (deletedSchedule === null) {
          throw new Error('Schedule not found');
        }
        const quality = context.data.nature.quality;
        this.synchronizer.broadcast(quality, deletedSchedule)
          .then(() => {
            context.emit('done', this.cementHelper.brickName, deletedSchedule);
          })
          .catch((err) => {
            this.logger.error('Cannot broadcast deleting schedule by objid/type ' +
              `${err.returnCode} ${err.response}`);
            context.emit(err.returnCode, err.brickName, err.response);
          });
      })
      .catch((err) => {
        if (err instanceof Error) {
          this.logger.error(`Cannot delete schedule by objid/type in DB ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          this.logger.error('Cannot delete schedule by objid/type in DB' +
            `${err.returnCode} ${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      });
  }

  deleteDB(objId, type) {
    return new Promise((resolve, reject) => {
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
      output.on('done', function (brickName, response) {
        resolve(response);
      });
      output.on('reject', function (brickName, error) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: error,
        });
      });
      output.on('error', function (brickName, error) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: error,
        });
      });
      output.publish();
    });
  }
}

module.exports = DeleteByObjIdType;
