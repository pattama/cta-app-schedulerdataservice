# Scheduler DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md) | [Sequence Diagrams](https://www.lucidchart.com/documents/edit/4f14c5e7-a957-4099-902a-3b3a9e196b69)


## Scheduler Data Contracts
### Input
* [Create a schedule](#create-a-scehdule)
* [Update a schedule by ID](#update-a-schedule-by-id)
* [Update a schedule by ObjId and Type](#update-a-schedule-by-objid-and-type)
* [Upsert a schedule by ObjId and Type](#upsert-a-schedule-by-objid-and-type)
* [Delete a schedule by ID](#delete-a-schedule-by-id)
* [Delete a schedule by ObjId and Type](#delete-a-schedule-by-objid-and-type)

#### Create a schedule
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "create"
    },
    "payload": {
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
}
```


#### Update a schedule by Id
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "update"
    },
    "payload": {
        "id": "58105c481812e42e3c844e85",
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
}
```


#### Update a schedule by ObjId and Type
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "updatebyobjidtype"
    },
    "payload": {
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
                "nothing in real":"just to show people can add headers and body"
            }
        }
    }
}
```


#### Upsert a schedule by ObjId and Type
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "upsertbyobjidtype"
    },
    "payload": {
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
                "nothing in real":"just to show people can add headers and body"
            }
        }
    }
}
```


#### Delete a schedule by Id
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "delete"
    },
    "payload": {
        "id": "58105c481812e42e3c844e85"
    }
}
```


#### Delete a schedule by ObjId and Type
Contract:
```ruby
{
    "nature": {
        "type": "schedules",
        "quality": "deletebyobjidtype"
    },
    "payload": {
        "objId": "57e0e3ff7f256e3368cc4ecb",
        "type": "executionPendingTimeout"
    }
}
```