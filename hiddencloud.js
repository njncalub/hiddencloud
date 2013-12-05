goog.provide('hiddencloud');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');

goog.require('hiddencloud.Models');

hiddencloud.start = function() {
  // set screen resolution:
  var game_width = 640; //default=1024
  var game_height = 480; //default=768

  var director = new lime.Director(document.body, game_width, game_height);
      director.makeMobileWebAppCapable();
      director.setDisplayFPS(false);

  var startScene = new lime.Scene();
  var startLayer = new lime.Layer().setPosition(0, 0)
    .setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
  var startBackground = new lime.Sprite().setSize(game_width, game_height).setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var startButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 10).setText('Start').setColor('#B0171F');

  goog.events.listen(startButton, ['mousedown', 'touchstart'], function(e) {
    var player = new hiddencloud.Models.Player();
  });

  startLayer.appendChild(startBackground);
  startLayer.appendChild(startButton);
  startScene.appendChild(startLayer);

  director.replaceScene(startScene);
}

goog.exportSymbol('hiddencloud.start', hiddencloud.start);