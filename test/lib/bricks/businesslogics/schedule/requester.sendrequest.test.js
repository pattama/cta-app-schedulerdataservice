'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const Logger = require('cta-logger');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const appRootPath = require('app-root-path').path;
const pathToRequester = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'requester.js');


describe('BusinessLogics - Schedule - Requester - sendRequest', function() {
  let restObj;
  let stubRequest;
  let requester;
  before(function() {
    restObj = {
      method: 'POST',
      url: 'http://www.google.com',
      headers: {
        "Content-Type": 'application/json'
      },
      body: {
        "nothing in real": 'just to show people can add headers and body'
      }
    };

    stubRequest = sinon.stub();
    requireSubvert.subvert('request', stubRequest);
    //requester = requireSubvert.require(pathToRequester);
    const Requester = requireSubvert.require(pathToRequester);
    requester = new Requester(new Logger());

  });

  context('when everything ok', function() {
    it('should be resolved', function() {
      const promise = requester.sendRequest(restObj);
      stubRequest.callArgWith(1, undefined, {
        statusCode: 200
      });
      expect(promise).to.eventually.be.resolved;
    });
  });

  context('when request return error', function() {
    it('should reject an error', function() {
      const promise = requester.sendRequest(restObj);
      stubRequest.callArgWith(1, 'Error: ...');
      return expect(promise).to.eventually.be.rejected
        .and.to.deep.equal({nestedErr: 'Error: ...', fail: 500});
    });
  });

  context('when request return 400', function() {
    it('should reject an error', function() {
      const promise = requester.sendRequest(restObj);
      stubRequest.callArgWith(1, undefined, {
        statusCode: 400
      });
      return expect(promise).to.eventually.be.rejected
        .and.to.deep.equal({nestedErr: undefined, fail: 400});
    });
  });
});