(function() {
  var sync_object;

  sync_object = {
    "Dropbox": {
      "key": "sbgjel5lku38766",
      "secret": "tu2qyn94u01k7p0",
      "app_name": "The Hidden Cloud Academy"
    },
    "GDrive": {
      "key": "424243246254-n6b2v8j4j09723ktif41ln247n75pnts.apps.googleusercontent.com",
      "scope": "https://www.googleapis.com/auth/drive",
      "app_name": "diary_app"
    },
  };

  Nimbus.Auth.setup(sync_object);

}).call(this);
