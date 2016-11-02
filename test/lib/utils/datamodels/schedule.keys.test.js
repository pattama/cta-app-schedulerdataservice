'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const _ = require('lodash');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js'));

describe('Data Model - Schedule - Keys', function() {
  context('when everything ok', function() {
    it('should return properties', function() {
      const keys = {
        id: { type: 'identifier' },
        objId: { type: 'identifier', optional: true },
        type: { type: 'string', optional: true },
        schedule: { type: 'string' },
        rest: {
          type: 'object',
          items: {
            url: { type: 'string' },
            method: { type: 'string', optional: true, defaultTo: 'GET' },
            headers: { type: 'object', optional: true, defaultTo: {} },
            body: { type: 'object', optional: true },
          }
        },
        scheduledBy: { type: 'string', optional: true },
        scheduledTimestamp: { type: 'number', optional: true }
      };
      expect(_.isEqual(Model.keys(), keys)).to.be.equal(true);
    });
  });
});


describe('Data Model - Execution - QueryKeys', function() {
  context('when everything ok', function() {
    it('should return properties', function() {
      const keys = {
        id: { type: 'identifier', optional: true },
        enabled: { type: 'boolean', optional: true },
      };
      expect(_.isEqual(Model.queryKeys(), keys)).to.be.equal(true);
    });
  });
});
