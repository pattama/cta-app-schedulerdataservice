/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');
const Schedule = require('../../../../utils/datamodels/schedule.js');
/**
 * Schedule Schema for MongoDB class
 *
 */
class ScheduleSchema {
  /**
   *
   * @param {Schedule} schedule - params
   */
  constructor(schedule) {
    const keys = Schedule.keys();
    const schema = _.pick(schedule, Object.keys(keys));
    Object.keys(schema).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        schema[key] = new ObjectID(schedule[key]);
      }
    });
    if ('id' in schema) {
      schema._id = schema.id;
      delete schema.id;
    }
    return schema;
  }

  static toCTAData(mongodbDoc) {
    const keys = Schedule.keys();
    const executionData = _.pick(mongodbDoc, Object.keys(keys));
    Object.keys(executionData).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        executionData[key] = mongodbDoc[key].toString();
      }
    });
    if ('_id' in mongodbDoc) {
      executionData.id = mongodbDoc._id.toString();
    }
    return new Schedule(executionData);
  }

  static dataQueryKeys() {
    const keys = Schedule.queryKeys();
    delete keys.rest.items;
    return keys;
  }
}

module.exports = ScheduleSchema;
