$('document').ready(function() {
  var btn = $('#gopherit');

  btn.click(function() {
    var codefield = $('#codefield');
    var outputfield = $('#outputfield');

    /*
    if (codefield.files === undefined || outputfield.files === undefined) {
      return;
    }
    */
    var name = $('#namefield');
    var code = codefield.val();
    var output = outputfield.val();

    var codeData;
    var outputData;

    console.log(code);
    console.log(output);

    // We need both codeData and outputData before we can make the
    // call. In other words, make the call once dataGet == 2
    var dataGet = 0;

    var codeReader = new FileReader();
    codeReader.onload = function(e) {
      codeData = e.target.result;
      dataGet++;
      if (dataGet === 2) {
        makeTheCall();
      }
    }

    var outputReader = new FileReader();
    outputReader.onload = function(e) {
      outputData = e.target.result;
      dataGet++;
      if (dataGet == 2) {
        makeTheCall();
      }
    }

    // Tell our bro jquery to make the call
    var makeTheCall = function() {
      console.log("Making the call");
      $.ajax({
        url: "/uploadajax",
        type: "POST",
        data: {
          code: codeData,
          output: outputData
        }
      });
    };
  });
});