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

hiddencloud.Functions.getRandomGenres = function(gameObj, genres, btn_genre1, btn_genre2, btn_genre3) {
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

    goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[0]);
    });
    goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[1]);
    });
    goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
      console.log(genres[2]);
    });

    return genres;
  });
}

hiddencloud.Functions.defineWord = function(gameObj, word) {
  var definitions;
  var search_uri = "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=" + gameObj.auth.wordnik;

  $.ajax({
    async: false,
    dataType: "json",
    url: search_uri,
    success: function(data) {definitions = data},
  });
  return definitions;
}

// hiddencloud.Functions.