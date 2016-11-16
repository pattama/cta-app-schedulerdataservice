'use strict';
const appRootPath = require('app-root-path').path;
const sinon = require('sinon');
const _ = require('lodash');
const nodepath = require('path');

const EventEmitter = require('events');
const Logger = require('cta-logger');
const Handler = require(nodepath.join(appRootPath,
  '/lib/utils/restapi/handlers/', 'schedules.js'));

const DEFAULTLOGGER = new Logger();
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: 'restapi',
  logger: DEFAULTLOGGER,
  dependencies: {
  },
  createContext: function() {},
};
const SCHEDULE = require('./schedules.update.sample.testdata.js');

describe('Utils - RESTAPI - Handlers - Schedule - updateByObjIdType', function() {
  let handler;
  before(function() {
    handler = new Handler(DEFAULTCEMENTHELPER);
  });

  context('when objId and type is provided (update)', function() {
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      send: function () {
      },
    };
    let data;
    let mockContext;
    before(function () {
      req.body = _.cloneDeep(SCHEDULE);
      req.params = {
        objId: 'foo',
        type: 'bar'
      };
      data = {
        nature: {
          type: 'schedule',
          quality: 'updatebyobjidtype',
        },
        payload: {
          objId: req.params.objId,
          type: req.params.type,
          content: req.body,
        },
      };
      mockContext = new EventEmitter();
      mockContext.publish = sinon.stub();
      sinon.stub(handler.cementHelper, 'createContext')
        .withArgs(data)
        .returns(mockContext);
    });
    after(function () {
      handler.cementHelper.createContext.restore();
    });
    it('should send a new Context', function () {
      handler.updateByObjIdType(req, res, null);
      sinon.assert.calledWith(handler.cementHelper.createContext, data);
      sinon.assert.called(mockContext.publish);
    });

    context('when Context emits error event', function() {
      before(function() {
        sinon.spy(res, 'status');
        sinon.spy(res, 'send');
        handler.updateByObjIdType(req, res, null);
      });
      after(function() {
        res.status.restore();
        res.send.restore();
      });
      it('should send the error message', function () {
        const error = new Error('mockError');
        const mockBrickname = 'businesslogic';
        mockContext.emit('error', mockBrickname, error);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.send, error.message);
      });
    });

    context('when Context emits reject event', function() {
      before(function() {
        sinon.spy(res, 'status');
        sinon.spy(res, 'send');
        handler.updateByObjIdType(req, res, null);
      });
      after(function() {
        res.status.restore();
        res.send.restore();
      });
      it('should send the error message', function () {
        const error = new Error('mockError');
        const mockBrickname = 'businesslogic';
        mockContext.emit('reject', mockBrickname, error);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.send, error.message);
      });
    });

    context('when document is found', function() {
      before(function() {
        sinon.spy(res, 'send');
        handler.updateByObjIdType(req, res, null);
      });
      after(function() {
        res.send.restore();
      });
      it('should send the found Object (res.send())', function() {
        const mockBrickname = 'businesslogic';
        const response = { id: req.body.id };
        mockContext.emit('done', mockBrickname, response);
        sinon.assert.calledWith(res.send, response);
      });
    });

    context('when document is not found', function() {
      before(function() {
        sinon.spy(res, 'status');
        sinon.spy(res, 'send');
        handler.updateByObjIdType(req, res, null);
      });
      after(function() {
        res.status.restore();
        res.send.restore();
      });
      it('should send 404', function() {
        const mockBrickname = 'businesslogic';
        const response = null;
        mockContext.emit('done', mockBrickname, response);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, 'Schedule not found.');
      });
    });
  });
});

