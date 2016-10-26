# Application Scheduler for Compass Test Automation
# Application Scheduler for Compass Test Automation

#### Rest API
* [Setup a schedule](#setup-a-scehdule)
* [Find a schedule by Id](#find-a-schedule-by-id)
* [Update a schedule](#update-a-schedule)
* [Delete a schedule](#delete-a-schedule)

#### Setup a schedule
**Request**
```ruby
POST /schedules
{
  "schedule": "* * * * *",
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
```
**Response**
```ruby
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
```

#### Update a schedule
```ruby
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
```
**Response**
```ruby
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
```

#### Delete a schedule
```ruby
DELETE /schedules/:id
```
**Response**
```ruby
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
```
