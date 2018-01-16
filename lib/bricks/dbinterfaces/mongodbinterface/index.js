/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const BaseDBInterface = require('../basedbinterface');
const DeleteOneHelper = require('./helpers/deleteone');
const DeleteOneByObjIdTypeHelper = require('./helpers/deleteonebyobjidtype');
const FindHelper = require('./helpers/find');
const FindByIdHelper = require('./helpers/findbyid');
const FindByObjIdTypeHelper = require('./helpers/findbyobjidtype');
const InsertOneHelper = require('./helpers/insertone');
const UpdateOneHelper = require('./helpers/updateone');
const UpdateOneByObjIdTypeHelper = require('./helpers/updateonebyobjidtype');
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
    this.helpers.set('deleteonebyobjidtype', new DeleteOneByObjIdTypeHelper(this.cementHelper,
      this.logger));
    this.helpers.set('find', new FindHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyid', new FindByIdHelper(this.cementHelper, this.logger));
    this.helpers.set('findbyobjidtype', new FindByObjIdTypeHelper(this.cementHelper, this.logger));
    this.helpers.set('insertone', new InsertOneHelper(this.cementHelper, this.logger));
    this.helpers.set('updateone', new UpdateOneHelper(this.cementHelper, this.logger));
    this.helpers.set('updateonebyobjidtype', new UpdateOneByObjIdTypeHelper(this.cementHelper,
      this.logger));
    this.helpers.set('reserveschedule', new ReserveScheduleHelper(this.cementHelper, this.logger));
  }
}

module.exports = MongoDBInterface;
