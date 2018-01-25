# cta-app-schedulerdataservice
[![Build Status](https://travis-ci.org/thomsonreuters/cta-app-schedulerdataservice.svg?branch=master)](https://travis-ci.org/thomsonreuters/cta-app-schedulerdataservice)
[![Coverage Status](https://coveralls.io/repos/github/thomsonreuters/cta-app-schedulerdataservice/badge.svg?branch=master)](https://coveralls.io/github/thomsonreuters/cta-app-schedulerdataservice?branch=master)
[![codecov](https://codecov.io/gh/thomsonreuters/cta-app-schedulerdataservice/branch/master/graph/badge.svg)](https://codecov.io/gh/thomsonreuters/cta-app-schedulerdataservice)

**Scheduler Data Service Application (SCH)**  for Compass Test Automation, implementing CTA-OSS Framework

## General Overview

### Overview
Scheduler Data Service (SCH) performing as a brick for scheduling any job. SCH will receive schedule from Rest API. Schedule can run as interval or run only one time at specific time. When it's schedule time, SCH will send Rest API to given URL. 

For detail, please go to our [**CTA Main Repository**](https://github.com/thomsonreuters/cta).

### Features
  * Create a schedule
  * Update a schedule by ID
  * Update a schedule byObjId and Type
  * Upsert a schedule by ObjId and Type
  * Delete a schedule by ID
  * Delete a schedule by ObjId and Type

## Guidelines

* [Getting Start](#getting-start)
  * [Prerequisites](#prerequisites) 
  * [Installation & Startup](#installation-startup)
* [Development Guide](#development-guide)
  * [Contributing](#contributing)
  * [More Information](#more-information)

## Getting Start

### Prerequisites
 1. Front End skills required include `HTML`, `CSS`, `JavaScript`, `JSON`. 
 2. Back End development using `Node.js`, `Express,` and `MongoDB`. It also important concept of source control using `Git`.

### Installation & Startup
The easiest way to get started is to clone the repository:
```bash
git clone git@git.sami.int.thomsonreuters.com:compass/cta-app-executiondataservice.git
```
Then install NPM dependencies:
```bash
npm install
```
To build, be sure you have [node](https://nodejs.org/en/) installed.

## Development Guide

### Contributing
You can follow [these steps](https://github.com/thomsonreuters/cta/blob/master/contributing.md) to contribute.

### More Information
Our service is composed of different components working together to schedule, run, collect tests results and more. You can find additional information for more understand in Execution Data Service.
We also cover in detail :
* The Rest API is composed of multiple REST service to perform actions on CTA.
* A DataContract is a formal agreement between a bricks.
* The Document associated with a software project and the system being.
* A Sequence Diagrams is an interaction diagram that shows how objects operate with one another and in what order.
