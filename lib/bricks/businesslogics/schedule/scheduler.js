'use strict'
/**
 * Created by U6039884 on 7/26/2016.
 */

const schedule = require('node-schedule');
const requester = require('./requester');

/**
 * Scheduler Helper class
 */
class Scheduler {

  /**
   * Set up a schedule
   * @param scheduleObj
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was setup successfully
   */
  static setupSchedule(scheduleObj){
    return schedule.scheduleJob(scheduleObj.id, scheduleObj.schedule, function(){
      console.log(scheduleObj.id);
      requester.sendRequest(scheduleObj.rest);
    });
  }

  /**
   * Update a schedule
   * @param scheduleId - unique identifier of schedule
   * @param {Object} scheduleObj - replacement schedule
   * @param {String} scheduleObj.id - unique identifier
   * @param {String} scheduleObj.schedule - a String of cron-format. @example * * * * *
   * @param {Object} scheduleObj.rest - a callback rest
   * @param {String} scheduleObj.rest.url - a URL of rest
   * @param {Object} scheduleObj.rest.headers - a map of headers
   * @param {*} scheduleObj.rest.body - a JSON object or String
   * @returns {boolean} - returns true if the schedule was updated successfully
   */
  static updateSchedule(scheduleId, scheduleObj){
    if(!schedule.cancelJob(scheduleId)){
      return false;
    }
    if(!Scheduler.setupSchedule(scheduleObj)){
      return false;
    }
    return true;
  }


  /**
   * Cancel a schedule
   * @param scheduleId - unique identifier of schedule
   * @returns {boolean} - returns true if the schedule was cancelled successfully
   */
  static cancelSchedule(scheduleId){
    return schedule.cancelJob(scheduleId);
  }

}
//function setupSchedule(scheduleObj){
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
//      if(!setupSchedule(scheduleObj)){
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
//      else if (!setupSchedule(scheduleObj)) {
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
