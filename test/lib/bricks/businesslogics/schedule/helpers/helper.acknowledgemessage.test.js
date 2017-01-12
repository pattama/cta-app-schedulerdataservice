'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const Context = require('cta-flowcontrol').Context;
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Logger = require('cta-logger');
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/helpers/', 'update.js');
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

describe('BusinessLogics - Schedule - Helper - acknowledgeMessage', () => {
  let helper;
  context('when everything ok', function() {
    const ackId = '0123456789ABCDEF';
    const DEFAULTINPUTJOB = {
      id: ackId,
      nature: {
        type: 'schedule',
        quality: 'update',
      },
      payload: {
      },
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, DEFAULTINPUTJOB);
    let mockOutputContext;
    let outputJOB;
    before(function() {
      sinon.stub(mockInputContext, 'emit');
      outputJOB = {
        nature: {
          type: 'message',
          quality: 'acknowledge',
        },
        payload: {
          id: ackId,
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();

      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
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
        const promise = helper.acknowledgeMessage(mockInputContext);
        mockOutputContext.emit('done', 'cta-io', response);

        return expect(promise).to.eventually.deep.equal({
          returnCode: 'done',
          brickName: helper.cementHelper.brickName,
          response,
        });
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper.acknowledgeMessage(mockInputContext);
        mockOutputContext.emit('reject', brickName, error);
        return expect(promise).to.eventually.be.rejectedWith({
          returnCode: 'reject',
          brickName,
          response: error,
        });
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper.acknowledgeMessage(mockInputContext);
        mockOutputContext.emit('error', brickName, error);
        return expect(promise).to.eventually.be.rejectedWith({
          returnCode: 'error',
          brickName,
          response: error,
        });
      });
    });
  });
});
