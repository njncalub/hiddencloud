(function() {
  var Player, exports;

  $(function() {
    return Nimbus.Auth.set_app_ready(function() {
      console.log("app ready called");
      if (Nimbus.Auth.authorized()) {
        $("#login-button").addClass("hidden");
        $("#logout-button").removeClass("hidden");
        $("#gamecanvas").removeClass("hidden");
        return window.auto_sync();
      }
    });
  });

  // Create NimbusBase Models:
  Player = Nimbus.Model.setup("Player", ["last_name", "first_name", "middle_name", "email_address", "gender", "cluster", "department", "birth_date"]);
  Book = Nimbus.Model.setup("Book", ["book_title", "book_text", "book_url", "date_created"]);
  Score = Nimbus.Model.setup("Score", ["score", "player", "date_created"]);

  window.log_out = function() {
    console.log('logged out');
    Nimbus.Auth.logout();
    $("#login-button").removeClass("hidden");
    $("#logout-button").addClass("hidden");
    $("#gamecanvas").addClass("hidden");
  };

  exports = this;
  exports.Player = Player;
  exports.Book = Book;
  exports.Score = Score;

}).call(this);