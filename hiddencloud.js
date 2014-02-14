goog.provide('hiddencloud');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.Circle');
goog.require('lime.Label');

goog.require('hiddencloud.Models');
goog.require('hiddencloud.Functions');
goog.require('hiddencloud.Modules');

hiddencloud.start = function() {
  var gameWidth = 320*2;
  var gameHeight = 240*2;
  var gamePanelWidth = gameWidth/5;

  var gameObj = {
    title: 'The Hidden Cloud Academy',
    version: 'v0.01',
    width: gameWidth,
    height: gameHeight,
    renderer: lime.Renderer.CANVAS,
    auth: {
      wordnik: '35e825cad76c600c5400405d8040951aa7826040da01ae6b3',
    },
    ui: {
      sidePanelWidth: gamePanelWidth,
      sidePanelButtonWidth: gamePanelWidth-20,
      sidePanelButtonHeight: 20,
      sidePanelButtonPosition: gamePanelWidth/2,
    },
  };

  hiddencloud.director = new lime.Director(document.getElementById("gamecanvas"), gameObj.width, gameObj.height);
  hiddencloud.director.makeMobileWebAppCapable();
  hiddencloud.director.setDisplayFPS(false);

  // hiddencloud.Modules.startGameSample(gameObj);
  hiddencloud.Modules.startGame(gameObj);
}

goog.exportSymbol('hiddencloud.start', hiddencloud.start);