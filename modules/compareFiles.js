var fs = require('fs');
var assert = require('assert');

// What's the point of this? Can't I just
// screw it and run 'diff' ?
// This isn't even an exact implementation of diff:
// it sucks.
// Le sigh. The things I do for love...
var compareFiles = function(file1, file2) {
  console.log(file1);
  console.log(file2);

  var data1;
  var data2;
  var dataGet = 0;

  // Read the data from file1 and file2
  fs.readFile(file1, function(err, data) {
    data1 = data;
    dataGet++;

    if (dataGet == 2) {
      // debug log
      console.log("Get 2");

      return comp();
    }
  });

  fs.readFile(file2, function(err, data) {
    data2 = data;
    dataGet++;
    if (dataGet == 2) {
      // debug log
      console.log("Get 2");

      return comp();
    }
  });

  // Compare the data in data1 and data2 (from file1 and
  // file 2 respectively)
  var comp = function() {
    // debug log
    console.log("Begin comp");

    // Contains array of strings (different lines)
    // And array of tuples (line number + column num)
    var diff = {};
    diff.lines = [];
    diff.locations = [];

    var lineNum = 1;

    // colNum starts at 0; will increment to 1 at the
    // beginning of for loop. Not necessarily a clever
    // move.
    var colNum = 0;

    // Length of line1 and line2
    var len1 = data1.length;
    var len2 = data2.length;

    // debug log
    console.log(len1);
    console.log(len2);

    var shorterLen = len1 < len2 ? len1 : len2;

    var line1, line2;
    line1 = grabLine(data1, 0);
    line2 = grabLine(data2, 0);

    // Debug logs. Must figure out how to dev only. TODO.
    console.log(line1);
    console.log(line2);

    for (var i = 0; i < shorterLen; i++) {
      console.log("Inside the for loop " + i);

      colNum++;
      var char1 = line1[i];
      var char2 = line2[i];

      if (char1 != char2) {
        var diffLines = [];
        var diffPos = [];

        // Tuple of difference
        diffLines.push(line1);
        diffLines.push(line2);
        // Append difference to the list
        diff.lines.push(diffLines);

        // Tuple of location
        diffPos.push(lineNum);
        diffPos.push(colNum);
        // Append locations to list
        diff.locations.push(diffPos);
        toNextLine();
        continue;
      }

      if (char1 == '\n') {
        toNextLine();
        continue;
      }

      // Advance to the next line
      var toNextLine = function() {
        lineNum++;
        colNum = 0;
        line1 = grabLine(data1, i + 1);
        line2 = grabLine(data2, i + 1);

        // Debug console logs:
        console.log(line1);
        console.log(line2);
      }
    }
    console.log("Diff: " + JSON.stringify(diff));
    return diff;
  }
};

// Grab a line from start to the closest newline characters
var grabLine = function(string, start) {
  var str = "";
  while (start < string.length && string[start] != "\n") {
    str += String.fromCharCode(string[start]);
    start++
  }

  return str;
};

exports = module.exports =  compareFiles;