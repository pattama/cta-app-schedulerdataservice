var request = require('request');

// TODO : if error add log

function sendRequest(restObj){
  console.log('====> sendRequest ', restObj.url);
  return new Promise((resolve,reject) => {
    var newrestObj = JSON.parse(JSON.stringify(restObj));
    if(typeof newrestObj.body === "object") {
      newrestObj.json = true;
    }
    request(newrestObj,function(error, response, body){
      if(error){
        console.log("Error:",error);
        reject({err: error, fail: 500});
      }
      else if (response.statusCode !== 200){
        reject({err: error, fail: response.statusCode});
      }
      else {
        console.log("SUCCESS!!")
        resolve();
      }
    });
  });
}

module.exports.sendRequest = sendRequest;
