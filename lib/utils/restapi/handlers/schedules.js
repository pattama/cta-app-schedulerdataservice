'use strict';
const _ = require('lodash');
const Schedule = require('../../datamodels/schedule.js');

/**
 * Handler class for RESTAPI handlers : SCHEDULERS
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class SchedulersHandler {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    this.cementHelper = cementHelper;
    this.dataType = 'schedule';
  }

  /**
   * Publishes request body (Schedule) in an schedule-save Context
   * @param req
   * @param res
   * @param next
   */
  create(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'create',
      },
      payload: req.body,
    };
    if (req.method.toLowerCase() === 'put' && !req.params.hasOwnProperty('id')) {
      res.status(400).send('Missing \'id\' property');
    } else {
      if (req.params.hasOwnProperty('id')) {
        data.payload.id = req.params.id;
      }
      const context = this.cementHelper.createContext(data);
      context.publish();
      context.on('done', function(brickname, response) {
        res.status(201).send(response);
      });
      context.once('reject', function(brickname, error) {
        res.status(400).send(error.message);
      });
      context.once('error', function(brickname, error) {
        res.status(400).send(error.message);
      });
    }
  }

  /**
   * Publishes request body (Schedule) in an schedule-update Context
   * @param req
   * @param res
   * @param next
   */
  update(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'update',
      },
      payload: req.body,
    };
    data.payload.id = req.params.id;
    const context = this.cementHelper.createContext(data);
    context.publish();
    context.on('done', function(brickName, response) {
      res.send(response);
    });
    context.once('reject', function(brickName, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickName, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
  }

  /**
   * Publishes request body (Schedule) in an schedule-update Context
   * @param req
   * @param res
   * @param next
   */
  updateByObjIdType(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'updatebyobjidtype',
      },
      payload: req.body,
    };
    data.payload.objId = req.params.objId;
    data.payload.type = req.params.type;
    const context = this.cementHelper.createContext(data);
    context.publish();
    context.on('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
  }

  /**
   * Publishes request params (Query) id in an schedule-find Context
   * @param req
   * @param res
   * @param next
   */
  findById(req, res) {
    const data = {
      nature: {
        type: 'schedule',
        quality: 'findbyid',
      },
      payload: {
        id: req.params.id,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) objId, type
   * @param req
   * @param res
   * @param next
   */
  findByObjIdType(req, res, next) { // eslint-disable-line no-unused-vars
    const data = {
      nature: {
        type: 'schedule',
        quality: 'findbyobjidtype',
      },
      payload: {
        objId: req.params.objId,
        type: req.params.type,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) id in an schedule-deleteone Context
   * @param req
   * @param res
   * @param next
   */
  delete(req, res, next) { // eslint-disable-line no-unused-vars
    const data = {
      nature: {
        type: this.dataType,
        quality: 'delete',
      },
      payload: {
        id: req.params.id,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) objId-type in an schedule-deleteone Context
   * @param req
   * @param res
   * @param next
   */
  deleteByObjIdType(req, res, next) { // eslint-disable-line no-unused-vars
    const data = {
      nature: {
        type: this.dataType,
        quality: 'deletebyobjidtype',
      },
      payload: {
        objId: req.params.objId,
        type: req.params.type,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      if (error.message === 'Schedule not found') {
        res.status(404).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) in an schedule-find Context
   * @param req
   * @param res
   * @param next
   */
  find(req, res) {
    // computing filters
    const filter = {};
    // computing limit filter Number
    filter.limit = parseInt(req.query.limit, 10) || 20;
    // computing offset filter Number
    filter.offset = parseInt(req.query.offset, 10) || 0;
    // computing sort filter Object
    // Note: sort Object fields must be preserved in the right order
    // theorically, the JS standard defines Object as an unordered collection of properties
    // practically, v8 engine (and hence nodejs) preserves the order
    // so the following code is suitable
    if (req.query.hasOwnProperty('sort')) {
      filter.sort = {};
      const split = req.query.sort.split(',')
        .filter((str) => (str.length > 0));
      split.forEach(function(sortValue) {
        if (sortValue.startsWith('-')) {
          filter.sort[sortValue.substr(1)] = -1;
        } else {
          filter.sort[sortValue] = 1;
        }
      });
    }

    const query = Schedule.convertQueryStrings(_.omit(req.query, Object.keys(filter)));
    const data = {
      nature: {
        type: this.dataType,
        quality: 'find',
      },
      payload: {
        filter: filter,
        query: query,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.publish();
  }
}

module.exports = SchedulersHandler;
