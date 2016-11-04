# Schedule DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md)  

Rest API

Setup a schedule
Find a schedule by Id
Update a schedule
Delete a schedule


##Setup a schedule:

```Request
POST /schedules
{
  "schedule": "* * * * *", // cron string or timestamp(number)
  "rest": {
    "method": "POST",
    "url": "http://www.google.com",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real":"just to show people can add headers and body"
    }
  }
}
Response
{
  "id": "58105c481812e42e3c844e85",
  "schedule": "* * * * *",
  "rest": {
    "method": "POST",
    "url": "http://www.google.com",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real": "just to show people can add headers and body"
    }
  }
}```


##Find a schedule by Id

Request
GET /schedules/:id
Response
{
  "id": "58105c481812e42e3c844e85",
  "schedule": "* * * * *",
  "rest": {
    "method": "POST",
    "url": "http://www.google.com",
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
Update a schedule

PATCH /schedules/:id
{
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://www.yahoo.com",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "nothing in real":"just to show people can add headers and body"
    }
  }
}
Response
{
  "id": "58105c481812e42e3c844e85",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://www.yahoo.com",
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
Delete a schedule

DELETE /schedules/:id
Response
{
  "id": "58105c481812e42e3c844e85",
  "schedule": "*/10 * * * * *",
  "rest": {
    "method": "GET",
    "url": "http://www.yahoo.com",
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