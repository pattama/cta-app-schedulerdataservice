/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const BaseHelper = require('../../base/basehelper.js');
const validate = require('cta-common').validate;
// const Scheduler = require('../scheduler.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');

/**
 * Business Logic Schedule Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Synchronize extends BaseHelper {

  constructor(cementHelper, logger, scheduler) {
    super(cementHelper, logger);
    this.scheduler = scheduler;
  }
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
      if (!validate(job.payload.action, { type: 'string' }).isValid) {
        reject(new Error('missing/incorrect \'action\' String value in job payload'));
      }
      resolve({ ok: 1 });
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    // TODO change log level
    this.logger.info('Receive synchronize schedule message:', context.data.payload.content.id);
    const schedule = new Schedule(context.data.payload.content);
    if (context.data.payload.action === 'create') {
      this.scheduler.setupSchedule(schedule);
    } else if (context.data.payload.action === 'update') {
      this.scheduler.updateSchedule(schedule);
    } else if (context.data.payload.action === 'upsert') {
      this.scheduler.upsertSchedule(schedule);
    } else if (context.data.payload.action === 'delete') {
      this.scheduler.deleteSchedule(schedule.id);
    }
    context.emit('done', this.cementHelper.brickName);
  }
}

module.exports = Synchronize;
