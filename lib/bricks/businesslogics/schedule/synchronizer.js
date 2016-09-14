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

  broadcast(action, content, callback) {
    this.logger.info('Broadcast schedule: ', content.id);  //TODO change log leve
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
      }
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      callback('done', this.cementHelper.brickName, response);
    });
    output.on('reject', function(brickname, response) {
      callback('reject', brickname, response);
    });
    output.on('error', function(brickname, response) {
      callback('error', brickname, response);
    });
    output.publish();
  }
}

module.exports = Synchronizer;
