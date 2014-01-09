// trial2
(function() {
  var Player, Book, Score, LogBook;
  var exports;

  create_log = function(type) {
    LogBook.create({
      "type":type,
      "date_created":Date(),
    });
  }

  $(function() {
    return Nimbus.Auth.set_app_ready(function() {
      console.log("app ready!");
      var pathArray = window.location.pathname.split( '/' );
      if (pathArray[pathArray.length-1] == "index.html") {
        if(Nimbus.Auth.authorized()) {
          // Create log
          create_log("login successful");
          console.log("creating log");
          window.location = "main.html";
        }
      }
      else {
        if (!Nimbus.Auth.authorized()) {
          console.log("not yet authorized!");
          window.location = "index.html";
        }
      }
    });
  });

  // Create NimbusBase Models:
  Player = Nimbus.Model.setup("Player", ["last_name", "first_name", "middle_name", "email_address", "gender", "cluster", "department", "birth_date"]);
  Book = Nimbus.Model.setup("Book", ["book_title", "book_text", "book_url", "date_created"]);
  Score = Nimbus.Model.setup("Score", ["score", "player", "date_created"]);
  LogBook = Nimbus.Model.setup("LogBook", ["type", "date_created"]);

  window.edit_profile = function() {
    console.log("edit_profile() called.");
    $('#myModal').modal({
      keyboard: false,
    }
    );
  };

  window.log_out = function() {
    console.log("log_out() called.");
    Nimbus.Auth.logout();
    window.location = "index.html";
    console.log('user is logged out');
    window.alert('You are logged out!');
  };

  exports = this;
  exports.Player = Player;
  exports.Book = Book;
  exports.Score = Score;
  exports.LogBook = LogBook;

}).call(this);