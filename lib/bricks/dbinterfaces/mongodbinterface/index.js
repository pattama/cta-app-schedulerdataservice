'use strict';
const BaseDBInterface = require('../basedbinterface');
const DeleteOneHelper = require('./helpers/deleteone');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const InsertOneHelper = require('./helpers/insertone');
const UpdateOneHelper = require('./helpers/updateone');
const ReserveScheduleHelper = require('./helpers/reserveschedule');

/**
 * Database Interface MongoDB class
 *
 * @augments BaseDBInterface
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class MongoDBInterface extends BaseDBInterface {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    this.helpers.set('deleteone', new DeleteOneHelper(this.cementHelper, this.logger));
    this.helpers.set('find', new FindHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyid', new FindByIdHelper(this.cementHelper, this.logger));
    this.helpers.set('insertone', new InsertOneHelper(this.cementHelper, this.logger));
    this.helpers.set('updateone', new UpdateOneHelper(this.cementHelper, this.logger));
    this.helpers.set('reserveschedule', new ReserveScheduleHelper(this.cementHelper, this.logger));
  }
}

module.exports = MongoDBInterface;
