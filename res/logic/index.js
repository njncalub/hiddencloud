(function() {

  function loadPageVar(sVar) {
    // from https://developer.mozilla.org/en-US/docs/Web/API/window.location
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  function sendUserID() {
    // send uid to hidden cloud server
    var uid = loadPageVar("uid");
    console.log(uid);

    var data = JSON.stringify({
      "genre": uid,
    });

    $.ajax({
      async: false,
      url: 'http://hiddencloud.pythonanywhere.com/api/v1/book_genre/?username=hiddencloud&api_key=4046620e647b74202baedfa04af40588a84866ec',
      type: 'POST',
      contentType: 'application/json',
      data: data,
      dataType: 'json',
      processData: false,
      // beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
      success: function() {console.log("finished ajax call, hopefully sent data to server.")},
    });
  }

  function check_if_authorized() {
    console.log('check_if_authorized() called.');
    if (Nimbus.Auth.authorized()) {
      console.log("user is authorized!");
      sendUserID();
      console.log("transferring to main page...");
      window.location = "main.html";
    }
    else {
      console.log("not yet authorized!");
    }
  };

  // Redirect to main page if already authorized:
  $(document).ready(function() {
    window.setInterval(function() {
      check_if_authorized();
    }, 5000);
  });

}).call(this);