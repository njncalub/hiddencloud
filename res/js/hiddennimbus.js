(function() {
  var Player, Book, Score, Logbook, exports;

  var sync_string = "eyJHRHJpdmUiOnsia2V5IjoiODQyNTI1NDkxNDcwLW5ycXU5MHRkNG04dWRudDR2Y3Bxcjk1b2swZnF0YWh0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIiwiYXBwX25hbWUiOiJUaGUgSGlkZGVuIENsb3VkIEFjYWRlbXkifSwiRHJvcGJveCI6eyJrZXkiOiJzYmdqZWw1bGt1Mzg3NjYiLCJzZWNyZXQiOiJ0dTJxeW45NHUwMWs3cDAiLCJhcHBfbmFtZSI6IlRoZSBIaWRkZW4gQ2xvdWQgQWNhZGVteSJ9fQ==";
  Nimbus.Auth.setup(sync_string);

  $(function() {
    return Nimbus.Auth.set_app_ready(function() {
      console.log("app ready called");
      if (Nimbus.Auth.authorized()) {
        // $("#login-button").addClass("hidden");
        // $("#logout-button").removeClass("hidden");
        // $("#gamecanvas").removeClass("hidden");
        return window.auto_sync();
      }
    });
  });

  // Create NimbusBase Models:
  Player = Nimbus.Model.setup("Player", ["last_name", "first_name", "middle_name", "email_address", "gender", "cluster", "department", "birth_date"]);
  Book = Nimbus.Model.setup("Book", ["book_title", "book_text", "book_url", "date_created"]);
  Score = Nimbus.Model.setup("Score", ["score", "player", "date_created"]);
  LogBook = Nimbus.Model.setup("LogBook", ["date_created"]);

  window.log_out = function() {
    console.log('logged out');
    Nimbus.Auth.logout();
    // $("#login-button").removeClass("hidden");
    // $("#logout-button").addClass("hidden");
    // $("#gamecanvas").addClass("hidden");
  };

  // Export objects
  exports = this;
  exports.Player = Player;
  exports.Book = Book;
  exports.Score = Score;
  exports.LogBook = LogBook;

}).call(this);