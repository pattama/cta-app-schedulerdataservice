'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const _ = require('lodash');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js'));

describe('Data Model - Schedule - QueryKeys', function() {
  context('when everything ok', function() {
    it('should return properties', function() {
      const keys = {
        id: { type: 'identifier', optional: true },
        objId: { type: 'string', optional: true },
        type: { type: 'string', optional: true },
        schedule: { type: 'string', optional: true },
        rest: {
          type: 'object',
          items: {
            url: { type: 'string' },
            method: { type: 'string', optional: true, defaultTo: 'GET' },
            headers: { type: 'object', optional: true, defaultTo: {} },
            body: { type: 'object', optional: true },
          },
          optional: true,
        },
        scheduledBy: { type: 'string', optional: true },
        scheduledTimestamp: { type: 'number', optional: true },
      };
      console.log(Model.queryKeys());
      expect(_.isEqual(Model.queryKeys(), keys)).to.be.equal(true);
    });
  });
});
