'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js'));

describe('Data Model - Schedule - ConvertQueryStrings', function() {
  context('when everything ok', function() {
    it('should return converted query', function() {
      const query = {
        id: (new ObjectID()).toString(),
        enabled: 'false',
      };
      const expected = {
        id: query.id,
        enabled: false,
      };
      const actual = Model.convertQueryStrings(query);
      expect(_.isEqual(actual, expected)).to.be.equal(true);
    });
  });

  context('when cannot parse number (parseInt)', function() {
    it('should return converted query', function() {
      const query = {
        id: (new ObjectID()).toString(),
        enabled: 'N/A',
        notaproperty: 'foobar',
      };
      const expected = {
        id: query.id,
        enabled: false,
      };
      const actual = Model.convertQueryStrings(query);
      expect(_.isEqual(actual, expected)).to.be.equal(true);
    });
  });
});
