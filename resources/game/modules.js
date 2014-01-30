goog.provide('hiddencloud.Modules');

goog.require('hiddencloud.Functions');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');

hiddencloud.Modules.startGame = function(gameObj) {
  var layerStartMenu = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var sceneStartMenu = new lime.Scene().setRenderer(gameObj.renderer);
  var startMenuBackground = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var lblGameTitle = new lime.Label().setText(gameObj.title).setFontFamily('Arial')
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(20)
    .setPosition(gameObj.width/2, 100);
  var lblGameVersion = new lime.Label().setText(gameObj.version).setFontFamily('Arial')
    .setFontColor('#000').setSize(gameObj.width, gameObj.height/10)
    .setPosition(gameObj.width/2, 120);

  var startMovingBallModuleButton = new lime.GlossyButton().setText('Start Moving Ball Sample')
    .setColor('#B0171F').setSize(gameObj.width/2.5, 30).setPosition(gameObj.width/2, (gameObj.height/3)+20)
    .setAnchorPoint(0,0);
  var startMovingTextModuleButton = new lime.GlossyButton().setText('Start Moving Text Sample')
    .setColor('#B0171F').setSize(gameObj.width/2.5, 30).setPosition(gameObj.width/2, (gameObj.height/3)+60)
    .setAnchorPoint(0,0);
  var startComprehensionModuleButton = new lime.GlossyButton().setText('Start Comprehension Sample')
    .setColor('#B0171F').setSize(gameObj.width/2.5, 30).setPosition(gameObj.width/2, (gameObj.height/3)+100)
    .setAnchorPoint(0,0);

  layerStartMenu.appendChild(startMenuBackground);
  layerStartMenu.appendChild(lblGameTitle);
  layerStartMenu.appendChild(lblGameVersion);
  layerStartMenu.appendChild(startMovingBallModuleButton);
  layerStartMenu.appendChild(startMovingTextModuleButton);
  layerStartMenu.appendChild(startComprehensionModuleButton);
  sceneStartMenu.appendChild(layerStartMenu);

  hiddencloud.director.replaceScene(sceneStartMenu);

  goog.events.listen(startMovingBallModuleButton, ['mousedown', 'touchstart'], function(e) {
    hiddencloud.Modules.startMovingBallModuleSample(gameObj);
  });

  goog.events.listen(startMovingTextModuleButton, ['mousedown', 'touchstart'], function(e) {
    hiddencloud.Modules.startMovingTextModuleSample(gameObj);
  });
}

hiddencloud.Modules.startMovingBallModuleSample = function(gameObj) {
  // starts the peripheral vision training module

  var sceneMovingBall = new lime.Scene();
  var layerMovingBall = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var movingBallBackground = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var exitMoveBallButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 15)
    .setText('Back').setColor('#B0171F');
  var red_ball = new lime.Circle().setSize(20,20).setFill('#B0171F').setPosition(50, 100);

  var dt = 500;
  lime.scheduleManager.scheduleWithDelay(function() {
    hiddencloud.Functions.moveCircle(gameObj, red_ball);
  }, red_ball, dt);

  layerMovingBall.appendChild(movingBallBackground);
  layerMovingBall.appendChild(red_ball);
  layerMovingBall.appendChild(exitMoveBallButton);
  sceneMovingBall.appendChild(layerMovingBall);

  hiddencloud.director.replaceScene(sceneMovingBall);

  goog.events.listen(exitMoveBallButton, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed back button");
    hiddencloud.Modules.startGame(gameObj);
  });
}

hiddencloud.Modules.startMovingTextModuleSample = function(gameObj) {
  // starts the peripheral vision training module

  var sceneMovingText = new lime.Scene();
  var layerMovingText = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var movingTextBackground = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var exitMoveTextButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 15)
    .setText('Back').setColor('#B0171F');
  var lblMovingText = new lime.Label().setText("Trial").setFontFamily('Arial')
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(20)
    .setPosition(gameObj.width/2, 100);;

  var all_books = hiddencloud.Functions.load_all_books();
  var sample_book = all_books[0];

  var dt = 500;
  lime.scheduleManager.scheduleWithDelay(function() {
    lblMovingText.setText("" + Math.random());
  }, lblMovingText, dt);

  layerMovingText.appendChild(movingTextBackground);
  layerMovingText.appendChild(lblMovingText);
  layerMovingText.appendChild(exitMoveTextButton);
  sceneMovingText.appendChild(layerMovingText);

  hiddencloud.director.replaceScene(sceneMovingText);

  goog.events.listen(exitMoveTextButton, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed back button");
    hiddencloud.Modules.startGame(gameObj);
    // hiddencloud.Functions.load_all_books();
  });
}