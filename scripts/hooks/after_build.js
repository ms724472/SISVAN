'use strict';
const fs = require('fs');
const archiver = require('archiver');
module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
   console.log("Running after_build hook.");
   resolve();
     });
};