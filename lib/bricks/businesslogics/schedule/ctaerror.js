'use strict';

class CtaError extends Error {

  constructor(returnCode, brickName, err) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.returnCode = returnCode;
    this.brickName = brickName;
    this.nestedErr = err;

    //override stack
    var oldStackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
    Object.defineProperties(this, {
      stack: {
        get: function () {
          var stack = oldStackDescriptor.get.call(this);
          if (this.nestedErr) {
            stack += '\nCaused By: ' + this.nestedErr.stack;
          }
          return stack;
        }
      }

    });
  }

  // get stack() {
  //   var stack = super.stack;
  //   if (this.nestedErr) {
  //     stack += '\nCaused By: ' + this.nestedErr.stack;
  //   }
  //   return stack;
  // }

  get message() {
    return `CtaError: ${this.returnCode} in ${this.brickName}: ${this.nestedErr.message}`;
    return message;
  }
}

module.exports = CtaError;