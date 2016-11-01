'use strict';
var request = require('request');
var defaultLogger = require('cta-logger');

/**
 * Requester Helper class
 */
class Requester {

  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Send REST request
   * @param {Object} restObj
   * @param {String} restObj.url - a URL of rest
   * @param {Object} restObj.headers - a map of headers
   * @param {*} restObj.body - a JSON object or String
   * @returns {Promise}
   */
  sendRequest(restObj) {
    this.logger.debug(`Send HTTP request to ${restObj.url}`);  //TODO - change log level
    return new Promise((resolve, reject) => {
      var newrestObj = JSON.parse(JSON.stringify(restObj));
      if (typeof newrestObj.body === "object") {
        newrestObj.json = true;
      }
      request(newrestObj, function (error, response, body) {
        if (error) {
          reject({nestedErr: error, fail: 500});
        }
        else if (response.statusCode !== 200) {
          reject({nestedErr: error, fail: response.statusCode});
        }
        else {
          resolve();
        }
      });
    });
  }
}

module.exports = Requester;
