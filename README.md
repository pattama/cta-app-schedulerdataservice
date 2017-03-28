# Scheduler Data Service for Compass Test Automation

[![build status](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/badges/master/build.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/commits/master)[![coverage report](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/badges/master/coverage.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/commits/master)
------
* General Overview
  * [Overview](#overview)
  * [Features](#features)
* Getting Started
  * [Install](#Getting-Started)
* Development Guide
  * [Contributing](#contributing)
  * [More Information](#more-information)
  
------

## General Overview
### Overview
Scheduler Data Service (SCH) performing as a brick for scheduling any job. SCH will receive schedule from Rest API. Schedule can run as interval or run only one time at specific time. When it's schedule time, SCH will send Rest API to given URL. 

### Features
  * Create a schedule
  * Update a schedule by ID
  * Update a schedule byObjId and Type
  * Upsert a schedule by ObjId and Type
  * Delete a schedule by ID
  * Delete a schedule by ObjId and Type
  

You can check more [feature guide](https://git.sami.int.thomsonreuters.com/compass/cta/blob/master/features.md) for a list of all features provided by CTA-OSS.

------

## Getting Started
The easiest way to get started is to clone the repository:
```ruby
git clone git@git.sami.int.thomsonreuters.com:compass/cta-app-jobmanagerdataservice.git
```
Then install NPM dependencies:
```ruby
npm install
```
To build, be sure you have [node](https://nodejs.org/en/) installed.

------

## Development Guide
### Contributing
You can follow [these steps](https://git.sami.int.thomsonreuters.com/compass/cta/blob/master/contributing.md) to contribute.

### More Information
Our service is composed of different components working together to schedule, run, collect tests results and more. You can find additional information for more understand in Execution Data Service.
We also cover in detail :
* The [Rest API](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/blob/master/RESTAPI.md) is composed of multiple REST service to perform actions on CTA.
* A [DataContract](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/blob/master/DATACONTRACT.md) is a formal agreement between a bricks.
* The [Document](https://git.sami.int.thomsonreuters.com/compass/cta-app-schedulerdataservice/blob/master/DOCUMENTATION.md) associated with a software project and the system being.
* A [Sequence Diagrams](https://www.lucidchart.com/documents/edit/4f14c5e7-a957-4099-902a-3b3a9e196b69/0) is an interaction diagram that shows how objects operate with one another and in what order.

------

This code is running live at [CTA-OSS](https://www.). We also have [CTA Central Document](https://git.sami.int.thomsonreuters.com/compass/cta) 
