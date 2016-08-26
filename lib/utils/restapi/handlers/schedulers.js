'use strict';
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
  create(req, res, next) { // eslint-disable-line no-unused-vars
    const data = {
      nature: {
        type: 'schedule',
        quality: 'create',
      },
      payload: req.body,
    };
    const context = this.cementHelper.createContext(data);
    context.publish();
    context.on('done', function(brickname, response) {
      res.send(response);
    });
  }

  /**
   * Publishes request params (Query) id in an schedule-find Context
   * @param req
   * @param res
   * @param next
   */
  findById(req, res, next) { // eslint-disable-line no-unused-vars
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
    context.publish();
    context.on('done', function(brickname, response) {
      if (response) {
        res.send(response);
      } else {
        res.status(404).send('Schedule not found.');
      }
    });
  }

  /**
   * Publishes request params (Query) id in an execution-deleteone Context
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
      if (response) {
        res.send(response);
      } else {
        res.status(404).send('Schedule not found.');
      }
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
