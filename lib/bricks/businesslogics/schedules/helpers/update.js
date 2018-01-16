/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const _ = require('lodash');
const Helper = require('./helper.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper Update class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Update extends Helper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.synchronizer = new Synchronizer(cementHelper, logger);
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
      const updatePattern = {
        type: 'object',
        items: keys,
      };
      updatePattern.items.id.optional = false;
      const validation = validate(context.data.payload, updatePattern);

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
      .then(() => this.updateSchedule(context.data.payload))
      .then((scheduleObj) => {
        that.synchronizer.broadcast(context.data.nature.quality, scheduleObj)
          .then(() => {
            context.emit('done', that.cementHelper.brickName, scheduleObj);
          })
          .catch((err) => {
            that.logger.error('Cannot broadcast updating schedule ' +
              `${err.returnCode} ${err.response}`);
            context.emit(err.returnCode, err.brickName, err.response);
          });
      })
      .catch((err) => {
        if (err instanceof Error) {
          that.logger.error(`Cannot update schedule in DB ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          that.logger.error(`Cannot update schedule in DB ${err.returnCode} ` +
            `${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      });
  }

  updateSchedule(payload) {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'updateone',
        },
        payload: {
          type: 'schedules',
          id: payload.id,
          content: _.omit(payload, ['id']),
        },
      };
      const updateContext = this.cementHelper.createContext(data);
      updateContext.on('done', function(brickName, response) {
        resolve(response);
      });
      updateContext.on('reject', function(brickName, error) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: error,
        });
      });
      updateContext.on('error', function(brickName, error) {
        reject({
          returnCode: 'error',
          brickName: brickName,
          response: error,
        });
      });
      updateContext.publish();
    });
  }
}

module.exports = Update;
