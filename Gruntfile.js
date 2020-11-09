/**
  Copyright (c) 2015, 2016, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

var path = require('path');
var fs = require('fs');
var archiver = require('archiver');

module.exports = function(grunt) {

  require("load-grunt-config")(grunt, 
  {
    configPath: path.join(process.cwd(), "scripts/grunt/config")
  }); 

  grunt.loadNpmTasks("grunt-oraclejet");

  grunt.registerTask("build", "Public task. Calls oraclejet-build to build the oraclejet application. Can be customized with additional build tasks.", (buildType) => {
    grunt.task.run([`oraclejet-build:${buildType}`]);
	console.log("Building WAR file.");
  });

  grunt.registerTask("serve", "Public task. Calls oraclejet-serve to serve the oraclejet application. Can be customized with additional serve tasks.", (buildType) => {
    grunt.task.run([`oraclejet-serve:${buildType}`]);
  }); 
};

