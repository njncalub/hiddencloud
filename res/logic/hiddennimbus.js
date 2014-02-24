(function() {
  var Player, Book, Score, LogBook;
  var exports;

  Nimbus.Auth.authorized_callback = function() {
    console.log("authentication finished");
    // send log to server
  };

  create_log = function(type) {
    LogBook.create({
      "type":type,
      "date_created":Date(),
    });
  }

  $(document).ready(function() {
    change_cluster_dropdown();
  });

  // Create NimbusBase Models:
  Player = Nimbus.Model.setup("Player", ["last_name", "first_name", "middle_name", "email_address", "gender", "cluster", "current_year", "department", "birth_date", "benchmark_speed", "benchmark_correct_items", "benchmark_wrong_items", "resource_uri"]);
  Book = Nimbus.Model.setup("Book", ["book_title", "book_content", "book_url", "date_created"]);
  Score = Nimbus.Model.setup("Score", ["score", "player", "date_created"]);
  GameResult = Nimbus.Model.setup("GameResult", ["training_date", "average_wpm", "average_rc", "total_correct", "quiz_score"]);
  LogBook = Nimbus.Model.setup("LogBook", ["type", "date_created"]);

  $(function() {
    return Nimbus.Auth.set_app_ready(function() {
      console.log("app ready!");

      // Sync data:
      Player.sync_all( function(){ console.log("Player is synced") } );
      Book.sync_all( function(){ console.log( Book.count() + " books is synced"); window.refresh_books(); } );

      // Check path:
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

      Book.sync_all();
      window.refresh_books();

      hca_functions.sync_model("all");
    });
  });

  var cluster_choices = [
    {
      "cluster":"Accountancy",
      "short_name":"ACC",
      "departments":[
        {
          "short_name":"BSA",
          "department":"Bachelor of Science in Accountancy",
        },
        {
          "short_name":"BS AcT",
          "department":"Bachelor of Science in Accounting Technology",
        },
      ],
    },
    {
      "cluster":"Business and Management",
      "short_name":"BM",
      "departments":[
        {
          "short_name":"BSBM",
          "department":"Bachelor of Science in Business Management",
        },
        {
          "short_name":"BS ENTREP",
          "department":"Bachelor of Science in Entrepreneurship",
        },
        {
          "short_name":"BS FIN",
          "department":"Bachelor of Science in Finance",
        },
        {
          "short_name":"BS HRM",
          "department":"Bachelor of Science in Human Resource Management",
        },
        {
          "short_name":"BS MKTG",
          "department":"Bachelor of Science in Marketing",
        },
      ],
    },
    {
      "cluster":"Computer Studies",
      "short_name":"CS",
      "departments":[
        {
          "short_name":"BS CS",
          "department":"Bachelor of Science in Computer Science",
        },
        {
          "short_name":"BS IS",
          "department":"Bachelor of Science in Information Systems",
        },
        {
          "short_name":"BS IT",
          "department":"Bachelor of Science in Information Technology",
        },
      ],
    },
    {
      "cluster":"Education",
      "short_name":"EDUC",
      "departments":[
        {
          "short_name":"BEED",
          "department":"Bachelor of Elementary Education - General",
        },
        {
          "short_name":"BEED-PS",
          "department":"Bachelor of Elementary Education - Preschool",
        },
        {
          "short_name":"BSED-ENGLISH",
          "department":"Bachelor of Secondary Education Major in English",
        },
        {
          "short_name":"BSED-MATH",
          "department":"Bachelor of Secondary Education Major in Math",
        },
        {
          "short_name":"BSED-PHYS",
          "department":"Bachelor of Secondary Education Major in Physical Sciences",
        },
        {
          "short_name":"BSED-SS",
          "department":"Bachelor of Secondary Education Major in Social Studies",
        },
        {
          "short_name":"BSED-BIO",
          "department":"Bachelor of Secondary Education Major in Biological Sciences",
        },
      ],
    },
    {
      "cluster":"Engineering and Architecture",
      "short_name":"EA",
      "departments":[
        {
          "short_name":"BS Arch",
          "department":"Bachelor of Science in Architecture",
        },
        {
          "short_name":"BS CE",
          "department":"Bachelor of Science in Civil Engineering",
        },
        {
          "short_name":"BS Comp Eng",
          "department":"Bachelor of Science in Computer Engineering",
        },
        {
          "short_name":"BS ChE",
          "department":"Bachelor of Science in Chemical Engineering",
        },
        {
          "short_name":"BS ECE",
          "department":"Bachelor of Science in Electronics and Communications Engineering",
        },
        {
          "short_name":"BS EE",
          "department":"Bachelor of Science in Electrical Engineering",
        },
        {
          "short_name":"BS IE",
          "department":"Bachelor of Science in Industrial Engineering",
        },
        {
          "short_name":"BS ME",
          "department":"Bachelor of Science in Mechanical Engineering",
        },
      ],
    },
    {
      "cluster":"Humanities and Letters",
      "short_name":"HUMLET",
      "departments":[
        {
          "short_name":"AB ENG",
          "department":"Bachelor of Arts in English",
        },
        {
          "short_name":"AB MC",
          "department":"Bachelor of Arts in Mass Communication",
        },
        {
          "short_name":"AB PHILO",
          "department":"Bachelor of Arts Major in Philosophy",
        },
      ],
    },
    {
      "cluster":"Natural Sciences and Mathematics",
      "short_name":"NSM",
      "departments":[
        {
          "short_name":"BS BIO",
          "department":"Bachelor of Science in Biology",
        },
        {
          "short_name":"BS CHEM",
          "department":"Bachelor of Science in Chemistry",
        },
        {
          "short_name":"BS MATH",
          "department":"Bachelor of Science in Mathematics",
        },
        {
          "short_name":"BS ENVI SCI",
          "department":"Bachelor of Science in Environmental Science",
        },
      ],
    },
    {
      "cluster":"Nursing",
      "short_name":"CON",
      "departments":[
        {
          "short_name":"BSN",
          "department":"Bachelor of Science in Nursing",
        },
        
      ],
    },
    {
      "cluster":"Social Sciences",
      "short_name":"SS",
      "departments":[
        {
          "short_name":"AB ECON",
          "department":"Bachelor of Arts in Economics",
        },
        {
          "short_name":"AB IS-AMST",
          "department":"Bachelor of Arts in International Studies - Major in American Studies",
        },
        {
          "short_name":"AB IS-ASST",
          "department":"Bachelor of Arts in International Studies - Major in Asian Studies",
        },
        {
          "short_name":"AB POLSCI",
          "department":"Bachelor of Arts in Political Science",
        },
        {
          "short_name":"AB PSYCH",
          "department":"Bachelor of Arts in Psychology",
        },
        {
          "short_name":"AB SOCIO",
          "department":"Bachelor of Arts in Sociology",
        },
        {
          "short_name":"BSSW",
          "department":"Bachelor of Science in Social Work",
        },
      ],
    },
  ]; // /cluster_choices


  function load_cluster_department() {
    console.log("load_cluster_department() called.");

    // check if has existing profile:
    if (Player.count() > 0) {
      player_profile = Player.last();

    // load clusters:
    var options = [];
    for (var i=0; i < cluster_choices.length; i++) {
      options.push('<option value="', 
        cluster_choices[i].cluster, '">',
        cluster_choices[i].cluster, '</option>'
        );
    }
    $("#cluster").html(options.join(''));
    $("#cluster").val(player_profile.cluster);

    // load departments:
    for (var i=0; i < cluster_choices.length; i++) {
      if( $("#cluster").val() == cluster_choices[i].cluster) {
        var options2 = [];
        for (var j=0; j < cluster_choices[i].departments.length; j++) {
          options2.push('<option value="', 
            cluster_choices[i].departments[j].department, '">',
            cluster_choices[i].departments[j].department, '</option>'
            );
        }
        $("#department").html(options2.join(''));
        //$("#department").val(cluster_choices[i].departments[0].department);
        //load_cluster_department();
      }
    }
    $("#department").val(player_profile.department);

    }
  }

  window.edit_profile = function() {
    console.log("edit_profile() called.");
    // Player.sync_all();
    $('#editProfileModal').modal({
      keyboard: false,
    });

    load_cluster_department();

    var started = Date.now();
    var interval = setInterval(function() {
      if (Date.now() - started > 7000) {
        clearInterval(interval);
        console.log(Player.all());
      }
      else {
        // check if has existing profile:
        if (hca_functions.has_user_profile()) {
          load_cluster_department();
          player_profile = Player.last();
          window.current_profile = player_profile;

          // replace placeholder text
          $("#last_name").val(player_profile.last_name);
          $("#first_name").val(player_profile.first_name);
          $("#middle_name").val(player_profile.middle_name);
          $("#birth_date").val(player_profile.birth_date);
          $("#email_address").val(player_profile.email_address);
          $("#gender").val(player_profile.gender);
          $("#current_year").val(player_profile.current_year);
          $("#cluster").val(player_profile.cluster);
          $("#department").val(player_profile.department);
          console.log(Player.all());
        }
      }
    }, 100);

    // // check if has existing profile:
    // if (hca_functions.has_user_profile()) {
    //   player_profile = Player.last();
    //   window.current_profile = player_profile;

    //   // replace placeholder text
    //   $("#last_name").val(player_profile.last_name);
    //   $("#first_name").val(player_profile.first_name);
    //   $("#middle_name").val(player_profile.middle_name);
    //   $("#birth_date").val(player_profile.birth_date);
    //   $("#email_address").val(player_profile.email_address);
    //   $("#gender").val(player_profile.gender);
    //   $("#current_year").val(player_profile.current_year);
    //   $("#cluster").val(player_profile.cluster);
    //   $("#department").val(player_profile.department);
    // }
  };

//!! MANAGE BOOKS FUNCTIONS:
  var selected_book;
  // var selected_book_id;

  window.manage_books = function() {
    console.log("manage_books() called.");
    window.location = "books.html";
  }

  window.refresh_books = function() {
    console.log("refresh_books() called.");
    Book.sync_all();
    $('#all-books-ul').empty();
    all_books = Book.all();
    for (var i=0; i<all_books.length; i++) {
      $("#all-books-ul").append(
        '<a href="#" class="list-group-item book-li" id="' + all_books[i].id +  '">' +
        all_books[i].book_title +
        '</a>'
      );
    }
  }

  window.load_book = function(book_id) {
    console.log("load_book() called.");
    console.log("book id: " + book_id);

    // window.selected_book_id = book_id;
    window.selected_book_id = book_id;
    // console.log("selected_book_id is now: " + window.selected_book_id)
    Book.sync_all();
    selected_book = Book.find(selected_book_id);

    $("#book_title").val(selected_book.book_title);
    $("#book_content").val(selected_book.book_content);
  }

  function import_text_file(file)
  {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file.link, true);
    rawFile.onreadystatechange = function ()
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
          var allText = rawFile.responseText;
          // console.log(allText);

          $("#book_title").val(file.name);
          $("#book_content").val(allText);

          var book_title = $("#book_title").val();
          var book_content = $("#book_content").val();

          selected_book = Book.create({"book_title":book_title, "book_content":book_content, "date_created":Date()});
          window.refresh_books();
        }
      }
    }
    rawFile.send(null);
  }

  window.save_book = function() {
    console.log("save_book() called.");

    // Add dismissable error if field is blank:
    if ( !$("#book_title").val() || !$("#book_content").val() ) {
      $("#alert-here").append(
        '<div class="alert alert-warning alert-dismissable">' +
          '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
          '<strong>Warning!</strong> Please fill in all the fields.' +
        '</div>'
      );
    }

    var sb = Book.find(window.selected_book_id);
    var book_title = $("#book_title").val();
    var book_content = $("#book_content").val();

    // get selected book
    if (sb) {
      //console.log(selected_book);
      sb.book_title = book_title;
      sb.book_content = book_content;
      sb.save();
      console.log("saved book " + sb.book_title + "!");
    }
    else {
      // save new book
      selected_book = Book.create({"book_title":book_title, "book_content":book_content, "date_created":Date()});
    }
    window.refresh_books();

    selected_book = {};
    $("#book_title").val("");
    $("#book_content").val("");

    // if has currently selected book:

    // if (selected_book != {}) {
    //   selected_book.book_title = book_title;
    //   selected_book.book_content = book_content;
    //   selected_book.save();
    // }
    // else {
    //   selected_book = Book.create({"book_title":book_title, "book_content":book_content, "date_created":Date()});
    // }

  }

  window.delete_book = function() {
    console.log("delete_book() called.");
    selected_book = Book.find(window.selected_book_id);
    selected_book.destroy();
    Book.sync_all();
    window.refresh_books();
  }

  function change_cluster_dropdown() {

    // populate cluster list:
    var options = [];
    for (var i=0; i < cluster_choices.length; i++) {
      options.push('<option value="', 
        cluster_choices[i].cluster, '">',
        cluster_choices[i].cluster, '</option>'
        );
    }
    $("#cluster").html(options.join(''));

    $("#cluster").change(function() {

      for (var i=0; i < cluster_choices.length; i++) {
        if( $("#cluster").val() == cluster_choices[i].cluster) {
          var options2 = [];
          for (var j=0; j < cluster_choices[i].departments.length; j++) {
            options2.push('<option value="', 
              cluster_choices[i].departments[j].department, '">',
              cluster_choices[i].departments[j].department, '</option>'
              );
          }
          $("#department").html(options2.join(''));
        }
      }

    });
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
    player_profile.birth_date = $("#birth_date").val();
    player_profile.email_address = $("#email_address").val();
    player_profile.gender = $("#gender").val();
    player_profile.current_year = $("#current_year").val();
    player_profile.cluster = $("#cluster").val();
    player_profile.department = $("#department").val();

    player_profile.save();
    window.current_profile = player_profile;
    hca_functions.send_profile(player_profile);

    $('#editProfileModal').modal('hide');

    // console.log(player_profile);
  };

  window.log_out = function() {
    console.log("log_out() called.");
    Nimbus.Auth.logout();
    window.location = "index.html";
    console.log('user is logged out');
    window.alert('You are logged out!');
  };

  var db_options = {
      success: function(files) {
        // alert("Here's the file link: " + files[0].link)
        // console.log(files[0]);
        import_text_file(files[0]);
      },
      cancel: function() {
      },

      linkType: "direct",
      multiselect: false,
      extensions: ['.pdf', '.doc', '.docx', '.txt'],
    };

  exports = this;
  exports.Player = Player;
  exports.Book = Book;
  exports.Score = Score;
  exports.LogBook = LogBook;
  exports.cluster_choices = cluster_choices;
  exports.selected_book = selected_book;
  // exports.selected_book_id = selected_book_id;
  exports.db_options = db_options;

}).call(this);