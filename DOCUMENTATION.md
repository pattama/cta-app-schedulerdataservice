# Scheduler DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md)


## Classes
<dl>
<dt><a href="#BaseHelper">BaseHelper</a></dt>
<dd><p>Business Logic Helper Base class</p>
</dd>
<dt><a href="#Base">Base</a> ⇐ <code>Brick</code></dt>
<dd><p>Business Logic Base class</p>
</dd>
<dt><a href="#CreateHelper">CreateHelper</a> ⇐ <code><a href="#BaseHelper">BaseHelper</a></code></dt>
<dd><p>Business Logic Schedule Helper Save class</p>
</dd>
<dt><a href="#Delete">Delete</a> ⇐ <code><a href="#BaseHelper">BaseHelper</a></code></dt>
<dd><p>Business Logic Schedule Helper Delete class</p>
</dd>
<dt><a href="#Find">Find</a> ⇐ <code><a href="#BaseHelper">BaseHelper</a></code></dt>
<dd><p>Business Logic Execution Helper Find class</p>
</dd>
<dt><a href="#FindById">FindById</a> ⇐ <code><a href="#BaseHelper">BaseHelper</a></code></dt>
<dd><p>Business Logic Schedule Helper FindById class</p>
</dd>
<dt><a href="#Update">Update</a> ⇐ <code><a href="#BaseHelper">BaseHelper</a></code></dt>
<dd><p>Business Logic Schedule Helper Update class</p>
</dd>
<dt><a href="#Schedule">Schedule</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Business Logic Schedule class</p>
</dd>
<dt><a href="#Schedule">Schedule</a></dt>
<dd><p>Schedule Data Model class</p>
</dd>
<dt><a href="#Requester">Requester</a></dt>
<dd><p>Requester Helper class</p>
</dd>
<dt><a href="#Scheduler">Scheduler</a></dt>
<dd><p>Scheduler Helper class</p>
</dd>
<dt><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></dt>
<dd><p>Database Interface Helper Base class</p>
</dd>
<dt><a href="#BaseDBInterface">BaseDBInterface</a> ⇐ <code>Brick</code></dt>
<dd><p>Database Interface Base class</p>
</dd>
<dt><a href="#DeleteOne">DeleteOne</a> ⇐ <code><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></code></dt>
<dd><p>Database Interface MongoDB Helper DeleteOne class</p>
</dd>
<dt><a href="#Find">Find</a> ⇐ <code><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></code></dt>
<dd><p>Database Interface MongoDB Helper Find class</p>
</dd>
<dt><a href="#FindById">FindById</a> ⇐ <code><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></code></dt>
<dd><p>Database Interface MongoDB Helper FindById class</p>
</dd>
<dt><a href="#InsertOne">InsertOne</a> ⇐ <code><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></code></dt>
<dd><p>Database Interface MongoDB Helper InsertOne class</p>
</dd>
<dt><a href="#UpdateOne">UpdateOne</a> ⇐ <code><a href="#BaseDBInterfaceHelper">BaseDBInterfaceHelper</a></code></dt>
<dd><p>Database Interface MongoDB Helper UpdateOne class</p>
</dd>
<dt><a href="#MongoDBInterface">MongoDBInterface</a> ⇐ <code><a href="#BaseDBInterface">BaseDBInterface</a></code></dt>
<dd><p>Database Interface MongoDB class</p>
</dd>
<dt><a href="#SchedulersHandler">SchedulersHandler</a></dt>
<dd><p>Handler class for RESTAPI handlers : SCHEDULERS</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#schedule">schedule</a></dt>
<dd><p>Created by U6039884 on 7/26/2016.</p>
</dd>
</dl>

<a name="BaseHelper"></a>

## BaseHelper
Business Logic Helper Base class

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [BaseHelper](#BaseHelper)
    * [new BaseHelper(cementHelper, logger)](#new_BaseHelper_new)
    * *[._validate(context)](#BaseHelper+_validate) ⇒ <code>Promise</code>*
    * *[._process(context)](#BaseHelper+_process) ⇒ <code>Context</code>*

<a name="new_BaseHelper_new"></a>

### new BaseHelper(cementHelper, logger)
constructor - Create a new Business Logic Helper Base instance


| Param | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |

<a name="BaseHelper+_validate"></a>

### *baseHelper._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper

**Kind**: instance abstract method of <code>[BaseHelper](#BaseHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="BaseHelper+_process"></a>

### *baseHelper._process(context) ⇒ <code>Context</code>*
Process the context

**Kind**: instance abstract method of <code>[BaseHelper](#BaseHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Base"></a>

## Base ⇐ <code>Brick</code>
Business Logic Base class

**Kind**: global class  
**Extends:** <code>Brick</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |
| helpers | <code>Map.&lt;String, Helper&gt;</code> | Map of Helpers |


* [Base](#Base) ⇐ <code>Brick</code>
    * [new Base(cementHelper, configuration)](#new_Base_new)
    * [.validate(context)](#Base+validate) ⇒ <code>Promise</code>
    * [.process(context)](#Base+process)

<a name="new_Base_new"></a>

### new Base(cementHelper, configuration)
constructor - Create a new Business Logic Base instance


| Param | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |

<a name="Base+validate"></a>

### base.validate(context) ⇒ <code>Promise</code>
Validates Context properties

**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Base+process"></a>

### base.process(context)
Process the context

**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="CreateHelper"></a>

## CreateHelper ⇐ <code>[BaseHelper](#BaseHelper)</code>
Business Logic Schedule Helper Save class

**Kind**: global class  
**Extends:** <code>[BaseHelper](#BaseHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [CreateHelper](#CreateHelper) ⇐ <code>[BaseHelper](#BaseHelper)</code>
    * *[._validate(context)](#CreateHelper+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#CreateHelper+_process)

<a name="CreateHelper+_validate"></a>

### *createHelper._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Schedule Model fields

**Kind**: instance abstract method of <code>[CreateHelper](#CreateHelper)</code>  
**Overrides:** <code>[_validate](#BaseHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="CreateHelper+_process"></a>

### createHelper._process(context)
Process the context

**Kind**: instance method of <code>[CreateHelper](#CreateHelper)</code>  
**Overrides:** <code>[_process](#BaseHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Delete"></a>

## Delete ⇐ <code>[BaseHelper](#BaseHelper)</code>
Business Logic Schedule Helper Delete class

**Kind**: global class  
**Extends:** <code>[BaseHelper](#BaseHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [Delete](#Delete) ⇐ <code>[BaseHelper](#BaseHelper)</code>
    * *[._validate(context)](#Delete+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Delete+_process)

<a name="Delete+_validate"></a>

### *delete._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Query Schedule Model fields

**Kind**: instance abstract method of <code>[Delete](#Delete)</code>  
**Overrides:** <code>[_validate](#BaseHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Delete+_process"></a>

### delete._process(context)
Process the context

**Kind**: instance method of <code>[Delete](#Delete)</code>  
**Overrides:** <code>[_process](#BaseHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find"></a>

## Find ⇐ <code>[BaseHelper](#BaseHelper)</code>
Business Logic Execution Helper Find class

**Kind**: global class  
**Extends:** <code>[BaseHelper](#BaseHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [Find](#Find) ⇐ <code>[BaseHelper](#BaseHelper)</code>
    * *[._validate(context)](#Find+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Find+_process)
    * *[._validate(context)](#Find+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Find+_process)

<a name="Find+_validate"></a>

### *find._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Query Execution Model fields

**Kind**: instance abstract method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_process"></a>

### find._process(context)
Process the context

**Kind**: instance method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_validate"></a>

### *find._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_process"></a>

### find._process(context)
Process the context

**Kind**: instance method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById"></a>

## FindById ⇐ <code>[BaseHelper](#BaseHelper)</code>
Business Logic Schedule Helper FindById class

**Kind**: global class  
**Extends:** <code>[BaseHelper](#BaseHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [FindById](#FindById) ⇐ <code>[BaseHelper](#BaseHelper)</code>
    * *[._validate(context)](#FindById+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#FindById+_process)
    * *[._validate(context)](#FindById+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#FindById+_process)

<a name="FindById+_validate"></a>

### *findById._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Query Schedule Model fields

**Kind**: instance abstract method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_process"></a>

### findById._process(context)
Process the context

**Kind**: instance method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_validate"></a>

### *findById._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_process"></a>

### findById._process(context)
Process the context

**Kind**: instance method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Update"></a>

## Update ⇐ <code>[BaseHelper](#BaseHelper)</code>
Business Logic Schedule Helper Update class

**Kind**: global class  
**Extends:** <code>[BaseHelper](#BaseHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [Update](#Update) ⇐ <code>[BaseHelper](#BaseHelper)</code>
    * *[._validate(context)](#Update+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Update+_process)

<a name="Update+_validate"></a>

### *update._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Schedule Model fields

**Kind**: instance abstract method of <code>[Update](#Update)</code>  
**Overrides:** <code>[_validate](#BaseHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Update+_process"></a>

### update._process(context)
Process the context

**Kind**: instance method of <code>[Update](#Update)</code>  
**Overrides:** <code>[_process](#BaseHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Schedule"></a>

## Schedule ⇐ <code>[Base](#Base)</code>
Business Logic Schedule class

**Kind**: global class  
**Extends:** <code>[Base](#Base)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |
| helpers | <code>Map.&lt;String, Helper&gt;</code> | Map of Helpers |


* [Schedule](#Schedule) ⇐ <code>[Base](#Base)</code>
    * [new Schedule(data)](#new_Schedule_new)
    * [.start()](#Schedule+start)
    * [.setupAllSchedules(schedules)](#Schedule+setupAllSchedules)
    * [.getAllSchedules(callback)](#Schedule+getAllSchedules)
    * [.validate(context)](#Base+validate) ⇒ <code>Promise</code>
    * [.process(context)](#Base+process)

<a name="new_Schedule_new"></a>

### new Schedule(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | params |
| data.id | <code>ObjectID</code> | unique identifier |
| data.rest | <code>ObjectID</code> | Callback rest api |
| data.rest.url | <code>String</code> | URL of a rest api |
| data.rest.method | <code>String</code> | method of a rest api |
| data.rest.headers | <code>Object</code> | headers of a rest api |
| data.rest.body | <code>Object</code> | body of a rest api |

<a name="Schedule+start"></a>

### schedule.start()
Start method. Query all schedules then setup all schedules

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  
<a name="Schedule+setupAllSchedules"></a>

### schedule.setupAllSchedules(schedules)
Setup all given schedules

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| schedules | <code>Array</code> | an array of scheduleObj |
| scheduleObj.id | <code>String</code> | unique identifier |
| scheduleObj.schedule | <code>String</code> | a String of cron-format. @example * * * * * |
| scheduleObj.rest | <code>Object</code> | a callback rest |
| scheduleObj.rest.url | <code>String</code> | a URL of rest |
| scheduleObj.rest.headers | <code>Object</code> | a map of headers |
| scheduleObj.rest.body | <code>\*</code> | a JSON object or String |

<a name="Schedule+getAllSchedules"></a>

### schedule.getAllSchedules(callback)
Query all schedules from DB

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | a callback function |

<a name="Base+validate"></a>

### schedule.validate(context) ⇒ <code>Promise</code>
Validates Context properties

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Base+process"></a>

### schedule.process(context)
Process the context

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Schedule"></a>

## Schedule
Schedule Data Model class

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>ObjectID</code> | unique identifier |
| scheduleId | <code>ObjectID</code> | unique identifier of a Schedule |
| rest | <code>Object</code> | Callback rest api |
| rest.url | <code>String</code> | URL of a rest api |
| rest.method | <code>String</code> | method of a rest api |
| rest.headers | <code>Object</code> | headers of a rest api |
| rest.body | <code>Object</code> | body of a rest api |


* [Schedule](#Schedule)
    * [new Schedule(data)](#new_Schedule_new)
    * [.start()](#Schedule+start)
    * [.setupAllSchedules(schedules)](#Schedule+setupAllSchedules)
    * [.getAllSchedules(callback)](#Schedule+getAllSchedules)
    * [.validate(context)](#Base+validate) ⇒ <code>Promise</code>
    * [.process(context)](#Base+process)

<a name="new_Schedule_new"></a>

### new Schedule(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | params |
| data.id | <code>ObjectID</code> | unique identifier |
| data.rest | <code>ObjectID</code> | Callback rest api |
| data.rest.url | <code>String</code> | URL of a rest api |
| data.rest.method | <code>String</code> | method of a rest api |
| data.rest.headers | <code>Object</code> | headers of a rest api |
| data.rest.body | <code>Object</code> | body of a rest api |

<a name="Schedule+start"></a>

### schedule.start()
Start method. Query all schedules then setup all schedules

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  
<a name="Schedule+setupAllSchedules"></a>

### schedule.setupAllSchedules(schedules)
Setup all given schedules

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| schedules | <code>Array</code> | an array of scheduleObj |
| scheduleObj.id | <code>String</code> | unique identifier |
| scheduleObj.schedule | <code>String</code> | a String of cron-format. @example * * * * * |
| scheduleObj.rest | <code>Object</code> | a callback rest |
| scheduleObj.rest.url | <code>String</code> | a URL of rest |
| scheduleObj.rest.headers | <code>Object</code> | a map of headers |
| scheduleObj.rest.body | <code>\*</code> | a JSON object or String |

<a name="Schedule+getAllSchedules"></a>

### schedule.getAllSchedules(callback)
Query all schedules from DB

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | a callback function |

<a name="Base+validate"></a>

### schedule.validate(context) ⇒ <code>Promise</code>
Validates Context properties

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Base+process"></a>

### schedule.process(context)
Process the context

**Kind**: instance method of <code>[Schedule](#Schedule)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Requester"></a>

## Requester
Requester Helper class

**Kind**: global class  
<a name="Requester.sendRequest"></a>

### Requester.sendRequest(restObj) ⇒ <code>Promise</code>
Send REST request

**Kind**: static method of <code>[Requester](#Requester)</code>  

| Param | Type | Description |
| --- | --- | --- |
| restObj | <code>Object</code> |  |
| restObj.url | <code>String</code> | a URL of rest |
| restObj.headers | <code>Object</code> | a map of headers |
| restObj.body | <code>\*</code> | a JSON object or String |

<a name="Scheduler"></a>

## Scheduler
Scheduler Helper class

**Kind**: global class  

* [Scheduler](#Scheduler)
    * [.setupSchedule(scheduleObj)](#Scheduler.setupSchedule) ⇒ <code>boolean</code>
    * [.updateSchedule(scheduleId, scheduleObj)](#Scheduler.updateSchedule) ⇒ <code>boolean</code>
    * [.cancelSchedule(scheduleId)](#Scheduler.cancelSchedule) ⇒ <code>boolean</code>

<a name="Scheduler.setupSchedule"></a>

### Scheduler.setupSchedule(scheduleObj) ⇒ <code>boolean</code>
Set up a schedule

**Kind**: static method of <code>[Scheduler](#Scheduler)</code>  
**Returns**: <code>boolean</code> - - returns true if the schedule was setup successfully  

| Param | Type | Description |
| --- | --- | --- |
| scheduleObj |  |  |
| scheduleObj.id | <code>String</code> | unique identifier |
| scheduleObj.schedule | <code>String</code> | a String of cron-format. @example * * * * * |
| scheduleObj.rest | <code>Object</code> | a callback rest |
| scheduleObj.rest.url | <code>String</code> | a URL of rest |
| scheduleObj.rest.headers | <code>Object</code> | a map of headers |
| scheduleObj.rest.body | <code>\*</code> | a JSON object or String |

<a name="Scheduler.updateSchedule"></a>

### Scheduler.updateSchedule(scheduleId, scheduleObj) ⇒ <code>boolean</code>
Update a schedule

**Kind**: static method of <code>[Scheduler](#Scheduler)</code>  
**Returns**: <code>boolean</code> - - returns true if the schedule was updated successfully  

| Param | Type | Description |
| --- | --- | --- |
| scheduleId |  | unique identifier of schedule |
| scheduleObj | <code>Object</code> | replacement schedule |
| scheduleObj.id | <code>String</code> | unique identifier |
| scheduleObj.schedule | <code>String</code> | a String of cron-format. @example * * * * * |
| scheduleObj.rest | <code>Object</code> | a callback rest |
| scheduleObj.rest.url | <code>String</code> | a URL of rest |
| scheduleObj.rest.headers | <code>Object</code> | a map of headers |
| scheduleObj.rest.body | <code>\*</code> | a JSON object or String |

<a name="Scheduler.cancelSchedule"></a>

### Scheduler.cancelSchedule(scheduleId) ⇒ <code>boolean</code>
Cancel a schedule

**Kind**: static method of <code>[Scheduler](#Scheduler)</code>  
**Returns**: <code>boolean</code> - - returns true if the schedule was cancelled successfully  

| Param | Description |
| --- | --- |
| scheduleId | unique identifier of schedule |

<a name="BaseDBInterfaceHelper"></a>

## BaseDBInterfaceHelper
Database Interface Helper Base class

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [BaseDBInterfaceHelper](#BaseDBInterfaceHelper)
    * [new BaseDBInterfaceHelper(cementHelper, logger)](#new_BaseDBInterfaceHelper_new)
    * *[._validate(context)](#BaseDBInterfaceHelper+_validate) ⇒ <code>Promise</code>*
    * *[._process(context)](#BaseDBInterfaceHelper+_process) ⇒ <code>Context</code>*

<a name="new_BaseDBInterfaceHelper_new"></a>

### new BaseDBInterfaceHelper(cementHelper, logger)
constructor - Create a new Database Interface Helper Base instance


| Param | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |

<a name="BaseDBInterfaceHelper+_validate"></a>

### *baseDBInterfaceHelper._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper

**Kind**: instance abstract method of <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="BaseDBInterfaceHelper+_process"></a>

### *baseDBInterfaceHelper._process(context) ⇒ <code>Context</code>*
Process the context

**Kind**: instance abstract method of <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="BaseDBInterface"></a>

## BaseDBInterface ⇐ <code>Brick</code>
Database Interface Base class

**Kind**: global class  
**Extends:** <code>Brick</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |
| helpers | <code>Map.&lt;String, Helper&gt;</code> | Map of Helpers |


* [BaseDBInterface](#BaseDBInterface) ⇐ <code>Brick</code>
    * [new BaseDBInterface(cementHelper, configuration)](#new_BaseDBInterface_new)
    * [.validate(context)](#BaseDBInterface+validate) ⇒ <code>Promise</code>
    * [.process(context)](#BaseDBInterface+process)

<a name="new_BaseDBInterface_new"></a>

### new BaseDBInterface(cementHelper, configuration)
constructor - Create a new Database Interface Base instance


| Param | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |

<a name="BaseDBInterface+validate"></a>

### baseDBInterface.validate(context) ⇒ <code>Promise</code>
Validates Context properties

**Kind**: instance method of <code>[BaseDBInterface](#BaseDBInterface)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="BaseDBInterface+process"></a>

### baseDBInterface.process(context)
Process the context

**Kind**: instance method of <code>[BaseDBInterface](#BaseDBInterface)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="DeleteOne"></a>

## DeleteOne ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
Database Interface MongoDB Helper DeleteOne class

**Kind**: global class  
**Extends:** <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [DeleteOne](#DeleteOne) ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
    * *[._validate(context)](#DeleteOne+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#DeleteOne+_process)

<a name="DeleteOne+_validate"></a>

### *deleteOne._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[DeleteOne](#DeleteOne)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="DeleteOne+_process"></a>

### deleteOne._process(context)
Process the context

**Kind**: instance method of <code>[DeleteOne](#DeleteOne)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find"></a>

## Find ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
Database Interface MongoDB Helper Find class

**Kind**: global class  
**Extends:** <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [Find](#Find) ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
    * *[._validate(context)](#Find+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Find+_process)
    * *[._validate(context)](#Find+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#Find+_process)

<a name="Find+_validate"></a>

### *find._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Query Execution Model fields

**Kind**: instance abstract method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_process"></a>

### find._process(context)
Process the context

**Kind**: instance method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_validate"></a>

### *find._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="Find+_process"></a>

### find._process(context)
Process the context

**Kind**: instance method of <code>[Find](#Find)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById"></a>

## FindById ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
Database Interface MongoDB Helper FindById class

**Kind**: global class  
**Extends:** <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [FindById](#FindById) ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
    * *[._validate(context)](#FindById+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#FindById+_process)
    * *[._validate(context)](#FindById+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#FindById+_process)

<a name="FindById+_validate"></a>

### *findById._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates Query Schedule Model fields

**Kind**: instance abstract method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_process"></a>

### findById._process(context)
Process the context

**Kind**: instance method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_validate"></a>

### *findById._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="FindById+_process"></a>

### findById._process(context)
Process the context

**Kind**: instance method of <code>[FindById](#FindById)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="InsertOne"></a>

## InsertOne ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
Database Interface MongoDB Helper InsertOne class

**Kind**: global class  
**Extends:** <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [InsertOne](#InsertOne) ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
    * *[._validate(context)](#InsertOne+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#InsertOne+_process)

<a name="InsertOne+_validate"></a>

### *insertOne._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[InsertOne](#InsertOne)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="InsertOne+_process"></a>

### insertOne._process(context)
Process the context

**Kind**: instance method of <code>[InsertOne](#InsertOne)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="UpdateOne"></a>

## UpdateOne ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
Database Interface MongoDB Helper UpdateOne class

**Kind**: global class  
**Extends:** <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| logger | <code>Logger</code> | logger instance |


* [UpdateOne](#UpdateOne) ⇐ <code>[BaseDBInterfaceHelper](#BaseDBInterfaceHelper)</code>
    * *[._validate(context)](#UpdateOne+_validate) ⇒ <code>Promise</code>*
    * [._process(context)](#UpdateOne+_process)

<a name="UpdateOne+_validate"></a>

### *updateOne._validate(context) ⇒ <code>Promise</code>*
Validates Context properties specific to this Helper
Validates abstract query fields

**Kind**: instance abstract method of <code>[UpdateOne](#UpdateOne)</code>  
**Overrides:** <code>[_validate](#BaseDBInterfaceHelper+_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="UpdateOne+_process"></a>

### updateOne._process(context)
Process the context

**Kind**: instance method of <code>[UpdateOne](#UpdateOne)</code>  
**Overrides:** <code>[_process](#BaseDBInterfaceHelper+_process)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="MongoDBInterface"></a>

## MongoDBInterface ⇐ <code>[BaseDBInterface](#BaseDBInterface)</code>
Database Interface MongoDB class

**Kind**: global class  
**Extends:** <code>[BaseDBInterface](#BaseDBInterface)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper instance |
| configuration | <code>BrickConfig</code> | cement configuration of the brick |
| helpers | <code>Map.&lt;String, Helper&gt;</code> | Map of Helpers |


* [MongoDBInterface](#MongoDBInterface) ⇐ <code>[BaseDBInterface](#BaseDBInterface)</code>
    * [.validate(context)](#BaseDBInterface+validate) ⇒ <code>Promise</code>
    * [.process(context)](#BaseDBInterface+process)

<a name="BaseDBInterface+validate"></a>

### mongoDBInterface.validate(context) ⇒ <code>Promise</code>
Validates Context properties

**Kind**: instance method of <code>[MongoDBInterface](#MongoDBInterface)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="BaseDBInterface+process"></a>

### mongoDBInterface.process(context)
Process the context

**Kind**: instance method of <code>[MongoDBInterface](#MongoDBInterface)</code>  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | a Context |

<a name="SchedulersHandler"></a>

## SchedulersHandler
Handler class for RESTAPI handlers : SCHEDULERS

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper from a cta-restapi Brick |


* [SchedulersHandler](#SchedulersHandler)
    * [new SchedulersHandler(cementHelper)](#new_SchedulersHandler_new)
    * [.create(req, res, next)](#SchedulersHandler+create)
    * [.update(req, res, next)](#SchedulersHandler+update)
    * [.findById(req, res, next)](#SchedulersHandler+findById)
    * [.delete(req, res, next)](#SchedulersHandler+delete)
    * [.find(req, res, next)](#SchedulersHandler+find)

<a name="new_SchedulersHandler_new"></a>

### new SchedulersHandler(cementHelper)

| Param | Type | Description |
| --- | --- | --- |
| cementHelper | <code>CementHelper</code> | cementHelper from a cta-restapi Brick |

<a name="SchedulersHandler+create"></a>

### schedulersHandler.create(req, res, next)
Publishes request body (Schedule) in an schedule-save Context

**Kind**: instance method of <code>[SchedulersHandler](#SchedulersHandler)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="SchedulersHandler+update"></a>

### schedulersHandler.update(req, res, next)
Publishes request body (Schedule) in an schedule-update Context

**Kind**: instance method of <code>[SchedulersHandler](#SchedulersHandler)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="SchedulersHandler+findById"></a>

### schedulersHandler.findById(req, res, next)
Publishes request params (Query) id in an schedule-find Context

**Kind**: instance method of <code>[SchedulersHandler](#SchedulersHandler)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="SchedulersHandler+delete"></a>

### schedulersHandler.delete(req, res, next)
Publishes request params (Query) id in an schedule-deleteone Context

**Kind**: instance method of <code>[SchedulersHandler](#SchedulersHandler)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="SchedulersHandler+find"></a>

### schedulersHandler.find(req, res, next)
Publishes request params (Query) in an schedule-find Context

**Kind**: instance method of <code>[SchedulersHandler](#SchedulersHandler)</code>  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="schedule"></a>

## schedule
Created by U6039884 on 7/26/2016.

**Kind**: global constant  
