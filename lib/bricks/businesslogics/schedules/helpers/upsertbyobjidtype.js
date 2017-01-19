'use strict';

const _ = require('lodash');
const Helper = require('./helper.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');
const Scheduler = require('../scheduler.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Update class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class UpsertByObjIdType extends Helper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.synchronizer = new Synchronizer(cementHelper, logger);
    this.scheduler = new Scheduler(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    return new Promise((resolve, reject) => {
      const keys = Schedule.queryKeys();
      delete keys.schedule;
      const upsertPattern = {
        type: 'object',
        items: keys,
      };
      upsertPattern.items.objId.optional = false;
      upsertPattern.items.type.optional = false;
      const validation = validate(context.data.payload, upsertPattern);

      if (!validation.isValid) {
        const resultsKeysArray = Object.keys(validation.results);
        if (typeof validation.results === 'object'
          && resultsKeysArray.length > 0) {
          for (let i = 0; i < resultsKeysArray.length; i += 1) {
            const key = resultsKeysArray[i];
            if (!validation.results[key].isValid) {
              const error = validation.results[key].error;
              reject(new Error(`incorrect '${key}' in job payload: ${error}`));
              break;
            }
          }
        } else {
          reject(new Error('missing/incorrect \'payload\' Object in job'));
        }
      }

      if (context.data.payload.schedule) {
        const schedule = context.data.payload.schedule;
        if (typeof schedule !== 'string' && typeof schedule !== 'number') {
          reject(new Error('incorrect \'schedule\' in job payload: invalid type for value ' +
            `"${schedule}", expected "number" or "string"`));
        } else {
          Schedule.validateSchedule(context.data.payload.schedule);
        }
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
    return this.acknowledgeMessage(context)
      .then(() => this.upsertDB(context.data.payload))
      .then((upsertdScheduleObj) => {
        if (upsertdScheduleObj === null) {
          context.emit('error', that.cementHelper.brickName, new Error('Schedule not found'));
        } else {
          that.synchronizer.broadcast('upsert', upsertdScheduleObj)
            .then(() => {
              context.emit('done', that.cementHelper.brickName, upsertdScheduleObj);
            })
            .catch((err) => {
              that.logger.error('Cannot broadcast updating schedule ' +
                `${err.returnCode} ${err.response}`);
              context.emit(err.returnCode, err.brickName, err.response);
            });
        }
      })
      .catch((err) => {
        that.logger.error(`Cannot upsert schedule to DB ${err.returnCode} ${err.response}`);
        context.emit(err.returnCode, err.brickName, err.response);
      });
  }

  upsertDB(payload) {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'updateonebyobjidtype',
        },
        payload: {
          collection: 'schedule',
          objId: payload.objId,
          type: payload.type,
          content: _.omit(payload, ['id', 'objId', 'type']),
          upsert: true,
        },
      };
      const upsertContext = this.cementHelper.createContext(data);
      upsertContext.on('done', function(brickName, response) {
        resolve(response);
      });
      upsertContext.on('reject', function(brickName, error) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: error,
        });
      });
      upsertContext.on('error', function(brickName, error) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: error,
        });
      });
      upsertContext.publish();
    });
  }
}

module.exports = UpsertByObjIdType;
