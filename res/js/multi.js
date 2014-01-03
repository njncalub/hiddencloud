(function() {
  var sync_object;
  sync_object = {
    "Dropbox": {
      "key": "sbgjel5lku38766",
      "secret": "tu2qyn94u01k7p0",
      "app_name": "The Hidden Cloud Academy"
    },
    "GDrive": {
      "key": "842525491470.apps.googleusercontent.com",
      "scope": "https://www.googleapis.com/auth/drive",
      "app_name": "The Hidden Cloud Academy"
    },
  };
  Nimbus.Auth.setup(sync_object);

  // var sync_string = "eyJHRHJpdmUiOnsia2V5IjoiODQyNTI1NDkxNDcwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIiwiYXBwX25hbWUiOiJUaGUgSGlkZGVuIENsb3VkIEFjYWRlbXkifSwiRHJvcGJveCI6eyJrZXkiOiJzYmdqZWw1bGt1Mzg3NjYiLCJzZWNyZXQiOiJ0dTJxeW45NHUwMWs3cDAiLCJhcHBfbmFtZSI6IlRoZSBIaWRkZW4gQ2xvdWQgQWNhZGVteSJ9fQ==";
  // Nimbus.Auth.setup(sync_string);

}).call(this);
