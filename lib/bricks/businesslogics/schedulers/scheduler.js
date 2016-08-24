'use strict'
/**
 * Created by U6039884 on 7/26/2016.
 */

 //TODO : Handle error by P'Poe

const schedule = require('node-schedule');
const requestTrigger = require('./request');

function postASchedule(scheduleObj){
  return schedule.scheduleJob(scheduleObj.id,scheduleObj.schedule, function(){
    console.log(scheduleObj.id);
    requestTrigger.sendRequest(scheduleObj.rest);
  });
}

function postSchedules(scheduleObjArr){
  var success = true;
  return new Promise((resolve,reject)=>{
    if(!(scheduleObjArr instanceof Array )){
      scheduleObjArr = [scheduleObjArr];
    }
    scheduleObjArr.forEach(function(scheduleObj) {
      if(!postASchedule(scheduleObj)){
        success = false;
      }
    });
    if(success){
      resolve(success);
    } else{
      reject(success);
    }
  });
}

function updateASchedule(scheduleId,scheduleObj){
    console.log("=========UPDATE=========");
    if(!schedule.cancelJob(scheduleId)){
      return false;
    }
    if(!postASchedule(scheduleObj)){
      return false;
    }
    return true;
}

function updateSchedules(scheduleObjArr){
  console.log("=========UPDATESSSSSSSSSSSS=========");
  var success = true;
  return new Promise((resolve,reject)=>{
    if(!scheduleObjArr instanceof Array ) {
      scheduleObjArr = [scheduleObjArr];
    }
    scheduleObjArr.forEach(function(scheduleObj) {
      if(!deleteASchedule(scheduleObj.id)){
        success = false;
      }
      else if (!postASchedule(scheduleObj)) {
        success = false;
      }
    });
    if(success){
      resolve(true);
    } else{
      reject(false);
    }
  })
}

function deleteASchedule(scheduleId){
    console.log("=========DELETE=========");
    return schedule.cancelJob(scheduleId);
}

function deleteSchedules(scheduleIdArr){
  return new Promise((resolve,reject)=>{
    console.log("=========DELETESSSSSSSSSSSS=========");
    var success = true;
    if(!scheduleIdArr instanceof Array ) {
      scheduleIdArr = [scheduleIdArr];
    }
    scheduleIdArr.forEach(function (scheduleId) {
      if (!deleteASchedule(scheduleId)) {
        success = false;
      }
    });
    if(!success){
      reject(success);
    } else {
      resolve(success);
    }
  });
}

//
// var exeBody1 = {
//   source: "cta",
//   sourceid: "57919dc40ea49c201fd8zzzz",
//   nature: "test",
//   type: "execution",
//   startTimestamp: 1469160900372,
//   lastModificationTimestamp: 1469161020874,
//   lastStatus: "Cancelled",
//   status: "Cancelled",
//   failed: 0,
//   ok: 0,
//   nbModifs: 2,
//   nbStatuses: 1,
//   cta_version: "1.1.0",
//   setup: "Product Alarms 3.0 - Local Gil 3.0",
//   setupId: "573cb59cea372fed166fcee9",
//   applicationId: "202644",
//   eikonFeature: "Eikon Messenger",
//   timeout: 12,
//   pendingTimeout: 2,
//   CanceledMode: "auto"
// }
// var exeBody2 = {
//   source: "cta",
//   sourceid: "57919dc40ea49c201fd8yyyy",
//   nature: "test",
//   type: "execution",
//   startTimestamp: 1469160900372,
//   lastModificationTimestamp: 1469161020874,
//   lastStatus: "Cancelled",
//   status: "Cancelled",
//   failed: 0,
//   ok: 0,
//   nbModifs: 2,
//   nbStatuses: 1,
//   cta_version: "1.1.0",
//   setup: "Product Alarms 3.0 - Local Gil 3.0",
//   setupId: "573cb59cea372fed166fcee9",
//   applicationId: "202644",
//   eikonFeature: "Eikon Messenger",
//   timeout: 12,
//   pendingTimeout: 2,
//   CanceledMode: "auto"
// }
// var exeBody3 = {
//   source: "cta",
//   sourceid: "57919dc40ea49c201fd8xxxx",
//   nature: "test",
//   type: "execution",
//   startTimestamp: 1469160900372,
//   lastModificationTimestamp: 1469161020874,
//   lastStatus: "Cancelled",
//   status: "Cancelled",
//   failed: 0,
//   ok: 0,
//   nbModifs: 2,
//   nbStatuses: 1,
//   cta_version: "1.1.0",
//   setup: "Product Alarms 3.0 - Local Gil 3.0",
//   setupId: "573cb59cea372fed166fcee9",
//   applicationId: "202644",
//   eikonFeature: "Eikon Messenger",
//   timeout: 12,
//   pendingTimeout: 2,
//   CanceledMode: "auto"
// }
// var tmp1 = {
//   "id": "scenario-787890897890-1",
//   "schedule": '*/1 * * * * *',
//   "rest": {
//     "method": "POST",
//     "url": "http://localhost:32491/v1/executions",
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "body": exeBody1
//   }
// };
// var tmp2 = {
//   "id": "scenario-787890897890-2",
//   "schedule": '*/3 * * * * *',
//   "rest": {
//     "method": "POST",
//     "url": "http://localhost:32491/v1/executions",
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "body": exeBody2
//   }
// };
//
// postSchedule(tmp1);
// postSchedule(tmp2);
// setTimeout(function(){
//   // tmp1.body = exeBody3;
//   // tmp1.schedule = '*/5 * * * * *';
//   // tmp2.body = exeBody3;
//   // tmp2.schedule = '*/5 * * * * *';
//   deleteSchedules([tmp1.id,tmp2.id]);
// }, 5000);
// // postSchedule(tmp2);

module.exports = {
  postASchedule: postASchedule,
  updateASchedule: updateASchedule,
  deleteASchedule: deleteASchedule,
  postSchedules: postSchedules,
  updateSchedules: updateSchedules,
  deleteSchedules: deleteSchedules,
}
