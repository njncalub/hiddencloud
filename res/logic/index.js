(function() {
  // Redirect to other page if already authorized:
  $(document).ready(function() {
    if (Nimbus.Auth.authorized()) {
      console.log("authorized!");
      window.location.replace("hiddencloud.html");
    }
  });

}).call(this);