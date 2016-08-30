'use strict'
/**
 * Created by U6039884 on 7/26/2016.
 */

 //TODO : Handle error by P'Poe

const schedule = require('node-schedule');
const requester = require('./requester');

class Scheduler {
  static arrangeSchedule(scheduleObj){
    return schedule.scheduleJob(scheduleObj.id, scheduleObj.schedule, function(){
      console.log(scheduleObj.id);
      requester.sendRequest(scheduleObj.rest);
    });
  }

  static updateSchedule(scheduleId,scheduleObj){
    if(!schedule.cancelJob(scheduleId)){
      return false;
    }
    if(!Scheduler.arrangeSchedule(scheduleObj)){
      return false;
    }
    return true;
  }

  static cancelSchedule(scheduleId){
    return schedule.cancelJob(scheduleId);
  }

}
//function arrangeSchedule(scheduleObj){
//  return schedule.scheduleJob(scheduleObj.id, scheduleObj.schedule, function(){
//    console.log(scheduleObj.id);
//    requester.sendRequest(scheduleObj.rest);
//  });
//}
//
//function arrangeSchedules(scheduleObjArr){
//  var success = true;
//  return new Promise((resolve,reject)=>{
//    if(!(scheduleObjArr instanceof Array )){
//      scheduleObjArr = [scheduleObjArr];
//    }
//    scheduleObjArr.forEach(function(scheduleObj) {
//      if(!arrangeSchedule(scheduleObj)){
//        success = false;
//      }
//    });
//    if(success){
//      resolve(success);
//    } else{
//      reject(success);
//    }
//  });
//}
//
//function updateSchedules(scheduleObjArr){
//  var success = true;
//  return new Promise((resolve,reject)=>{
//    if(!scheduleObjArr instanceof Array ) {
//      scheduleObjArr = [scheduleObjArr];
//    }
//    scheduleObjArr.forEach(function(scheduleObj) {
//      if(!cancelSchedule(scheduleObj.id)){
//        success = false;
//      }
//      else if (!arrangeSchedule(scheduleObj)) {
//        success = false;
//      }
//    });
//    if(success){
//      resolve(true);
//    } else{
//      reject(false);
//    }
//  })
//}
//
//function cancelSchedules(scheduleIdArr){
//  return new Promise((resolve,reject)=>{
//    var success = true;
//    if(!scheduleIdArr instanceof Array ) {
//      scheduleIdArr = [scheduleIdArr];
//    }
//    scheduleIdArr.forEach(function (scheduleId) {
//      if (!cancelSchedule(scheduleId)) {
//        success = false;
//      }
//    });
//    if(!success){
//      reject(success);
//    } else {
//      resolve(success);
//    }
//  });
//}

module.exports = Scheduler;
