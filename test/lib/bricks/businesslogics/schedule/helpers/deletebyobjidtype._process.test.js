'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const sinon = require('sinon');
const nodepath = require('path');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const Helper = require(nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/helpers/', 'deletebyobjidtype.js'));

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

describe('BusinessLogics - Schedule - DeleteByObjIdType - _process', function() {
  let helper;
  before(function() {
    helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
  });
  context('when everything ok', function() {
    const inputJOB = {
      nature: {
        type: 'schedule',
        quality: Helper.name.toLowerCase(),
      },
      payload: {
        objId: '57e2f5b08e14f36c4a20191d',
        type: 'foo',
      },
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, inputJOB);
    let mockOutputContext;
    let outputJOB;
    before(function() {
      sinon.stub(mockInputContext, 'emit');

      outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'deleteonebyobjidtype',
        },
        payload: {
          collection: 'schedule',
          objId: inputJOB.payload.objId,
          type: inputJOB.payload.type,
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();
      sinon.stub(helper.cementHelper, 'createContext')
        .withArgs(outputJOB)
        .returns(mockOutputContext);
    });
    after(function() {
      helper.cementHelper.createContext.restore();
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const brickName = 'dbinterface';
        const stubBroadcast = sinon.stub(helper.synchronizer, 'broadcast');
        const promise = helper._process(mockInputContext);
        stubBroadcast.resolves(response);
        mockOutputContext.emit('done', brickName, response);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'done', helper.cementHelper.brickName, response);
        });
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper._process(mockInputContext);
        mockOutputContext.emit('reject', brickName, error);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'reject', brickName, error);
        });
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper._process(mockInputContext);
        mockOutputContext.emit('error', brickName, error);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'error', brickName, error);
        });
      });
    });
  });
});
