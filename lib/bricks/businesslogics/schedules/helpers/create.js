/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const Helper = require('./helper.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');
const Synchronizer = require('../synchronizer.js');
const FindByObjIdTypeHelper = require('./findbyobjidtype.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Save class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Create extends Helper {

  constructor(cementHelper, logger, scheduler) {
    super(cementHelper, logger);
    this.synchronizer = new Synchronizer(cementHelper, logger);
    this.scheduler = scheduler;
    this.findByObjIdTypeHelper = new FindByObjIdTypeHelper(cementHelper, logger);
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
      const keys = Schedule.keys();
      delete keys.schedule;
      const pattern = {
        type: 'object',
        items: keys,
      };
      pattern.items.id.optional = true;
      const validation = validate(context.data.payload, pattern);

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

      const schedule = context.data.payload.schedule;
      if (typeof schedule !== 'string' && typeof schedule !== 'number') {
        reject(new Error('incorrect \'schedule\' in job payload: invalid type for value ' +
          `"${schedule}", expected "number" or "string"`));
      } else {
        Schedule.validateSchedule(context.data.payload.schedule);
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
    const schedule = new Schedule(context.data.payload);
    return this.acknowledgeMessage(context)
      .then(() => this.saveScheduleIfNotExists(schedule))
    // return this.saveScheduleIfNotExists(schedule)
      .then((scheduleObj) => {
        that.synchronizer.broadcast(context.data.nature.quality, schedule)
          .then(() => {
            context.emit('done', that.cementHelper.brickName, scheduleObj);
          })
          .catch((err) => {
            that.logger.error('Cannot broadcast creating schedule' +
              `${err.returnCode} ${err.response}`);
            context.emit(err.returnCode, err.brickName, err.response);
          });
      })
      .catch((err) => {
        if (err instanceof Error) {
          that.logger.error(`Cannot insert schedule in DB ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          that.logger.error('Cannot insert schedule in DB' +
            `${err.returnCode} ${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      });
  }

  saveScheduleIfNotExists(payload) {
    if (payload.objId || payload.type) {
      return this.findByObjIdTypeHelper.findByObjIdType(payload.objId, payload.type)
        .then((scheduleObj) => {
          if (scheduleObj === null) {
            return this.saveSchedule(payload);
          }
          throw new Error('objId and type is duplicate');
        });
    }
    return this.saveSchedule(payload);
  }

  saveSchedule(payload) {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'insertone',
        },
        payload: {
          type: 'schedules',
          content: payload,
        },
      };
      const output = this.cementHelper.createContext(data);
      output.on('done', function(brickName, response) {
        resolve(response);
      });
      output.on('reject', function(brickName, response) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: response,
        });
      });
      output.on('error', function(brickName, response) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: response,
        });
      });
      output.publish();
    });
  }
}

module.exports = Create;
