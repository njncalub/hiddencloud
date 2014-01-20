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
      Player.sync_all( function(){ console.log("Everything is synced") } );
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
    });

    // check if has existing profile:
    if (Player.count() > 0) {
      player_profile = Player.last();

      // replace placeholder text
      $("#last_name").val(player_profile.last_name);
      $("#first_name").val(player_profile.first_name);
      $("#middle_name").val(player_profile.middle_name);
      $("#email_address").val(player_profile.email_address);
      $("#gender").val(player_profile.gender);
      $("#cluster").val(player_profile.cluster);
      $("#department").val(player_profile.department);

    }
    // load values first:

  };

  function change_cluster_dropdown() {
    
  };

  window.save_profile = function() {
    console.log("save_profile() called.");

    if (Player.count() > 0) {
      player_profile = Player.last();
    }
    else {
      player_profile = Player.create();
    }

    player_profile.last_name = $("#last_name").val();
    player_profile.first_name = $("#first_name").val();
    player_profile.middle_name = $("#middle_name").val();
    player_profile.email_address = $("#email_address").val();
    player_profile.gender = $("#gender").val();
    player_profile.cluster = $("#cluster").val();
    player_profile.department = $("#department").val();

    player_profile.save();

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