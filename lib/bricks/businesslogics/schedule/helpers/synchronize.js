'use strict';
const BaseHelper = require('../../base/basehelper.js');
const validate = require('cta-common').validate;
const Scheduler = require('../scheduler.js');
const Schedule = require('../../../../utils/datamodels/schedule.js');

/**
 * Business Logic Schedule Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Synchronize extends BaseHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.scheduler = new Scheduler(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Query Schedule Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    //const job = context.data;
    //return new Promise((resolve, reject) => {
    //  if (!validate(job.payload.id, { type: 'identifier' }).isValid) {
    //    reject(new Error('missing/incorrect \'id\' String value of ObjectID in job payload'));
    //  }
    //  resolve({ ok: 1 });
    //});
    return Promise.resolve({ ok: 1 });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    this.logger.info('Receive synchronize schedule message:', context.data.payload.content.id); //TODO change log level
    const schedule = new Schedule(context.data.payload.content);
    if(context.data.payload.action === 'create') {
      this.scheduler.setupSchedule(schedule);
    } else if(context.data.payload.action === 'update') {
      this.scheduler.updateSchedule(schedule);
    } else if(context.data.payload.action === 'delete') {
      this.scheduler.deleteSchedule(schedule.id);
    }
    context.emit('done', this.cementHelper.brickName);
  }
}

module.exports = Synchronize;
