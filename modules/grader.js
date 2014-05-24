var diff = require("./compareFiles.js");
var fs = require('fs');

// Test for similarity between output files.
// Note that correctness of user input is contingent
// on what this diff implementation sees as different
var filesMatch = function(f1, f2, callback) {
  diff(f1, f2, callback)
}

/*
 * Grades the file given by fileName as correct/incorrect
 * by comparing it to the result of the file specified in
 * toGrade
 * returns TRUE if the files are similar,
 * FALSE if they are not
 */
var grade = function(fileNames, toGrade, callback) {
  var gradeCallback = function(diffResult) {
    var res = !(diffResult.lines.length > 0);
    callback(res);
  }

  filesMatch(fileNames.output, toGrade, gradeCallback);
}

exports = module.exports = grade;