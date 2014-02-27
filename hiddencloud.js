goog.provide('hiddencloud');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
// goog.require('lime.GlossyButton');
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
    renderer: lime.Renderer.DOM,
    auth: {
      wordnik: '35e825cad76c600c5400405d8040951aa7826040da01ae6b3',
      hc_server_u: 'test',
      hc_server_k: '123456'
    },
    ui: {
      sidePanelWidth: gamePanelWidth,
      sidePanelButtonWidth: gamePanelWidth-20,
      sidePanelButtonHeight: 20,
      sidePanelButtonPosition: gamePanelWidth/2,
      font_family: "Open Sans"
    },
    player: {
      coins: 0,
      hi_score: 0,
      hi_wpm: 0,
      hi_cp: 0,
      total_words: 0,
      total_correct: 0,
      total_wrong: 0
    },
    pprofile: {},
    perks: {
      coin_bonus: 0,
      time_bonus: 0,
      score_bonus: 0
    },
    badges: {},
    reports: {}
  };

  gameObj.ui.bgm_01_au = new lime.audio.Audio("resources/audio/bgm/bgm_01.mp3");
  gameObj.ui.click_button_au = new lime.audio.Audio("resources/audio/ui/click.wav");
  gameObj.ui.select_category_au = new lime.audio.Audio("resources/audio/ui/select.wav");
  gameObj.ui.correct_au = new lime.audio.Audio("resources/audio/ui/correct.wav");
  gameObj.ui.wrong_au = new lime.audio.Audio("resources/audio/ui/wrong.wav");

  gameObj.player.coins = 100;

  // console.log(gameObj.player.profile);
  // console.log(gameObj.player.profile.coins);

  hiddencloud.director = new lime.Director(document.getElementById("gamecanvas"), gameObj.width, gameObj.height);
  hiddencloud.director.makeMobileWebAppCapable();
  hiddencloud.director.setDisplayFPS(false);

  // hiddencloud.Modules.startGameSample(gameObj);
  hiddencloud.Modules.startGame(gameObj);
}


hiddencloud.pause = function() {
  hiddencloud.director.setPaused(true);
}

hiddencloud.resume = function(){
  hiddencloud.director.setPaused(false);
}

goog.exportSymbol('hiddencloud.start', hiddencloud.start);
goog.exportSymbol('hiddencloud.pause', hiddencloud.pause);
goog.exportSymbol('hiddencloud.resume', hiddencloud.resume);