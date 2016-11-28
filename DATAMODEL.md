# Schedule Data Models
[Schedule](#schedule)

## Schedule
+ id: id
+ objId: String
  - Identifier of the Scenario for which the Execution is created
+ type: String
  - type of objId. Composite of objId and type is unique
+ schedule: String/Integer
  - Cron string or timestamp number to trigger the `rest`
+ rest: Object
  - Object of HTTP callback rest api. consists of url, method, headers and body
+ rest.url: String
  - HTTP URL
+ rest.method: String
  - HTTP method
+ rest.headers: Object
  - HTTP header fields
+ rest.body: Object
  - HTTP body
- scheduledBy: String
  - Scheduler name which did trigger the latest
- scheduledTimestamp: String
  - Timestamp when schedule was triggered latest