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
  var gameObj = {
    title: 'The Hidden Cloud Academy',
    version: 'v0.01',
    width: 320*2,
    height: 240*2,
    renderer: lime.Renderer.CANVAS
  };

  hiddencloud.director = new lime.Director(document.getElementById("gamecanvas"), gameObj.width, gameObj.height);
  hiddencloud.director.makeMobileWebAppCapable();
  hiddencloud.director.setDisplayFPS(false);

  hiddencloud.Modules.startGame(gameObj);
}

goog.exportSymbol('hiddencloud.start', hiddencloud.start);