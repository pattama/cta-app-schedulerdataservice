'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js'));
const data = require('./schedule.data.testdata.js');

describe('Data Model - Schedule', function() {
  it('should return an Schedule', function() {
    const object = new Model(data);
    expect(object).to.be.an.instanceof(Model);
    expect(object).to.have.property('id', data.id);
    expect(object).to.have.property('rest', data.rest);
    expect(object).to.have.deep.property('rest.method', data.rest.method);
    expect(object).to.have.deep.property('rest.url', data.rest.url);
    expect(object).to.have.deep.property('rest.headers', data.rest.headers);
    expect(object).to.have.deep.property('rest.headers.Content-Type',
      data.rest.headers['Content-Type']);
    expect(object).to.have.deep.property('rest.body', data.rest.body);
  });
});
