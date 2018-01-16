'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/helpers/', 'updatebyobjidtype.js');
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
        type: 'dbinterface',
        quality: 'updateonebyobjidtype',
      },
      payload: {
        objId: '57e2f5b08e14f36c4a20191d',
        type: 'foo',
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
          collection: 'schedules',
          objId: DEFAULTINPUTJOB.payload.objId,
          type: DEFAULTINPUTJOB.payload.type,
          content: {},
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);

      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
      sinon.stub(helper.cementHelper, 'createContext')
        .withArgs(outputJOB)
        .returns(mockOutputContext);
    });
    after(function() {
      requireSubvert.cleanUp();
      helper.cementHelper.createContext.restore();
    });

    // it('should send a new Context insertone', function() {
    //   sinon.assert.calledWith(helper.cementHelper.createContext, outputJOB);
    //   sinon.assert.called(mockOutputContext.publish);
    // });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const promise = helper._process(mockInputContext);
        sinon.stub(helper, 'acknowledgeMessage').resolves();
        sinon.stub(helper.synchronizer, 'broadcast').resolves(response);
        mockOutputContext.publish = () => {
          mockOutputContext.emit('done', 'dblayer', response);
        };
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
        mockOutputContext.publish = () => {
          mockOutputContext.emit('reject', brickName, error);
        };
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
        mockOutputContext.publish = () => {
          mockOutputContext.emit('error', brickName, error);
        };
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'error', brickName, error);
        });
      });
    });
  });
});
