/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

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
