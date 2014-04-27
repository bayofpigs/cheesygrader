$('document').ready(function() {
  var btn = $('#gopherit');
  var name = $('namefield');
  var code = $('codefield').files[0];
  var output = $('outputfield').files[0];

  // TODO: check that our evil user actually uploaded files
  // Seriously, this jerk. 

  var codeData;
  var outputData;

  // We need both codeData and outputData before we can make the
  // call. In other words, make the call once dataGet == 2
  var dataGet = 0;

  var codeReader = new FileReader();
  codeReader.onload = function(e) {
    
  }

  // Tell our bro jquery to make the call
  var makeTheCall = function() {
    $.ajax({
      url: "/uploadajax",
      type: "POST",
      data: {
        code: codeData;
        output: outputData;
      }
    });
  };

});