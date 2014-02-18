goog.provide('hiddencloud.Modules');

goog.require('hiddencloud.Functions');
goog.require('hiddencloud.Button');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Button');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.ui.Scroller');

hiddencloud.Modules.startGame = function(gameObj) {
  var layerStartMenu = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var sceneStartMenu = new lime.Scene().setRenderer(gameObj.renderer);
  var startMenuBackground = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setFill('resources/images/start_bg.png').setPosition(0, 0).setAnchorPoint(0, 0);
  var hca_logo = new lime.Sprite().setSize(409.5, 132)
    .setPosition(gameObj.width/2, (gameObj.height/2)-100).setFill('resources/images/hca_logo.png');

  var lblGameTitle = new lime.Label().setText(gameObj.title).setFontFamily('Arial')
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(30)
    .setPosition(gameObj.width/2, (gameObj.height/2)-100);

  var startGameButton = new hiddencloud.Button().setText('START')
    .setColor('#B0171F').setSize(gameObj.width/2.5, 50).setPosition(gameObj.width/2, (gameObj.height/2)+75)
    .setAnchorPoint(0,0);

  var lbl_followme = new lime.Label().setText("@njncalub").setFontFamily('Arial')
    .setSize(gameObj.width, gameObj.height/10).setFontSize(11).setFontColor("#eff")
    .setPosition(gameObj.width/2, gameObj.height-50)

  layerStartMenu.appendChild(startMenuBackground);
  layerStartMenu.appendChild(hca_logo);
  layerStartMenu.appendChild(lbl_followme);
  layerStartMenu.appendChild(startGameButton);
  sceneStartMenu.appendChild(layerStartMenu);

  hiddencloud.director.replaceScene(sceneStartMenu);

  goog.events.listen(startGameButton, ['mousedown', 'touchstart'], function(e) {
    // check if the player has a profile
    if(hca_functions.has_user_profile()) {
      gameObj.player.profile = window.current_player;
      console.log("has");
    }
    else {
      console.log("has not");
      // set up profile
      window.edit_profile();
    }


    // hiddencloud.Modules.SpeedReadingBenchmark(gameObj);

  });
}

hiddencloud.Modules.SpeedReadingBenchmark = function(gameObj) {
  // load from question bank
  // get text and questions
  // introduction from characters about the academy


}

hiddencloud.Modules.startGameSample = function(gameObj) {
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

  goog.events.listen(startComprehensionModuleButton, ['mousedown', 'touchstart'], function(e) {
    hiddencloud.Modules.startComprehensionTrainingModuleSample(gameObj);
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
  var decreaseSpeedOfTextButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 40)
    .setText('-').setColor('#B0171F');
  var pauseMoveTextButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 70)
    .setText('Pause').setColor('#B0171F');
  var increaseSpeedOfTextButton = new lime.GlossyButton().setSize(70, 20).setPosition(40, 100)
    .setText('+').setColor('#B0171F');

  var lblCurrentDT = new lime.Label().setText("Current DT Here").setFontFamily('Arial')
    .setFontColor('#000').setSize(gameObj.width, gameObj.height/10).setFontSize(10)
    .setPosition(gameObj.width/2, 30);
  var lblMovingText = new lime.Label().setText("Text Title Here").setFontFamily('Arial')
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(20)
    .setPosition(gameObj.width/2, 100);

  var scrollbar = new lime.ui.Scroller().setFill('#ccc').setAnchorPoint(0, 0.5).setSize(400, 130);

  var all_books = hiddencloud.Functions.load_all_books();
  var sample_book = all_books[0];
  var sample_book_text = sample_book.book_content.split(" ");

  // declare functions and variables
  var displayTextFunction, decreaseSpeedFunction, increaseSpeedFunction;
  var paused = false;

  lblMovingText.setText(sample_book.book_title);
  var dt = 500;
  lime.scheduleManager.scheduleWithDelay(displayTextFunction = function() {
    // lblMovingText.setText("" + Math.random());
    if(sample_book_text)
      lblMovingText.setText( sample_book_text.shift() );
  }, lblMovingText, dt);

  lblCurrentDT.setText(dt);

  layerMovingText.appendChild(movingTextBackground);
  layerMovingText.appendChild(lblCurrentDT);
  layerMovingText.appendChild(lblMovingText);
  // layerMovingText.appendChild(scrollbar);
  layerMovingText.appendChild(exitMoveTextButton);
  layerMovingText.appendChild(decreaseSpeedOfTextButton);
  layerMovingText.appendChild(pauseMoveTextButton);
  layerMovingText.appendChild(increaseSpeedOfTextButton);
  sceneMovingText.appendChild(layerMovingText);

  hiddencloud.director.replaceScene(sceneMovingText);

  goog.events.listen(exitMoveTextButton, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed back button");
    hiddencloud.Modules.startGame(gameObj);
    // hiddencloud.Functions.load_all_books();
  });

  goog.events.listen(pauseMoveTextButton, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed pause button");
    if (paused) {
      lime.scheduleManager.scheduleWithDelay(displayTextFunction, lblMovingText, dt);
      pauseMoveTextButton.setText("Pause");
      paused = false;
    }
    else {
      lime.scheduleManager.unschedule(displayTextFunction, lblMovingText);
      pauseMoveTextButton.setText("Play");
      paused = true;
    }
  });

  goog.events.listen(decreaseSpeedOfTextButton, ['mousedown', 'touchstart'], decreaseSpeedFunction = function(e) {
    if (dt >= 0) {
      dt += 100;
      lblCurrentDT.setText(dt);
      console.log("decreased speed to " + dt);
      lime.scheduleManager.unschedule(displayTextFunction, lblMovingText);
      lime.scheduleManager.scheduleWithDelay(displayTextFunction, lblMovingText, dt);
    }
  });

  goog.events.listen(increaseSpeedOfTextButton, ['mousedown', 'touchstart'], increaseSpeedFunction = function(e) {
    if (dt >= 0) {
      dt -= 100;
      lblCurrentDT.setText(dt);
      console.log("increased speed to " + dt);
      lime.scheduleManager.unschedule(displayTextFunction, lblMovingText);
      lime.scheduleManager.scheduleWithDelay(displayTextFunction, lblMovingText, dt);
    }
  });
}

hiddencloud.Modules.startComprehensionTrainingModuleSample = function(gameObj) {
  // starts the reading comprehension training module

  var readingComprehensionScene = new lime.Scene();

  var backgroundLayer = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var background = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var leftPanelLayer = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var leftPanelBG = new lime.Sprite().setSize(gameObj.ui.sidePanelWidth, gameObj.height)
    .setFill('#333333').setPosition(0, 0).setAnchorPoint(0, 0);
  var exitModuleButton = new lime.GlossyButton().setSize(gameObj.ui.sidePanelButtonWidth, gameObj.ui.sidePanelButtonHeight).setPosition(gameObj.ui.sidePanelButtonPosition, 20)
    .setText('Back').setColor('#B0171F');
  var trySearchButton1 = new lime.GlossyButton().setSize(gameObj.ui.sidePanelButtonWidth, gameObj.ui.sidePanelButtonHeight).setPosition(gameObj.ui.sidePanelButtonPosition, 50)
    .setText('Search').setColor('#B0171F');
  var trySearchButton2 = new lime.GlossyButton().setSize(gameObj.ui.sidePanelButtonWidth, gameObj.ui.sidePanelButtonHeight).setPosition(gameObj.ui.sidePanelButtonPosition, 80)
    .setText('Define').setColor('#B0171F');

  var sampleTextLabel = new lime.Label().setText("Text Here").setFontFamily('Arial')
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(20)
    .setPosition(gameObj.width/2, 100);

  backgroundLayer.appendChild(background);
  backgroundLayer.appendChild(sampleTextLabel);
  leftPanelLayer.appendChild(leftPanelBG);
  leftPanelLayer.appendChild(exitModuleButton);
  leftPanelLayer.appendChild(trySearchButton1);
  leftPanelLayer.appendChild(trySearchButton2);
  readingComprehensionScene.appendChild(backgroundLayer);
  readingComprehensionScene.appendChild(leftPanelLayer);

  leftPanelLayer.setHidden(true);

  hiddencloud.director.replaceScene(readingComprehensionScene);

  var sample_word = "comprehend";
  var sample_definition = [];

  goog.events.listen(background, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed background");
    if(leftPanelLayer.getHidden()) {
      leftPanelLayer.setHidden(false);
    }
    else {
      leftPanelLayer.setHidden(true);
    }
  });

  goog.events.listen(exitModuleButton, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed back button");
    hiddencloud.Modules.startGame(gameObj);
    // leftPanelLayer.setHidden(true);
    // console.log("should be hidden");
  });

  goog.events.listen(trySearchButton1, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed trySearchButton1 button");
    // hiddencloud.Modules.startGame(gameObj);

    sample_word = "comprehend";
    sample_definition = hiddencloud.Functions.defineWord(gameObj, sample_word);
    // console.log(sample_definition);
    sampleTextLabel.setText(sample_word);
  });

  goog.events.listen(trySearchButton2, ['mousedown', 'touchstart'], function(e) {
    console.log("pressed trySearchButton2 button2");
    // hiddencloud.Modules.startGame(gameObj);

    var len = sample_definition.length;

    console.log("found " + len + " definition(s):");
    for (i = 0; i < len; i++) {
      var definition = sample_definition[i].text;
      console.log(definition);

      var definition = new lime.Label().setText(definition).setFontFamily('Arial')
          .setFontColor('#000').setSize(gameObj.width, gameObj.height/10).setFontSize(10)
          .setPosition(gameObj.width/2, 150+(i*30));

      backgroundLayer.appendChild(definition);
    }
  });
}