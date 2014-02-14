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