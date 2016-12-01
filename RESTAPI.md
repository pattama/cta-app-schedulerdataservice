# Scheduler DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md)


## Scheduler Data Services Application Interface

#### Rest API
* [Setup a schedule](#setup-a-scehdule)
* [Find a schedule by Id](#find-a-schedule-by-id)
* [Find a schedule by ObjId and Type](#find-a-schedule-by-objid-and-type)
* [Update a schedule by ID](#update-a-schedule-by-id)
* [Update a schedule by ObjId and Type](#update-a-schedule-by-objid-and-type)
* [Delete a schedule by ID](#delete-a-schedule-by-id)
* [Delete a schedule by ObjId and Type](#delete-a-schedule-by-objid-and-type)

#### Setup a schedule
**Request**
```ruby
POST /schedules
{
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "* * * * *", // cron string or timestamp(number)
  "rest": {
    "method": "POST",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real":"just to show people can add headers and body"
    }
  }
}
```

**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "* * * * *",
  "rest": {
    "method": "POST",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  }
}
```

#### Find a schedule by Id
**Request**
```ruby
GET /schedules/:id
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "* * * * *",
  "rest": {
    "method": "POST",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467300171
}
```

#### Find a schedule by ObjId and Type
**Request**
```ruby
GET /schedules/objId/:objid/type/:type
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "* * * * *",
  "rest": {
    "method": "POST",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467300171
}
```

#### Update a schedule by Id
```ruby
PATCH /schedules/:id
{
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real":"just to show people can add headers and body"
    }
  }
}
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467480171
}
```

#### Update a schedule by ObjId and Type
```ruby
PATCH /schedules/objid/:objid/type/:type
{
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real":"just to show people can add headers and body"
    }
  }
}
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467480171
}
```

#### Delete a schedule by Id
```ruby
DELETE /schedules/:id
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467540170
}
```


#### Delete a schedule by ObjId and Type
```ruby
DELETE /schedules/objid/:objid/type/:type
```
**Response**
```ruby
{
  "id": "58105c481812e42e3c844e85",
  "objId": "57e0e3ff7f256e3368cc4ecb",
  "type": "executionPendingTimeout",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://localhost:3000",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  },
  "scheduledBy": null,
  "scheduledTimestamp": 1477467540170
}
```
