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
        type: 'message',
        quality: 'publish',
      },
      payload: {
        nature: {
          type: 'schedule',
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
