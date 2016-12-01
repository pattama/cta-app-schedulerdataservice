# Scheduler DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md)

## Scheduler Data Contracts
### Input
* [Setup a schedule](#setup-a-scehdule)
* [Update a schedule by ID](#update-a-schedule-by-id)
* [Update a schedule by ObjId and Type](#update-a-schedule-by-objid-and-type)
* [Delete a schedule by ID](#delete-a-schedule-by-id)
* [Delete a schedule by ObjId and Type](#delete-a-schedule-by-objid-and-type)

#### Setup a schedule
Contract:
```ruby
{
    "nature": {
        "type": "schedule",
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
        "type": "schedule",
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
        "type": "schedule",
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


#### Delete a schedule by Id
Contract:
```ruby
{
    "nature": {
        "type": "schedule",
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
        "type": "schedule",
        "quality": "deletebyobjidtype"
    },
    "payload": {
        "objId": "57e0e3ff7f256e3368cc4ecb",
        "type": "executionPendingTimeout"
    }
}
```