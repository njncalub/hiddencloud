goog.provide('hiddencloud');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.Circle');

goog.require('hiddencloud.Models');
goog.require('hiddencloud.Functions');
goog.require('hiddencloud.Modules');

hiddencloud.start = function() {
  // set screen resolution:
  var game_width = 640; //default=320
  var game_height = 480; //default=240
  var screen_size = [game_width, game_height];

  //var director = new lime.Director(document.body, game_width, game_height);
  var director = new lime.Director(document.getElementById("gamecanvas"), game_width, game_height);
      director.makeMobileWebAppCapable();
      director.setDisplayFPS(false);

  var startScene = new lime.Scene();
  var startLayer = new lime.Layer().setPosition(0, 0)
    .setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
  var startBackground = new lime.Sprite().setSize(game_width, game_height).setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var startButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 15).setText('Start').setColor('#B0171F');

  // var red_circle = new lime.Circle().setSize(20,20).setFill('#B0171F').setPosition(50, 100);

  goog.events.listen(startButton, ['mousedown', 'touchstart'], function(e) {
    // var player = new hiddencloud.Models.Player(); // create player

    // Player.create({
    //   "last_name":player.last_name,
    //   "first_name":player.first_name,
    //   "middle_name":player.middle_name,
    //   "email_address":player.email_address,
    //   "gender":player.gender,
    //   "cluster":player.cluster,
    //   "department":player.department,
    //   "birth_date":player.birth_date
    // });

    // all_books = Book.all();
    // hiddencloud.Functions.load_all_books(screen_size, startLayer, all_books);

    // hiddencloud.Functions.moveCircle(screen_size, red_circle);

    hiddencloud.Modules.startMovingBallModule(screen_size, director);
  });

  startLayer.appendChild(startBackground);
  startLayer.appendChild(startButton);
  // startLayer.appendChild(red_circle);
  startScene.appendChild(startLayer);

  director.replaceScene(startScene);
}

goog.exportSymbol('hiddencloud.start', hiddencloud.start);