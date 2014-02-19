goog.provide('hiddencloud.Functions');

goog.require('lime.GlossyButton');
goog.require('lime.Circle');

hiddencloud.Functions.load_all_books = function(gameObj) {
  console.log("called load_all_books() function.");

  Book.sync_all();
  Book.sync();
  all_books = Book.all();
  all_books.forEach(function(book) {
    console.log(book);
  });

  return all_books;
}

hiddencloud.Functions.moveCircle = function(gameObj, the_circle) {
  var pos_x = Math.floor((Math.random()*gameObj.width)+1);
  var pos_y = Math.floor((Math.random()*gameObj.height)+1);

  var move = new lime.animation.MoveTo(pos_x, pos_y).setDuration(0);
  the_circle.runAction(move);
}

hiddencloud.Functions.decreaseTime = function(current_time, counter) {
  current_time -= 1;
  counter.setText(current_time);
  console.log(current_time);
  return current_time;
}

hiddencloud.Functions.getRandomGenres = function(gameObj, current_game, genres, btn_genre1, btn_genre2, btn_genre3) {
  genres = [];
  var book_genre_uri = "http://hiddencloud.pythonanywhere.com/api/v1/book_genre/?format=json&" + hca_functions.auth_key;

  hca_functions.jax(book_genre_uri, 'GET').done(function (data) {
    var book_genres = [];
    for (var i = 0; i < data.objects.length; i++) {
      book_genres.push(data.objects[i]);
    }
    for (var i = 0; i < 3; i++) {
      var rand = hca_functions.getRandomArbitary(0, book_genres.length-1);
      var roll = book_genres.splice(rand, 1)[0]
      genres.push(roll);
    }
    console.log( genres );

    btn_genre1.setText(genres[0].genre);
    btn_genre2.setText(genres[1].genre);
    btn_genre3.setText(genres[2].genre);

    var book_text = {};
    var book_text_question = {};

    goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[0]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[0], current_game.difficulty, book_text, book_text_question);
    });
    goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[1]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[1], current_game.difficulty, book_text, book_text_question);
    });
    goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[2]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[2], current_game.difficulty, book_text, book_text_question);
    });

    return genres;
  });
}

hiddencloud.Functions.getRandomBookTextAndQuestion = function(gameObj, current_game, selected_genre, difficulty, book_text, book_text_question) {
  var book_text_questions = [];
  var book_text_question_uri = "http://hiddencloud.pythonanywhere.com/api/v1/book_text_question/?format=json&" + hca_functions.auth_key;

  var ea_wpm = 150;
  var me_wpm = 200;
  var ha_wpm = 250;
  var ex_wpm = 300;
  var tw_gte = 0;
  var tw_lte = 0;
  var s_difficulty = "";

  console.log("current difficulty:");
  console.log(difficulty);
  console.log("selected genre:");
  console.log(selected_genre);

  if ((difficulty >= 1) && (difficulty <=3)) {
    tw_gte = 0;
    tw_lte = ea_wpm;
    s_difficulty = "EA";
  }
  if ((difficulty >= 4) && (difficulty <=6)) {
    tw_gte = ea_wpm;
    tw_lte = me_wpm;
    s_difficulty = "ME";
  }
  if ((difficulty >= 7) && (difficulty <=9)) {
    tw_gte = me_wpm;
    tw_lte = ha_wpm;
    s_difficulty = "HA";
  }
  if ((difficulty >= 10) && (difficulty <=12)) {
    tw_gte = ha_wpm;
    tw_lte = ex_wpm;
    s_difficulty = "EX";
  }

  book_text_question_uri = book_text_question_uri + "&from_book_text__from_book__genre__slug=" + selected_genre.slug;
  book_text_question_uri = book_text_question_uri + "&limit=" + 0;
  // book_text_question_uri = book_text_question_uri + "&from_book_text__otal_words__gte=" + tw_gte;
  // book_text_question_uri = book_text_question_uri + "&from_book_text__total_words__lte=" + tw_lte;

  console.log("chosen uri:");
  console.log(book_text_question_uri);

  hca_functions.jax(book_text_question_uri, 'GET').done(function (data) {
    console.log("went here");
    // get random text question
    var total = data.objects.length;
    var chosen_book_text_and_question = {};
    // get 1
    var chosen_text_id = Math.floor(hca_functions.getRandomArbitary(0, total-1))+1;
    console.log("chosen_text_id: " + chosen_text_id);
    chosen_book_text_and_question = data.objects[chosen_text_id];

    console.log(chosen_book_text_and_question);
    hiddencloud.Modules.ReadAndAnswer(gameObj, current_game, chosen_book_text_and_question);

    // btn_genre1.setText(genres[0].genre);
    // btn_genre2.setText(genres[1].genre);
    // btn_genre3.setText(genres[2].genre);

    // goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[0]);
    // });
    // goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[1]);
    // });
    // goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[2]);
    // });

    return chosen_book_text_and_question;
  });
}

hiddencloud.Functions.defineWord = function(gameObj, word) {
  var definitions;
  var search_uri = "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=" + gameObj.auth.wordnik;

  $.ajax({
    async: false,
    dataType: "json",
    url: search_uri,
    success: function(data) {definitions = data}
  });
  return definitions;
}

// hiddencloud.Functions.