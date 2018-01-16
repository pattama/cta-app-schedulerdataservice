/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const request = require('request');

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
    const that = this;
    // TODO - change log level
    this.logger.debug(`Send HTTP request to ${restObj.url}`);
    return new Promise((resolve, reject) => {
      const newrestObj = JSON.parse(JSON.stringify(restObj));
      if (typeof newrestObj.body === 'object') {
        newrestObj.json = true;
      }
      request(newrestObj, function (error, response, body) {
        if (error) {
          // TODO - add body to rejection
          reject({ nestedErr: error, fail: 500 });
        } else if (response.statusCode !== 200) {
          // TODO - add body to rejection
          reject({ nestedErr: error, fail: response.statusCode });
        } else {
          that.logger.debug(`Response: ${body}`);
          resolve();
        }
      });
    });
  }
}

module.exports = Requester;
