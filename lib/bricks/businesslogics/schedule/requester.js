'use strict';
var request = require('request');


/**
 * Requester Helper class
 */
class Requester {

  /**
   * Send REST request
   * @param {Object} restObj
   * @param {String} restObj.url - a URL of rest
   * @param {Object} restObj.headers - a map of headers
   * @param {*} restObj.body - a JSON object or String
   * @returns {Promise}
   */
  static sendRequest(restObj) {
    console.log('====> Send REST requst ', restObj.url);
    return new Promise((resolve, reject) => {
      var newrestObj = JSON.parse(JSON.stringify(restObj));
      if (typeof newrestObj.body === "object") {
        newrestObj.json = true;
      }
      request(newrestObj, function (error, response, body) {
        if (error) {
          reject({err: error, fail: 500});
        }
        else if (response.statusCode !== 200) {
          reject({err: error, fail: response.statusCode});
        }
        else {
          resolve();
        }
      });
    });
  }
}

module.exports = Requester;
