(function() {

  function initialise() {
    console.log('initialise() called.');
    if (Nimbus.Auth.authorized()) {
      console.log("user authorized!");
      window.location = "main.html";
    }
    else {
      console.log("not yet authorized!");
    }
  };

  // Redirect to main page if already authorized:
  $(document).ready(function() {
    initialise();
  });

  // $(document).ajaxComplete(function() {
  //   console.log('ajaxComplete() called.');
  // });

}).call(this);