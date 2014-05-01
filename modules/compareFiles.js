var fs = require('fs');
var assert = require('assert');

// Simple, character by character comparison
var compareFilesSimple= function(file1, file2) {
  var data1, data2;
  var dataGet = 0;

  fs.readFile(file1, function(err, data) {
    data1 = data;
    dataGet++;

    if (dataGet == 2) {
      return comp();
    }
  });

  fs.readFile(file2, function(err, data) {
    data2 = data;
    dataGet++;
    
    if (dataGet == 2) {
      return comp();
    }
  });

  var comp = function() {
    if (data1.length != data2.length) {
      return false;
    }

    var len = data1.length;
    for (var i = 0; i < len; i++) {
      if (data1[i] != data2[i]) return false;
    }

    return true;
  }
}

// What's the point of this? Can't I just
// screw it and run 'diff' ?
// This implementation is admittedly very
// Shady. Will be improved upon later.
// Le sigh. The things I do for love...
var compareFiles = function(file1, file2, callback) {
  /*
  console.log(file1);
  console.log(file2);
  */
  console.log("Yer callback is " + callback);

  var data1;
  var data2;
  var dataGet = 0;

  // Read the data from file1 and file2
  fs.readFile(file1, function(err, data) {
    data1 = data;
    dataGet++;

    if (dataGet == 2) {
      // debug log
      // console.log("Get 2");
      comp();
    }
  });

  fs.readFile(file2, function(err, data) {
    data2 = data;
    dataGet++;
    if (dataGet == 2) {
      // debug log
      // console.log("Get 2");
      comp();
    }
  });

  // Compare the data in data1 and data2 (from file1 and
  // file 2 respectively)
  var comp = function() {
    // debug log
    // console.log("Begin comp");

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

    // Useless variables
    var shorterLen = len1 < len2 ? len1 : len2;
    var longLine = len1 < len2 ? data2 : data1;
    var shortLine = len1 < len2 ? data1 : data2;

    // Line lengths
    var linesCount1 = countLines(data1);
    var linesCount2 = countLines(data2);
    var moreLines = linesCount1 < linesCount2 ?
      data1 : data2;

    var line1, line2;

    line1 = grabLine(data1, 0);
    line2 = grabLine(data2, 0);

    // Debug logs. Must figure out how to dev only. TODO.
    /*
    console.log(line1);
    console.log(line2);
    */

    for (var i = 0; i < shorterLen; i++) {
      //console.log("Inside the for loop " + i);

      colNum++;
      var char1 = data1[i];
      var char2 = data2[i];
      var shortChar = shortLine[i];
      /*
      console.log(char1 + " vs " + char2);
      */

      if (char1 != char2) {
        /*
        console.log("Rut Roh: difference found");
        console.log(line1);
        console.log(line2);
        */

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

        // Extremely hackey way of jumping 
        // to the end of the line currently
        // being processed. 
        i = getEndOfLine(shortLine, i+1) - 1;

        continue;
      }

      if (String.fromCharCode(shortChar) == '\n') {
        toNextLine();
        continue;
      }

      colNum++;
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

    if (linesCount1 != linesCount2) {
      //console.log("Inside the if block");
      var beginningOfLongLine = 
        getBeginningOfLine(moreLines, shorterLen);
      diff.lines.push(beginningOfLongLine);

      var diffPos = [];
      diffPos.push(lineNum);
      diffPos.push(colNum)
      diff.locations.push(shorterLen);
    }


    //console.log("Diff: " + JSON.stringify(diff));
    callback(diff);
    //return diff;
  }
};

var countLines = function(string) {
  var count = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] == '\n') {
      count++;
    }
  }

  return count;
}

// Grab a line from start to the closest newline characters
var grabLine = function(string, start) {
  var str = "";
  while (start < string.length && 
    String.fromCharCode(string[start]) !== "\n") {
    str += String.fromCharCode(string[start]);
    start++;
  }

  return str;
};

var getEndOfLine = function(string, start) {
  while (start < string.length && string[start] != "\n") {
    start++;
  }

  return start;
}

var getBeginningOfLine = function(string, start) {
  while (start >= 0 && string[start] != "\n") {
    start--;
  }
  if (string[start] === "\n") start++;
  return start;
}

exports = module.exports =  compareFiles;