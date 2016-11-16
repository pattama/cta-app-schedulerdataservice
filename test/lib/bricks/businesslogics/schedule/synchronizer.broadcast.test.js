'use strict';

const appRootPath = require('app-root-path').path;
const sinon = require('sinon');
const expect = require('chai').expect;
const nodepath = require('path');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToSynchronizer = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'synchronizer.js');
const Synchronizer = require(pathToSynchronizer);

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

describe('BusinessLogics - Schedule - Synchronizer - broadcast', function() {
  let synchronizer;
  let stubCallback;
  context('when everything ok', function() {
    let mockOutputContext;
    let action;
    let content;
    let outputJOB;
    before(function() {
      stubCallback = sinon.stub();

      action = 'create';
      content = {
        id: 'foo',
        schedule: '* * * * *',
        rest: {
          method: 'POST',
          url: 'http://www.google.com',
          headers: {
            "Content-Type": 'application/json'
          },
          body: {
            "nothing in real": 'just to show people can add headers and body'
          }
        }
      }
      outputJOB = {
        nature: {
          type: 'message',
          quality: 'publish',
        },
        payload: {
          nature: {
            type: 'schedule',
            quality: 'synchronize'
          },
          payload: {
            action: action,
            content: content
          }
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();

      synchronizer = new Synchronizer(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
      sinon.stub(synchronizer.cementHelper, 'createContext')
        .withArgs(outputJOB)
        .returns(mockOutputContext);
    });
    after(function() {
      synchronizer.cementHelper.createContext.restore();
    });

    it('should send a new Context insertone', function() {
      const promise = synchronizer.broadcast(action, content, stubCallback);
      mockOutputContext.emit('done', 'scheduler', '');
      return promise.then(() => {
        sinon.assert.calledWith(synchronizer.cementHelper.createContext, outputJOB);
        sinon.assert.called(mockOutputContext.publish);
      });
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const promise = synchronizer.broadcast(action, content, stubCallback);
        mockOutputContext.emit('done', 'scheduler', response);
        return expect(promise).to.eventually.equal(response);
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = synchronizer.broadcast(action, content, stubCallback);
        mockOutputContext.emit('reject', brickName, error);
        return expect(promise).to.eventually.be.rejectedWith({
          returnCode: 'reject',
          brickName: brickName,
          response: error
        });
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = synchronizer.broadcast(action, content, stubCallback);
        mockOutputContext.emit('error', brickName, error);
        return expect(promise).to.eventually.be.rejectedWith({
          returnCode: 'error',
          brickName: brickName,
          response: error
        })
      });
    });
  });
});
