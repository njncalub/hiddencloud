goog.provide('hiddencloud.UI');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');

hiddencloud.UI.LeftSidePanel = function(gameObj) {
  var leftPanelLayer = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var leftPanelBG = new lime.Sprite().setSize(gameObj.ui.sidePanelWidth, gameObj.height)
    .setFill('#333333').setPosition(0, 0).setAnchorPoint(0, 0);

  
}