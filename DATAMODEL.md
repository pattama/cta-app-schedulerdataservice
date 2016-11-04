# Schedule DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md)  

### Schedule DataModel

*id:ObjectId
objId:String(Test, TestSuite, Scenario, etc...)
type:String
schedule: String // cron or ISO String rest: {
  headers:{
    keyString:valueString
  },
  url:String,
  method:String,
  body:Object
}
scheduledBy: String
scheduledTimestamp: 