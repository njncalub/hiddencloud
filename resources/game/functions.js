goog.provide('hiddencloud.Functions');
goog.require('lime.GlossyButton');
goog.require('lime.Circle');

hiddencloud.Functions.load_all_books = function(screen_size, startLayer, all_books) {
  console.log("called load_all_books() function.");

  // all_books = Book.all();
  all_books.forEach(function(book) {
    console.log(book);
  });

  console.log(screen_size[0]);
  console.log(screen_size[1]);

  var pos_x = Math.floor((Math.random()*screen_size[0])+1);
  var pos_y = Math.floor((Math.random()*screen_size[1])+1);

  var red_circle = new lime.Circle().setSize(40,40).setFill('#B0171F').setPosition(pos_x, pos_y);

  var bookButton = new lime.GlossyButton().setSize(70, 20).setPosition(pos_x, pos_y).setText(pos_x + ", " + pos_y);

  // startLayer.appendChild(bookButton);
  startLayer.appendChild(red_circle);

  lime.scheduleManager.schedule(function(dt){

  });
}

hiddencloud.Functions.start_moveCircle = function(screen_size) {
  

  director.replaceScene(moveCircleScene);
}

hiddencloud.Functions.moveCircle = function(screen_size, the_circle) {
  var pos_x = Math.floor((Math.random()*screen_size[0])+1);
  var pos_y = Math.floor((Math.random()*screen_size[1])+1);

  var move = new lime.animation.MoveTo(pos_x, pos_y).setDuration(0);
  the_circle.runAction(move);
}

// hiddencloud.Functions.