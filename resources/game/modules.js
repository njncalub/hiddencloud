goog.provide('hiddencloud.Modules');
goog.require('hiddencloud.Functions');

// goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');

hiddencloud.Modules.startMovingBallModule = function (screen_size, director) {
  // starts the peripheral vision training module

  var movingBallScene = new lime.Scene();
  var movingBallLayer = new lime.Layer().setPosition(0, 0)
    .setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
  var movingBallBackground = new lime.Sprite().setSize(screen_size[0], screen_size[1]).setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var moveBallButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 15).setText('Move').setColor('#B0171F');
  var red_ball = new lime.Circle().setSize(20,20).setFill('#B0171F').setPosition(50, 100);

  goog.events.listen(moveBallButton, ['mousedown', 'touchstart'], function(e) {
    hiddencloud.Functions.moveCircle(screen_size, red_ball);
  });

  movingBallLayer.appendChild(movingBallBackground);
  movingBallLayer.appendChild(moveBallButton);
  movingBallLayer.appendChild(red_ball);
  movingBallScene.appendChild(movingBallLayer);

  director.replaceScene(movingBallScene);
}