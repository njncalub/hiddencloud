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

// hiddencloud.Functions.