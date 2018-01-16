/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const BaseHelper = require('../../base/basehelper.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Schedule Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class FindByObjIdType extends BaseHelper {

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
    return this.findByObjIdType(context.data.payload.objId, context.data.payload.type)
      .then((scheduleObj) => {
        context.emit('done', this.cementHelper.brickName, scheduleObj);
      })
      .catch((err) => {
        if (err instanceof Error) {
          this.logger.error(`Cannot find schedule by objId/type: ${err}`);
          context.emit('error', this.cementHelper.brickName, err);
        } else {
          this.logger.error(`Cannot find schedule by objId/type ${err.returnCode}: ` +
            `${err.brickName} ${err.response}`);
          context.emit(err.returnCode, err.brickName, err.response);
        }
      });
  }

  findByObjIdType(objId, type) {
    return new Promise((resolve, reject) => {
      const data = {
        nature: {
          type: 'dbinterface',
          quality: 'findbyobjidtype',
        },
        payload: {
          collection: 'schedules',
          objId: objId,
          type: type,
        },
      };
      const output = this.cementHelper.createContext(data);
      output.on('done', function(brickName, response) {
        resolve(response);
      });
      output.on('reject', function(brickName, error) {
        reject({
          returnCode: 'reject',
          brickName: brickName,
          response: error,
        });
      });
      output.on('error', function(brickName, error) {
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

module.exports = FindByObjIdType;
