'use strict';
const path = require('path');
const FlowControl = require('cta-flowcontrol');
const Cement = FlowControl.Cement;
const config = require('./config');
if (process.argv.length > 2) { // TODO - remove this
  config.tools[2].properties.port = parseInt(process.argv[2], 10);
  config.bricks[4].properties.name = process.argv[3];
}
// eslint-disable-next-line no-unused-vars
const cement = new Cement(config, path.join(__dirname, '..', '..'));
