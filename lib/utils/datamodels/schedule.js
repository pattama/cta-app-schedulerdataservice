'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier' },
  schedule: { type: 'string' },
  rest: {
    type: 'object',
    items: {
      url: { type: 'string' },
      method: { type: 'string', optional: true, defaultTo: 'GET' },
      headers: { type: 'object', optional: true, defaultTo: {} },
      body: { type: 'object', optional: true },
    }
  },
  enabled: { type: 'boolean', optional: true }
};

/**
 * Schedule Data Model class
 *
 * @property {ObjectID} id - unique identifier
 * @property {ObjectID} scheduleId - unique identifier of a Schedule
 * @property {Object} rest - Callback rest api
 * @property {String} rest.url - URL of a rest api
 * @property {String} rest.method - method of a rest api
 * @property {Object} rest.headers - headers of a rest api
 * @property {Object} rest.body - body of a rest api
 */
class Schedule {
  /**
   *
   * @param {Object} data - params
   * @param {ObjectID} data.id - unique identifier
   * @param {ObjectID} data.rest - Callback rest api
   * @param {String} data.rest.url - URL of a rest api
   * @param {String} data.rest.method - method of a rest api
   * @param {Object} data.rest.headers - headers of a rest api
   * @param {Object} data.rest.body - body of a rest api
   */
  constructor(data) {
    this.id = data.id || (new ObjectID()).toString();
    this.schedule = data.schedule
    this.rest = data.rest;
    this.enabled = data.enabled;
  }

  static keys() {
    return _.cloneDeep(keys);
  }

  static queryKeys(obj) {
    return {
      id: { type: 'identifier', optional: true },
      enabled: { type: 'boolean', optional: true }
    };
  }

  static convertQueryStrings(query) {
    const converted = {};
    if(query.hasOwnProperty('enabled')) {
      converted.id = query.id;
    }
    if(query.hasOwnProperty('enabled')) {
      converted.enabled = query.enabled.toLowerCase() === 'true';
    }
    return converted;
  }
}

module.exports = Schedule;
