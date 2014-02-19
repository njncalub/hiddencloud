goog.provide('hiddencloud.Modules');

goog.require('hiddencloud.Functions');
goog.require('hiddencloud.Button');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Button');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.ui.Scroller');
goog.require('lime.audio.Audio');

hiddencloud.Modules.startGame = function(gameObj) {
  gameObj.ui.bgm_01_au.play();

  var layerStartMenu = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var sceneStartMenu = new lime.Scene().setRenderer(gameObj.renderer);
  var startMenuBackground = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setFill('resources/images/start_bg.png').setPosition(0, 0).setAnchorPoint(0, 0);
  var hca_logo = new lime.Sprite().setSize(409.5, 132)
    .setPosition(gameObj.width/2, (gameObj.height/2)-100).setFill('resources/images/hca_logo.png');

  var lblGameTitle = new lime.Label().setText(gameObj.title).setFontFamily(gameObj.ui.font_family)
    .setFontColor('#000').setFontWeight('bold').setSize(gameObj.width, gameObj.height/10).setFontSize(30)
    .setPosition(gameObj.width/2, (gameObj.height/2)-100);

  var startGameButton = new hiddencloud.Button().setText('START')
    .setColor('#B0171F').setSize(gameObj.width/2.5, 50).setPosition(gameObj.width/2, (gameObj.height/2)+75)
    .setAnchorPoint(0,0);

  var lbl_followme = new lime.Label().setText("@njncalub").setFontFamily(gameObj.ui.font_family)
    .setSize(gameObj.width, gameObj.height/10).setFontSize(11).setFontColor("#eff")
    .setPosition(gameObj.width/2, gameObj.height-50)

  layerStartMenu.appendChild(startMenuBackground);
  layerStartMenu.appendChild(hca_logo);
  layerStartMenu.appendChild(lbl_followme);
  layerStartMenu.appendChild(startGameButton);
  sceneStartMenu.appendChild(layerStartMenu);

  hiddencloud.director.replaceScene(sceneStartMenu);

  goog.events.listen(startGameButton, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
    // check if the player has a profile
    if(hca_functions.has_user_profile()) {
      gameObj.player.profile = window.current_player;
      console.log("going to menu selection");
      hiddencloud.Modules.MenuSelection(gameObj);
    }
    else {
      console.log("please edit your profile first");
      // set up profile
      hca_functions.sync_model("all");
      window.edit_profile();
    }

    // hiddencloud.Modules.SpeedReadingBenchmark(gameObj);

  });

  goog.events.listen(gameObj.ui.bgm_01_au, "ended", function() {
    this.play();
  });
}

hiddencloud.Modules.MenuSelection = function(gameObj) {
  var layer_menu = new lime.Layer().setPosition(0, 0).setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_menu_bg = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setFill('resources/images/start_bg.png').setPosition(0, 0).setAnchorPoint(0, 0);
  var hca_logo = new lime.Sprite().setSize(409.5, 132)
    .setPosition(gameObj.width/2, (gameObj.height/2)-100).setFill('resources/images/hca_logo.png');
  var label_hi_score = new lime.Label().setText("HIGH SCORE: " + gameObj.player.hi_score).setAnchorPoint(0, 0)
    .setPosition(20, 20).setFontSize(13);
  var label_hi_wpm = new lime.Label().setText("READING SPEED: " + gameObj.player.hi_wpm).setAnchorPoint(0, 0)
    .setPosition(20, 35).setFontSize(13);
  var label_hi_cp = new lime.Label().setText("COMPREHENSION: " + gameObj.player.hi_cp).setAnchorPoint(0, 0)
    .setPosition(20, 50).setFontSize(13);
  var label_coins = new lime.Label().setText("COIN(S): " + gameObj.player.coins).setAnchorPoint(0, 0)
    .setPosition(gameObj.width-100, 20).setFontSize(13);

  var scene_menu = new lime.Scene().setRenderer(gameObj.renderer);

  var btn_width_ratio = gameObj.width/2;
  var btn_starting = (gameObj.height/2)+10;
  var btn_height = 35;
  var btn_padding = 3;

  var scroll_menu = new lime.ui.Scroller().setAnchorPoint(0, 0).setSize(400, 130);

  var btn_play = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText("START QUIZ").setFontSize(16);
  var btn_shop = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*2))
    .setText("SPEND COINS").setFontSize(16);
  var btn_train = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*3))
    .setText("TRAINING").setFontSize(16);
  var btn_tutorial = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*4))
    .setText("TUTORIAL").setFontSize(16);

  layer_menu.appendChild(layer_menu_bg);
  layer_menu.appendChild(hca_logo);
  // layer_menu.appendChild(label_hi_score);
  // layer_menu.appendChild(label_hi_wpm);
  // layer_menu.appendChild(label_hi_cp);
  layer_menu.appendChild(label_coins);
  layer_menu.appendChild(scroll_menu);
  layer_menu.appendChild(btn_play);
  layer_menu.appendChild(btn_shop);
  layer_menu.appendChild(btn_tutorial);
  layer_menu.appendChild(btn_train);
  scene_menu.appendChild(layer_menu);

  // var menu_scroller = new lime.ui.Scroller().setFill('#ccc').setAnchorPoint(0, 0.5).setSize(400, 130);
  // layer_menu.appendChild(scroll);

  hiddencloud.director.replaceScene(scene_menu);

  goog.events.listen(btn_play, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
    hiddencloud.Modules.StartQuiz(gameObj);
  });
  goog.events.listen(btn_shop, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
  });
  goog.events.listen(btn_tutorial, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
  });
  goog.events.listen(btn_train, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
  });

}

hiddencloud.Modules.StartTutorial = function(gameObj) {

  var scene_start_tutorial = new lime.Scene();
  var layer_start_tutorial = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_start_tutorial = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);  

  layer_start_tutorial.appendChild(bg_start_tutorial);
  scene_start_tutorial.appendChild(layer_start_tutorial);

  hiddencloud.director.replaceScene(scene_start_tutorial);
}

hiddencloud.Modules.StartQuiz = function(gameObj) {
  // initialize data:
  var coins_per_game = 5;
  var time_per_game = 10;

  var current_game = {};

  current_game.difficulty = 1;
  current_game.total_words = 0;
  current_game.total_items = 0;
  current_game.total_correct = 0;
  current_game.total_score = 0;
  current_game.total_time_elapsed = 0;
  current_game.time = time_per_game + gameObj.perks.time_bonus;

  var scene_start_quiz = new lime.Scene();
  var layer_start_quiz = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_start_layer = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);  
  var time_counter = new lime.Label().setText(current_game.time).setPosition(gameObj.width/2, 40);

  layer_start_quiz.appendChild(bg_start_layer);
  layer_start_quiz.appendChild(time_counter);
  scene_start_quiz.appendChild(layer_start_quiz);

  hiddencloud.director.replaceScene(scene_start_quiz);

  gameObj.player.coins -= (coins_per_game - gameObj.perks.coin_bonus);
  console.log("coins left: " + gameObj.player.coins);

  // load random genres
  // add scroller:
  // var genre_scroll = new lime.ui.Scroller()
  //   .setFill(new lime.fill.LinearGradient().addColorStop(0, 100, 100, 100, .4).addColorStop(1, 0, 0, 0, .0))
  //   .setSize(gameObj.width/2, gameObj.height/5).setPosition(gameObj.width/2, gameObj.height/2)
  //   // .setAnchorPoint(gameObj.width/4, gameObj.height/4)
  //   .setDirection(lime.ui.Scroller.Direction.HORIZONTAL);
  // var size = 100;
  // var padding = 25;
  // var btn_genre1 = new lime.Sprite().setSize(100, 200)
  //   .setFill("#8c0000").setPosition((size+padding)*0, 0).setAnchorPoint(0, 0);
  // var btn_genre2 = new lime.Sprite().setSize(100, 200)
  //   .setFill("#8c0000").setPosition((size+padding)*1, 0).setAnchorPoint(0, 0);
  // var btn_genre3 = new lime.Sprite().setSize(100, 200)
  //   .setFill("#8c0000").setPosition((size+padding)*2, 0).setAnchorPoint(0, 0);
  // genre_scroll.appendChild(btn_genre1);
  // genre_scroll.appendChild(btn_genre2);
  // genre_scroll.appendChild(btn_genre3);
  // layer_start_quiz.appendChild(genre_scroll);

  // user chooses a genre
  // load random books from genre, difficulty

  var f, dt = 1000;
  lime.scheduleManager.scheduleWithDelay(f=function() {
    if (current_game.time > 0) {
      current_game.time = hiddencloud.Functions.decreaseTime(current_game.time, time_counter);
    }
    else {
      alert("Time is up!");
      lime.scheduleManager.unschedule(f, this); 
    }
  }, current_game.time, dt);

  var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game.time, f, current_game);
}

hiddencloud.Modules.ChooseGenre = function(gameObj, time, f, current_game) {
  lime.scheduleManager.unschedule(f, time);

  var scene_choose_genre = new lime.Scene();
  var layer_choose_genre = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_genres = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_header = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_difficulty = new lime.Layer().setPosition(0, gameObj.height-70)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_choose_genre = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setFill('resources/images/paper_bg.jpg').setPosition(0, 0).setAnchorPoint(0, 0);  
  var bg_header = new lime.Sprite().setSize(gameObj.width, 60).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, 0);

  var lbl_words_read = new lime.Label().setSize(gameObj.width/3, 60)
    .setPosition(0, 20).setAnchorPoint(0, 0)
    .setText("WORDS READ: " + current_game.total_words).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family);

  var lbl_time_left = new lime.Label().setSize(gameObj.width/3, 60)
    .setPosition(gameObj.width/3, 20).setAnchorPoint(0, 0)
    .setText("TIME LEFT: " + current_game.time).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family);

  var lbl_total_score = new lime.Label().setSize(gameObj.width/3, 60)
    .setPosition((gameObj.width*2)/3, 20).setAnchorPoint(0, 0)
    .setText("TOTAL SCORE: " + current_game.total_score).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family);

  var genres = ["1", "2", "3"];
  // display book genres
  var lbl_choose_a_genre = new lime.Label().setSize(gameObj.width, 50)
    .setPosition(0, 100).setAnchorPoint(0, 0)
    .setText("CHOOSE FROM A GENRE").setFontSize(25).setFontWeight("bold")
    .setFontColor("#8c0000").setFontFamily(gameObj.ui.font_family);

  var btn_width_ratio = gameObj.width/1.3;
  var btn_starting = (gameObj.height/2)-110;
  var btn_height = 50;
  var btn_padding = 10;

  var btn_genre1 = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText(genres[0]).setFontSize(15);;
  var btn_genre2 = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*2))
    .setText(genres[1]).setFontSize(15);;
  var btn_genre3 = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*3))
    .setText(genres[2]).setFontSize(15);;

  var l_size = 100;
  var c_size = 35;
  var c_padding = 8;

  var bg_line = new lime.Sprite().setSize(gameObj.width, l_size).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, c_size/2);

  // #138113
  var e1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*1,0);
  var e2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*2,0);
  var e3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*3,0);

  // #DDDD00
  var m1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*5,0);
  var m2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*6,0);
  var m3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*7,0);

  // #8c0000
  var h1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*9,0);
  var h2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*10,0);
  var h3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*11,0);

  // #3f3f3f
  var x1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill("#4b4b4b").setPosition((c_size+c_padding)*13,0);

  // load genre from server
  hiddencloud.Functions.getRandomGenres(gameObj, current_game, genres, btn_genre1, btn_genre2, btn_genre3);

  layer_choose_genre.appendChild(bg_choose_genre);
  layer_choose_genre.appendChild(lbl_choose_a_genre);
  layer_header.appendChild(bg_header);
  layer_header.appendChild(lbl_words_read);
  layer_header.appendChild(lbl_time_left);
  layer_header.appendChild(lbl_total_score);
  layer_genres.appendChild(btn_genre1);
  layer_genres.appendChild(btn_genre2);
  layer_genres.appendChild(btn_genre3);
  layer_difficulty.appendChild(bg_line);
  layer_difficulty.appendChild(e1);
  layer_difficulty.appendChild(e2);
  layer_difficulty.appendChild(e3);
  layer_difficulty.appendChild(m1);
  layer_difficulty.appendChild(m2);
  layer_difficulty.appendChild(m3);
  layer_difficulty.appendChild(h1);
  layer_difficulty.appendChild(h2);
  layer_difficulty.appendChild(h3);
  layer_difficulty.appendChild(x1);
  scene_choose_genre.appendChild(layer_choose_genre);
  scene_choose_genre.appendChild(layer_header);
  scene_choose_genre.appendChild(layer_genres);
  scene_choose_genre.appendChild(layer_difficulty);

  // load color on current difficulty 
  switch(current_game.difficulty) {
    case 10:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*13,0));
    case 9:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*11,0));
    case 8:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*10,0));
    case 7:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*9,0));
    case 6:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*7,0));
    case 5:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*6,0));
    case 4:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*5,0));
    case 3:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*3,0));
    case 2:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*2,0));
    case 1:
      layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
        .setFill("#138113").setPosition((c_size+c_padding)*1,0));
  }

  goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });
  goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });
  goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });

  hiddencloud.director.pushScene(scene_choose_genre);

  // when genre clicked, go hiddencloud.pushScene(hiddencloud.Modules.ReadAndAnswer("gameObj", "current_game", "genre", "difficulty"));
  // when answering, time should still be ticking
  // after, go back here
}

hiddencloud.Modules.ReadAndAnswer = function(gameObj, current_game, text_question_object){
  var scene_read_and_answer = new lime.Scene();
  var layer_read_and_answer = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_read_and_answer = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  // set size vars
  var set_spr_header = 50;
  var set_scroller_width = gameObj.width-100;
  var set_scroller_height = gameObj.height-set_spr_header;
  var set_scroller_pos_w = (gameObj.width-set_scroller_width)/2;
  var set_lbl_padding = 10;
  var set_lbl_width = set_scroller_width-(set_lbl_padding*2);
  var set_lbl_height = gameObj.height*5;

  var lbl_book_title = new lime.Label().setText(text_question_object.from_book_text.from_book.title);

  var lbl_text_here = new lime.labelMulti()
    .setSize(set_lbl_width, set_lbl_height)
    .setPosition(set_lbl_padding, set_lbl_padding).setAnchorPoint(0, 0)
    .setText(text_question_object.from_book_text.text);

  var scroller = new lime.ui.Scroller().setDirection(lime.ui.Scroller.Direction.VERTICAL);
  scroller.setFill('#FF0000');
  scroller.setSize(set_scroller_width, set_scroller_height);
  scroller.setAnchorPoint(0, 0);
  scroller.setPosition(set_scroller_pos_w, set_spr_header);
  scroller.appendChild(lbl_text_here);
  scroller.scrollTo(0);

  layer_read_and_answer.appendChild(bg_read_and_answer);
  layer_read_and_answer.appendChild(scroller);
  scene_read_and_answer.appendChild(layer_read_and_answer);

  hiddencloud.director.pushScene(scene_read_and_answer);

}


// hiddencloud.Modules.SpeedReadingBenchmark = function(gameObj) {
//   // load from question bank
//   // get text and questions
//   // introduction from characters about the academy
// }

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