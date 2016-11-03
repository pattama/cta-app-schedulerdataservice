'use strict';

const appRootPath = require('app-root-path').path;
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const _ = require('lodash');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/helpers/', 'updatebyobjidtype.js');
const Helper = require(pathToHelper);

const DEFAULTCONFIG = require('../index.config.testdata.js');
const DEFAULTLOGGER = new Logger(null, null, DEFAULTCONFIG.name);
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: DEFAULTCONFIG.name,
  dependencies: {
    logger: DEFAULTLOGGER,
  },
  createContext: function() {},
};

describe('BusinessLogics - Schedule - UpdateByObjIdType - _process', function() {
  let helper;
  context('when everything ok', function() {
    const DEFAULTINPUTJOB = {
      nature: {
        type: 'schedule',
        quality: 'updatebyobjidtype',
      },
      payload: {
        objId: '57e2f5b08e14f36c4a20191d',
        type: 'foo',
        content: {},
      },
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, DEFAULTINPUTJOB);
    let mockOutputContext;
    let outputJOB;
    before(function() {
      sinon.stub(mockInputContext, 'emit');
      outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'updateonebyobjidtype',
        },
        payload: {
          collection: 'schedule',
          objId: DEFAULTINPUTJOB.payload.objId,
          type: DEFAULTINPUTJOB.payload.type,
          content: DEFAULTINPUTJOB.payload.content,
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();

      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
      sinon.stub(helper.cementHelper, 'createContext')
        .withArgs(outputJOB)
        .returns(mockOutputContext);
      helper._process(mockInputContext);
    });
    after(function() {
      requireSubvert.cleanUp();
      helper.cementHelper.createContext.restore();
    });

    it('should send a new Context insertone', function() {
      sinon.assert.calledWith(helper.cementHelper.createContext, outputJOB);
      sinon.assert.called(mockOutputContext.publish);
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const stubBroadcast = sinon.stub(helper.synchronizer, 'broadcast');
        stubBroadcast.callsArgWith(2, 'done', 'dblayer', response);
        mockOutputContext.emit('done', 'dblayer', response);
        sinon.assert.calledWith(mockInputContext.emit,
          'done', helper.cementHelper.brickName, response);
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        mockOutputContext.emit('reject', brickName, error);
        sinon.assert.calledWith(mockInputContext.emit,
          'reject', brickName, error);
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        mockOutputContext.emit('error', brickName, error);
        sinon.assert.calledWith(mockInputContext.emit,
          'error', brickName, error);
      });
    });
  });
});
