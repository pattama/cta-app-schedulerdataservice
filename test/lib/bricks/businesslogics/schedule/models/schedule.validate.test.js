'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Model = require(nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/models', 'schedule.js'));
const data = require('./schedule.data.testdata.js');

describe('BusinessLogics - Schedules - Model - Schedule', function() {
  context('when everything ok', function() {
    it('should return ok', function() {
      expect(Model.validate(data)).to.have.property('ok', 1);
    });
  });
});