'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const nodepath = require('path');

const requireSubvert = require('require-subvert')(__dirname);
const Context = require('cta-flowcontrol').Context;
const Logger = require('cta-logger');
const logicPath = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/', 'index.js');

const DEFAULTCONFIG = require('./index.config.testdata.js');
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

describe('BusinessLogics - Schedule - getAllSchedules', function() {
  let logic;
  context('when everything ok', function() {
    let mockOutputContext;
    let outputJob;
    before(function() {
      outputJob = {
        nature: {
          type: 'dbinterface',
          quality: 'find',
        },
        payload: {
          type: 'schedules',
          filter: { limit: 0, offset: 0 },
          query: {},
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJob);
      mockOutputContext.publish = sinon.stub();

      // eslint-disable-next-line global-require
      const Logic = require(logicPath);
      logic = new Logic(DEFAULTCEMENTHELPER, DEFAULTCONFIG);
      sinon.stub(logic.cementHelper, 'createContext')
        .returns(mockOutputContext);
    });
    after(function() {
      requireSubvert.cleanUp();
      logic.cementHelper.createContext.restore();
    });

    it('should send a new Context find', function() {
      const promise = logic.getAllSchedules();
      mockOutputContext.emit('done', 'dbinterface', {});
      return promise.then(() => {
        sinon.assert.calledWith(logic.cementHelper.createContext, outputJob);
        sinon.assert.called(mockOutputContext.publish);
      });
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const promise = logic.getAllSchedules();
        mockOutputContext.emit('done', 'dbinterface', response);
        return expect(promise).to.eventually.equal(response);
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const promise = logic.getAllSchedules();
        mockOutputContext.emit('reject', 'dbinterface', error);

        return expect(promise).to.eventually.be.rejected
          .then((err) => {
            expect(err).to.have.property('returnCode', 'reject');
            expect(err).to.have.property('brickName', 'dbinterface');
          });
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = logic.getAllSchedules();
        mockOutputContext.emit('error', brickName, error);

        return expect(promise).to.eventually.be.rejected
          .then((err) => {
            expect(err).to.have.property('returnCode', 'error');
            expect(err).to.have.property('brickName', brickName);
          });
      });
    });
  });
});
