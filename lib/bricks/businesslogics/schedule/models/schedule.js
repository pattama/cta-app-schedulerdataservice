'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');
const validate = require('cta-common').validate;

const pattern = {
  type: 'object',
  items: {
    sceduleId: { type: 'objectid' },
    schedule: { type: 'string' },
    rest: { type: 'object' }
  },
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
   * @param {ObjectID} data.scheduleId - unique identifier of a Scenario
   * @param {ObjectID} data.rest - Callback rest api
   * @param {String} data.rest.url - URL of a rest api
   * @param {String} data.rest.method - method of a rest api
   * @param {Object} data.rest.headers - headers of a rest api
   * @param {Object} data.rest.body - body of a rest api
   */
  constructor(data) {
    this.id = data.id || (new ObjectID()).toString();
    this.scheduleId = data.scheduleId;
    this.schedule = data.schedule
    this.rest = data.rest;
  }

  static validate(data) {
    return { ok: 1 };
  }
}

module.exports = Schedule;
