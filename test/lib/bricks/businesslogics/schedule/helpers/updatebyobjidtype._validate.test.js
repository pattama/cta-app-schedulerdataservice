'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const nodepath = require('path');
const _ = require('lodash');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const Helper = require(nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/helpers', 'updatebyobjidtype.js'));

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

describe('BusinessLogics - Schedule - UpdateByObjIdType - _validate', function() {
  let helper;
  const DEFAULTINPUTJOB = {
    nature: {
      type: 'schedule',
      quality: 'updatebyobjidtype',
    },
    payload: {
      objId: '57e2f5b08e14f36c4a20191d',
      type: 'foo',
      schedule: '* * * * *',
      rest: {
        url: '',
        method: '',
        headers: {},
        body: {},
      },
    },
  };
  before(function() {
    helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
  });
  context('when everything ok', function() {
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, DEFAULTINPUTJOB);
    let promise;
    before(function() {
      promise = helper._validate(mockInputContext);
    });
    after(function() {
    });
    it('should resolve', function() {
      return expect(promise).to.eventually.have.property('ok', 1);
    });
  });

  context('when payload is not an object', function() {
    const job = _.cloneDeep(DEFAULTINPUTJOB);
    job.payload = 'not-an-object';
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, job);
    it('should reject', function() {
      const validatePromise = helper._validate(mockInputContext);
      return expect(validatePromise).to.eventually.be.rejected;
    });
  });

  context('when payload has an invalid argument', function() {
    const job = _.cloneDeep(DEFAULTINPUTJOB);
    job.payload.rest = 'should not be string';
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, job);
    it('should reject', function() {
      const validatePromise = helper._validate(mockInputContext);
      return expect(validatePromise).to.eventually.be.rejected;
    });
  });
});
