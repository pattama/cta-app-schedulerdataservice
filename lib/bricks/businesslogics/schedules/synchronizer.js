/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

/**
 * Business Logic Schedule Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Synchronizer {

  constructor(cementHelper, logger) {
    this.cementHelper = cementHelper;
    this.logger = logger;
  }

  broadcast(action, content) {
    this.logger.info('Broadcast schedule: ', content.id);  // TODO change log level
    const data = {
      nature: {
        type: 'messages',
        quality: 'publish',
      },
      payload: {
        nature: {
          type: 'schedules',
          quality: 'synchronize',
        },
        payload: {
          action: action,
          content: content,
        },
      },
    };
    return new Promise((resolve, reject) => {
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

module.exports = Synchronizer;
