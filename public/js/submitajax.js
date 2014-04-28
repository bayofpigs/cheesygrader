$('document').ready(function() {
  var btn = $('#gopherit');

  btn.click(function() {
    /*
    var codefield = $('#codefield');
    var outputfield = $('#outputfield');
    */

    /*
    if (codefield.files === undefined || outputfield.files === undefined) {
      return;
    }
    */

    console.log(codefield);
    console.log(outputfield);
    var name = $('#namefield');
    var code = document.getElementById('codefield').files[0];
    var output = document.getElementById('outputfield').files[0];

    var formData = new FormData();
    formData.append("myname", name.val());
    formData.append("codeupload", code);
    formData.append("outputupload", output);
    /*
    var codeData;
    var outputData;


    // We need both codeData and outputData before we can make the
    // call. In other words, make the call once dataGet == 2
    var dataGet = 0;
    */

    /*
    var codeReader = new FileReader();
    console.log(codeReader);
    codeReader.onload = function(e) {
      codeData = e.target.result;
      dataGet++;
      console.log("Got: " + dataGet);
      if (dataGet === 2) {
        makeTheCall();
      }
    }
    codeReader.readAsDataURL(code);

    var outputReader = new FileReader();
    outputReader.onload = function(e) {
      outputData = e.target.result;
      dataGet++;
      console.log("Got: " + dataGet);
      if (dataGet == 2) {
        makeTheCall();
      }
    }
    outputReader.readAsDataURL(output);
    */

    // Tell our bro jquery to make the call
    var makeTheCall = function() {
      console.log("Making the call");
      $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          console.log(response)
        }
      });
    };

    makeTheCall();
  });
});