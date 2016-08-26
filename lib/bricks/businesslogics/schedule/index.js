'use strict';

const Base = require('../base');
const CreateHelper = require('./helpers/create');
const DeleteHelper = require('./helpers/delete');
const FindByIdHelper = require('./helpers/findbyid');

/**
 * Business Logic Schedule class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class Schedule extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    this.helpers.set('create', new CreateHelper(this.cementHelper, this.logger));
    this.helpers.set('delete', new DeleteHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyid', new FindByIdHelper(this.cementHelper, this.logger));
  }
}

module.exports = Schedule;
