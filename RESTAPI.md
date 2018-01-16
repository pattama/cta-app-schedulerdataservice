# Scheduler DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md) | [Sequence Diagrams](https://www.lucidchart.com/documents/edit/4f14c5e7-a957-4099-902a-3b3a9e196b69)


## Scheduler Data Services Application Interface

#### Rest API
* [Create a schedule](#create-a-scehdule)
* [Find a schedule by Id](#find-a-schedule-by-id)
* [Find a schedule by ObjId and Type](#find-a-schedule-by-objid-and-type)
* [Update a schedule by ID](#update-a-schedule-by-id)
* [Update a schedule by ObjId and Type](#update-a-schedule-by-objid-and-type)
* [Upsert a schedule by ObjId and Type](#upsert-a-schedule-by-objid-and-type)
* [Delete a schedule by ID](#delete-a-schedule-by-id)
* [Delete a schedule by ObjId and Type](#delete-a-schedule-by-objid-and-type)

#### Create a schedule
**Request**
```ruby
POST /sch/schedules
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
GET /sch/schedules/:id
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
GET /sch/schedules/objId/:objid/type/:type
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
PATCH /sch/schedules/:id
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

#### Upsert a schedule by ObjId and Type
```ruby
POST /sch/schedules/objid/:objid/type/:type
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
DELETE /sch/schedules/:id
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
DELETE /sch/schedules/objid/:objid/type/:type
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
