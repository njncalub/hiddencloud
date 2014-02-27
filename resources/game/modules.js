goog.provide('hiddencloud.Modules');

goog.require('hiddencloud.Functions');
goog.require('hiddencloud.Button');
goog.require('lime.Scene');
goog.require('lime.Layer');
// goog.require('lime.Button');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.ui.Scroller');
goog.require('lime.audio.Audio');
// goog.require('lime.LabelMulti');

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
    .setPosition(gameObj.width/2, (gameObj.height/2)-100).setFill('resources/images/srcdojo_logo.png');
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
  // var btn_height = 35;
  var btn_height = 50;
  var btn_padding = 3;

  var scroll_menu = new lime.ui.Scroller().setAnchorPoint(0, 0).setSize(400, 130);

  var btn_play = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText("START TRAINING").setFontSize(16);
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
  // layer_menu.appendChild(label_coins);
  layer_menu.appendChild(scroll_menu);
  layer_menu.appendChild(btn_play);
  // layer_menu.appendChild(btn_shop);
  // layer_menu.appendChild(btn_tutorial);
  // layer_menu.appendChild(btn_train);
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

  // #CURRENT_GAME var here
  var current_game = {};

  current_game.difficulty = 1;
  current_game.total_words = 0; // will change later
  current_game.total_score = 0;
  current_game.total_time_elapsed = 0;
  current_game.time = time_per_game + gameObj.perks.time_bonus;

  current_game.book_text = []; // x10
  current_game.choices = []; // x10. either 1 or 0
  current_game.total_words = []; // x10
  current_game.current_reading_time = 0; // x10. calculated time
  current_game.total_time = []; // x10. calculated time
  current_game.wpm = []; // x10. calculated wpm
  current_game.scores = []; // x10. calculated score

  current_game.chosen_b_t_e = [];
  current_game.chosen_b_t_m = [];
  current_game.chosen_b_t_h = [];
  current_game.chosen_b_t_x = [];

  current_game.chosen_q_and_c_e = [];
  current_game.chosen_q_and_c_m = [];
  current_game.chosen_q_and_c_h = [];
  current_game.chosen_q_and_c_x = [];

  current_game.current_speed = 1500;

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

  // var f, dt = 1000;
  // lime.scheduleManager.scheduleWithDelay(f=function() {
  //   if (current_game.time > 0) {
  //     current_game.time = hiddencloud.Functions.decreaseTime(current_game.time, time_counter);
  //   }
  //   else {
  //     alert("Time is up!");
  //     lime.scheduleManager.unschedule(f, this); 
  //   }
  // }, current_game.time, dt);

  // var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game, current_game.time, f);
  
  // hiddencloud.Modules.startMovingBall(gameObj, current_game, 400);
  // hiddencloud.Modules.endOfQuiz(gameObj, current_game);
  // var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game);
  hiddencloud.Modules.startBenchmarkSpeed(gameObj, current_game);
}

// hiddencloud.Modules.ChooseGenre = function(gameObj, current_game, time, f) {
hiddencloud.Modules.ChooseGenre = function(gameObj, current_game) {
  // lime.scheduleManager.unschedule(f, time);


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
    .setText("WORDS READ: " + hiddencloud.Functions.getTotalWords(current_game.total_words)).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family);

  var lbl_time_left = new lime.Label().setSize(gameObj.width/3, 60)
    .setPosition(gameObj.width/3, 20).setAnchorPoint(0, 0)
    .setText("TOTAL TIME: " + hiddencloud.Functions.getTotalTime(current_game.total_time)).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family);

  var lbl_total_score = new lime.Label().setSize(gameObj.width/3, 60)
    .setPosition((gameObj.width*2)/3, 20).setAnchorPoint(0, 0)
    .setText("TOTAL SCORE: " + hiddencloud.Functions.getScore(current_game, current_game.difficulty-1)).setFontSize(15)
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
    .setText(genres[0]).setFontSize(15);
  var btn_genre2 = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*2))
    .setText(genres[1]).setFontSize(15);
  var btn_genre3 = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*3))
    .setText(genres[2]).setFontSize(15);

  var l_size = 100;
  var c_size = 35;
  var c_padding = 8;

  var bg_line = new lime.Sprite().setSize(gameObj.width, l_size).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, c_size/2);

  var btn_normal_var = "#252525";

  // #138113
  var e1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*1,0);
  var e2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*2,0);
  var e3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*3,0);

  // #DDDD00
  var m1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*5,0);
  var m2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*6,0);
  var m3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*7,0);

  // #8c0000
  var h1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*9,0);
  var h2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*10,0);
  var h3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*11,0);

  // #3f3f3f
  var x1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*13,0);

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
  var color_current = "#4b4b4b";
  switch(current_game.difficulty) {
    case 11:
    case 10:
      if(current_game.difficulty == 10) {
        x1.setFill(color_current);
      }
      if(current_game.choices[9] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*13,0));
      }
    case 9:
      if(current_game.difficulty == 9) {
        h3.setFill(color_current);
      }
      if(current_game.choices[8] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*11,0));
      }
    case 8:
      if(current_game.difficulty == 8) {
        h2.setFill(color_current);
      }
      if(current_game.choices[7] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*10,0));
      }
    case 7:
      if(current_game.difficulty == 7) {
        h1.setFill(color_current);
      }
      if(current_game.choices[6] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*9,0));
      }
    case 6:
      if(current_game.difficulty == 6) {
        m3.setFill(color_current);
      }
      if(current_game.choices[5] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*7,0));
      }
    case 5:
      if(current_game.difficulty == 5) {
        m2.setFill(color_current);
      }
      if(current_game.choices[4] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*6,0));
      }
    case 4:
      if(current_game.difficulty == 4) {
        m1.setFill(color_current);
      }
      if(current_game.choices[3] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*5,0));
      }
    case 3:
      if(current_game.difficulty == 3) {
        e3.setFill(color_current);
      }
      if(current_game.choices[2] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*3,0));
      }
    case 2:
      if(current_game.difficulty == 2) {
        e2.setFill(color_current);
      }
      if(current_game.choices[1] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*2,0));
      }
    case 1:
      if(current_game.difficulty == 1) {
        e1.setFill(color_current);
      }
      if(current_game.choices[0] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*1,0));
      }
  }

  // console.log("current_game.choices");
  // console.log(current_game.choices);

  goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });
  goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });
  goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.select_category_au.play();
  });

  hiddencloud.director.replaceScene(scene_choose_genre);

  if(current_game.difficulty == 1) {
    // console.log("current difficulty is 4!");
    var wpm = current_game.benchmark_speed;
    // console.log(wpm);
    hiddencloud.Modules.startMovingBall(gameObj, current_game, wpm);
  }
  if(current_game.difficulty == 4) {
    // console.log("current difficulty is 4!");
    var wpm = hiddencloud.Functions.getWPM(current_game, 0, 2); // 1,2,3
    // console.log(wpm);
    hiddencloud.Modules.startMovingBall(gameObj, current_game, wpm);
  }
  if(current_game.difficulty == 7) {
    // console.log("current difficulty is 7!");
    var wpm = hiddencloud.Functions.getWPM(current_game, 3, 5); // 4,5,6
    // console.log(wpm);
    hiddencloud.Modules.startMovingBall(gameObj, current_game, wpm);
  }
  if(current_game.difficulty == 10) {
    // console.log("current difficulty is 10!");
    // var wpm = hiddencloud.Functions.getWPM(current_game, current_game.difficulty, current_game.difficulty+1);
    var wpm = hiddencloud.Functions.getWPM(current_game, 6, 8); // 7,8,9
    // console.log(wpm);
    hiddencloud.Modules.startMovingBall(gameObj, current_game, wpm);
  }
  if(current_game.difficulty >= 11) {
    // console.log("current difficulty is 11!");
    console.log("ending game...");
    // var wpm = hiddencloud.Functions.getWPM(current_game, current_game.difficulty, current_game.difficulty+1);
    // var wpm = hiddencloud.Functions.getWPM(current_game, 6, 8); // 7,8,9
    // console.log(wpm);
    hiddencloud.Modules.endOfQuiz(gameObj, current_game);
  }

  // when genre clicked, go hiddencloud.pushScene(hiddencloud.Modules.ReadAndAnswer("gameObj", "current_game", "genre", "difficulty"));
  // when answering, time should still be ticking
  // after, go back here
}


hiddencloud.Modules.startBenchmarkSpeed = function(gameObj, current_game) {

  var scene_benchmark = new lime.Scene();
  var layer_benchmark = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_benchmark = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  // set size vars
  var set_spr_header = 50;
  var set_spr_footer = 80;
  var set_scroller_width = gameObj.width-20;
  var set_scroller_height = gameObj.height-set_spr_header-set_spr_footer;
  var set_scroller_pos_w = (gameObj.width-set_scroller_width)/2;
  var set_lbl_padding = 10;
  var set_lbl_width = set_scroller_width-(set_lbl_padding*2);
  var set_lbl_height = gameObj.height*5;

  var lbl_book_title = new lime.Label()
    // .setSize(gameObj.width, set_spr_header)
    .setPosition(gameObj.width/2, set_spr_header/2)
    .setFontWeight(600);
  lbl_book_title.setText("INSTRUCTIONS");

  var benchmark_text = "" +
                       "DO NOT SKIP THIS PART. " + 
                       "This is timed but please read this text at your normal pace. " +
                       "To gauge your progress, you must first find your base speed. " +
                       "Your base speed is the speed that you can read this passage of text with full comprehension. " + 
                       // "To navigate, simply click and drag to scroll." +
                       "\r\n\r\n" +
                       "Most people have an average speed of 200 wpm (words per minute), which is also as fast as they can speak. " +
                       "Speed reading is a technique used by people around the world to read text quickler by training the person's \"inner voice\". " + 
                       "When you read, you usually experience subvocalization where you vocalize each word in your head. " +
                       // "This poses as a major problem in speed because it takes time to subvocalize each word and you can only read as fast as you speak." +
                       "\r\n\r\n" +
                       "However, by glancing at the words in just a few milliseconds, your head won't have time to subvocalize. " +
                       "By silencing your inner voice, you can read at a much greater speed with better reading comprehension (through constant training). " +
                       // // "In the real world, you can speed read through methods like using a finger or pen to point and guide your eyes through each line of text at a speed faster than you can normally read. " +
                       // // "This works because the eye is very good at tracking movement. " + 
                       // "Even if at this point full reading comprehension is lost, it's exactly this method of training that will allow you to read faster." +
                       // "\r\n\r\n" +
                       // "This game uses Meta Guiding to speed up eye movement and intake of the Visual Cortex and uses Rapid Serial Visual Presentation (RSVP) to improve peripheral vision. " +
                       "There are ten questions in total. " + 
                       // "Start by choosing a random genre for your passage. " + 
                       // "Try to speed read the lines as fast as you can by following the highlighted area. " + 
                       "If it is too fast or too slow, you can adjust the speed through the (-) and (+) buttons. " +
                       "To test your comprehension, you need to answer a related question afterwards." +
                       "\r\n\r\n" +
                       "Now click finish reading to start your training. Good luck!";

  var lbl_text_here = new lime.Label()
    .setSize(set_lbl_width, set_lbl_height)
    .setPosition(set_lbl_padding, set_lbl_padding).setAnchorPoint(0, 0)
    .setText(benchmark_text).setMultiline(true)
    .setAlign("left").setFontFamily('Open Sans')
    .setFontSize(15);

  var scroller = new lime.ui.Scroller().setDirection(lime.ui.Scroller.Direction.VERTICAL);
      scroller.setFill('#B1B1B1');
      scroller.setSize(set_scroller_width, set_scroller_height);
      scroller.setAnchorPoint(0, 0);
      scroller.setPosition(set_scroller_pos_w, set_spr_header);
      scroller.appendChild(lbl_text_here);
      scroller.scrollTo(0);

  var btn_width_ratio = gameObj.width/1.3;
  var btn_side_width = (gameObj.width - btn_width_ratio)/2;
  var btn_starting = gameObj.height-100;
  var btn_height = 50;
  var btn_padding = 10;

  var btn_read = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio-(btn_padding*4), btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText("FINISHED READING").setFontSize(15);

  layer_benchmark.appendChild(bg_benchmark);
  layer_benchmark.appendChild(lbl_book_title);
  layer_benchmark.appendChild(scroller);
  layer_benchmark.appendChild(btn_read);
  scene_benchmark.appendChild(layer_benchmark);

  hiddencloud.director.replaceScene(scene_benchmark);

  current_game.current_reading_time = 0;

  var increaseReadingTime, dt = 1000;
  var current_reading_time = current_game.current_reading_time;
  lime.scheduleManager.scheduleWithDelay(increaseReadingTime=function() {
    if (current_reading_time >= 0) {
      current_reading_time = hiddencloud.Functions.increaseTime(current_reading_time);
      current_game.current_reading_time = current_reading_time;
    }
  }, current_game.current_reading_time, dt);

  // when clicked finished reading
  goog.events.listen(btn_read, ['mousedown', 'touchstart'], function(e) {
    lime.scheduleManager.unschedule(increaseReadingTime, current_game.current_reading_time);
    current_game.benchmark_time = current_game.current_reading_time;
    current_game.benchmark_total_words = benchmark_text.match(/\S+/g).length;
    current_game.current_reading_time = -1;
    current_reading_time = -1;

    console.log("current_game.benchmark_total_words");
    console.log(current_game.benchmark_total_words);
    console.log("current_game.benchmark_time");
    console.log(current_game.benchmark_time);

    current_game.benchmark_speed = hiddencloud.Functions.getBenchmarkWPM(current_game, current_game.benchmark_total_words, current_game.benchmark_time);
    console.log("current_game.benchmark_speed");
    console.log(current_game.benchmark_speed);

    var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game);

    // hiddencloud.Modules.AnswerBookTextQuestion(gameObj, current_game, chosen_b_t, chosen_q_and_c);
    // var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game, current_game.time, f);
  });
}

hiddencloud.Modules.ReadInstructions = function(gameObj, instructions) {
  var scene_instructions = new lime.Scene();
  var layer_instructions = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_instructions = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var btn_width_ratio = gameObj.width/1.3;
  var btn_side_width = (gameObj.width - btn_width_ratio)/2;
  var btn_starting = gameObj.height-100;
  var btn_height = 50;
  var btn_padding = 10;

  var btn_continue = new hiddencloud.Button()
    .setColor('#B0171F').setSize(btn_width_ratio-(btn_padding*4), btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText("CONTINUE").setFontSize(15);

  layer_instructions.appendChild(bg_instructions);
  layer_instructions.appendChild(btn_continue);
  scene_instructions.appendChild(layer_instructions);

  hiddencloud.director.replaceScene(scene_instructions);
}

hiddencloud.Modules.ReadBookText = function(gameObj, current_game, text_question_object){
  var chosen_b_t = {};
      chosen_b_t.text = text_question_object.from_book_text.text;
      chosen_b_t.total_words = text_question_object.from_book_text.total_words;

  var chosen_q_and_c = {};
      chosen_q_and_c.question = text_question_object.question;
      chosen_q_and_c.choice_1 = text_question_object.choice_1;
      chosen_q_and_c.choice_2 = text_question_object.choice_2;
      chosen_q_and_c.choice_3 = text_question_object.choice_3;
      chosen_q_and_c.correct  = text_question_object.correct;

  current_game.book_text.push(chosen_b_t);
  current_game.total_words.push(chosen_b_t.total_words);

  // console.log("chosen_b_t");
  // console.log(chosen_b_t);
  // console.log("chosen_q_and_c");
  // console.log(chosen_q_and_c);
  // console.log("current_game.book_text");
  // console.log(current_game.book_text);
  // console.log("current_game.total_words");
  // console.log(current_game.total_words);

  // console.log("total_words: ");
  // console.log(current_game.total_words);

  console.log("current_game.difficulty");
  console.log(current_game.difficulty);
  if(current_game.difficulty == 3) {
      // console.log("entering rsvp mode");
      hiddencloud.Modules.startRapidSerialVisualPresentation(gameObj, current_game, chosen_b_t, chosen_q_and_c);
  }
  else if(current_game.difficulty == 6) {
      // console.log("entering rsvp mode");
      hiddencloud.Modules.startRapidSerialVisualPresentation(gameObj, current_game, chosen_b_t, chosen_q_and_c);
  }
  else if(current_game.difficulty == 9) {
      // console.log("entering rsvp mode");
      hiddencloud.Modules.startRapidSerialVisualPresentation(gameObj, current_game, chosen_b_t, chosen_q_and_c);
  }
  else {
    var scene_read_and_answer = new lime.Scene();
    var layer_read_and_answer = new lime.Layer().setPosition(0, 0)
      .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
    var bg_read_and_answer = new lime.Sprite().setSize(gameObj.width, gameObj.height)
      .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);
    var bg_highlight_line = new lime.Sprite().setSize(gameObj.width, 20)
      .setFill('#FFF154').setAnchorPoint(0, 0)
      // .setPosition(0, 9);
      .setPosition(0, -23);

    // set size vars
    var set_spr_header = 50;
    var set_spr_footer = 80;
    var set_scroller_width = gameObj.width-20;
    var set_scroller_height = gameObj.height-set_spr_header-set_spr_footer;
    var set_scroller_pos_w = (gameObj.width-set_scroller_width)/2;
    var set_lbl_padding = 10;
    var set_lbl_width = set_scroller_width-(set_lbl_padding*2);
    var set_lbl_height = gameObj.height*5;

    var lbl_book_title = new lime.Label()
      // .setSize(gameObj.width, set_spr_header)
      .setPosition(gameObj.width/2, set_spr_header/2)
      .setFontWeight(600);
    lbl_book_title.setText(text_question_object.from_book_text.from_book.title);

    var lbl_text_here = new lime.Label()
      .setSize(set_lbl_width, set_lbl_height)
      .setPosition(set_lbl_padding, set_lbl_padding).setAnchorPoint(0, 0)
      .setText(text_question_object.from_book_text.text).setMultiline(true)
      .setAlign("left").setFontFamily('Open Sans');

    var scroller = new lime.ui.Scroller().setDirection(lime.ui.Scroller.Direction.VERTICAL);
        scroller.setFill('#B1B1B1');
        scroller.setSize(set_scroller_width, set_scroller_height);
        scroller.setAnchorPoint(0, 0);
        scroller.setPosition(set_scroller_pos_w, set_spr_header);
        scroller.appendChild(bg_highlight_line);
        scroller.appendChild(lbl_text_here);
        scroller.scrollTo(0);

    var btn_width_ratio = gameObj.width/1.3;
    var btn_side_width = (gameObj.width - btn_width_ratio)/2;
    var btn_starting = gameObj.height-100;
    var btn_height = 50;
    var btn_padding = 10;

    var btn_read = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio-(btn_padding*4), btn_height).setAnchorPoint(0,0)
      .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
      .setText("FINISHED READING").setFontSize(15);

    var btn_decrease = new hiddencloud.Button().setColor('#B0171F').setSize(btn_side_width, btn_height).setAnchorPoint(0,0)
      .setPosition((btn_side_width/2)+btn_padding, btn_starting+((btn_height + btn_padding)*1))
      .setText("-").setFontSize(15);

    var btn_increase = new hiddencloud.Button().setColor('#B0171F').setSize(btn_side_width, btn_height).setAnchorPoint(0,0)
      .setPosition(gameObj.width-(btn_side_width/2)-btn_padding, btn_starting+((btn_height + btn_padding)*1))
      .setText("+").setFontSize(15);

    layer_read_and_answer.appendChild(bg_read_and_answer);
    layer_read_and_answer.appendChild(lbl_book_title);
    layer_read_and_answer.appendChild(scroller);
    layer_read_and_answer.appendChild(btn_read);
    layer_read_and_answer.appendChild(btn_decrease);
    layer_read_and_answer.appendChild(btn_increase);
    scene_read_and_answer.appendChild(layer_read_and_answer);

    hiddencloud.director.replaceScene(scene_read_and_answer);

    // var chosen_b_t = {};
    //     chosen_b_t.text = text_question_object.from_book_text.text;
    //     chosen_b_t.total_words = text_question_object.from_book_text.total_words;

    // var chosen_q_and_c = {};
    //     chosen_q_and_c.question = text_question_object.question;
    //     chosen_q_and_c.choice_1 = text_question_object.choice_1;
    //     chosen_q_and_c.choice_2 = text_question_object.choice_2;
    //     chosen_q_and_c.choice_3 = text_question_object.choice_3;
    //     chosen_q_and_c.correct  = text_question_object.correct;

    // current_game.book_text.push(chosen_b_t);
    // current_game.total_words.push(chosen_b_t.total_words);

    // console.log("total_words: ");
    // console.log(current_game.total_words);

    current_game.current_reading_time = 0;

    var increaseReadingTime, dt = 1000;
    var current_reading_time = current_game.current_reading_time;
    lime.scheduleManager.scheduleWithDelay(increaseReadingTime=function() {
      if (current_reading_time >= 0) {
        current_reading_time = hiddencloud.Functions.increaseTime(current_reading_time);
        current_game.current_reading_time = current_reading_time;
      }
    }, current_game.current_reading_time, dt);

    var move_line;
    // var dt2 = 1000;
    var dt2 = current_game.current_speed;

    var difference_per_level = 20;

    if(current_game.difficulty == 1) {
      dt2 -= (difference_per_level*1);
    }
    if(current_game.difficulty == 2) {
      dt2 -= (difference_per_level*2);
    }
    if(current_game.difficulty == 3) {
      dt2 -= (difference_per_level*3);
    }
    if(current_game.difficulty == 4) {
      dt2 -= (difference_per_level*4);
    }
    if(current_game.difficulty == 5) {
      dt2 -= (difference_per_level*5);
    }
    if(current_game.difficulty == 6) {
      dt2 -= (difference_per_level*6);
    }
    if(current_game.difficulty == 7) {
      dt2 -= (difference_per_level*7);
    }
    if(current_game.difficulty == 8) {
      dt2 -= (difference_per_level*8);
    }
    if(current_game.difficulty == 9) {
      dt2 -= (difference_per_level*9);
    }

    current_game.current_speed = dt2;

    lime.scheduleManager.scheduleWithDelay(move_line=function() {
      var pos = this.getPosition();
          pos.y += 16;
      this.setPosition(pos);
      scroller.scrollTo(pos.y-50);
    }, bg_highlight_line, dt2);

    var speed_var = 120;

    goog.events.listen(btn_decrease, ['mousedown', 'touchstart'], decreaseSpeedFunction = function(e) {
      if (dt2 >= 0) {
        dt2 = dt2 + speed_var;
        current_game.current_speed = dt2;
        console.log("decreased speed to " + dt2);
        lime.scheduleManager.unschedule(move_line, bg_highlight_line);
        lime.scheduleManager.scheduleWithDelay(move_line, bg_highlight_line, dt2);
      }
      else {
        dt2 = 0;
        console.log("decreased speed to " + dt2);
        lime.scheduleManager.unschedule(move_line, bg_highlight_line);
        lime.scheduleManager.scheduleWithDelay(move_line, bg_highlight_line, dt2);
      }
    });

    goog.events.listen(btn_increase, ['mousedown', 'touchstart'], increaseSpeedFunction = function(e) {
      if (dt2 >= 0) {
        dt2 = dt2 - speed_var;
        console.log("increased speed to " + dt2);
        lime.scheduleManager.unschedule(move_line, bg_highlight_line);
        lime.scheduleManager.scheduleWithDelay(move_line, bg_highlight_line, dt2);
      }
      if (dt2 <= 0) {
        dt2 = 0;
      }
      current_game.current_speed = dt2;
    });

    // when clicked finished reading
    goog.events.listen(btn_read, ['mousedown', 'touchstart'], function(e) {
      lime.scheduleManager.unschedule(increaseReadingTime, current_game.current_reading_time);
      current_game.total_time.push(current_game.current_reading_time);
      current_game.current_reading_time = -1;
      current_reading_time = -1;

      // console.log(current_game.total_time);

      hiddencloud.Functions.getWPM(gameObj, current_game, current_game.difficulty-1, current_game.difficulty);

      current_game.difficulty += 1;
      if((current_game.difficulty == 1) &&
         (current_game.difficulty == 2)) {
        // if difficulty == 1,2: push to questions_array
        current_game.chosen_b_t_e.push(chosen_b_t);
        current_game.chosen_q_and_c_e.push(chosen_q_and_c);
      }
      if(current_game.difficulty == 3) {
        // if difficulty == 3:   answer questions 1 to 3

      }
      if((current_game.difficulty == 4) &&
         (current_game.difficulty == 5)) {
        // if difficulty == 4,5: push to questions_array
        current_game.chosen_b_t_m.push(chosen_b_t);
        current_game.chosen_q_and_c_m.push(chosen_q_and_c);

      }
      if(current_game.difficulty == 6) {
        // if difficulty == 6:   answer questions 4 to 6

      }
      if((current_game.difficulty == 7) &&
         (current_game.difficulty == 8)) {
        // if difficulty == 7,8: push to questions_array
        current_game.chosen_b_t_h.push(chosen_b_t);
        current_game.chosen_q_and_c_h.push(chosen_q_and_c);

      }
      if(current_game.difficulty == 9) {
        // if difficulty == 6:   answer questions 4 to 6

      }
      // if difficulty == 9:   answer questions 7 to 8
      if(current_game.difficulty == 10) {
        // if difficulty == 10
        // open rsvp;
        current_game.chosen_b_t_x.push(chosen_b_t);
        current_game.chosen_q_and_c_x.push(chosen_q_and_c);
      }
      hiddencloud.Modules.AnswerBookTextQuestion(gameObj, current_game, chosen_b_t, chosen_q_and_c);


      // var genre =  hiddencloud.Modules.ChooseGenre(gameObj, current_game, current_game.time, f);
    });
    if (current_game.difficulty == 1) {
      window.read_instructions_guide();
    }
  }
}

hiddencloud.Modules.AnswerBookTextQuestion = function(gameObj, current_game, book_text, book_text_question) {

  // console.log("went here -- answer book text question");
  // console.log("book_text");
  // console.log(book_text);
  // console.log("book_text_question");
  // console.log(book_text_question);

  var scene_answer_btq = new lime.Scene();
  var layer_answer_btq = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_answer_btq = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  // set size vars
  var set_spr_header = 20;
  var set_spr_footer = gameObj.height/3;
  var set_scroller_width = gameObj.width-20;
  var set_scroller_height = (gameObj.height/3)+20;
  var set_scroller_pos_w = (gameObj.width-set_scroller_width)/2;
  var set_lbl_padding = 10;
  var set_lbl_width = set_scroller_width-(set_lbl_padding*2);
  var set_lbl_height = gameObj.height*5;

  var lbl_btq = new lime.Label()
    .setSize(set_lbl_width, set_lbl_height)
    .setPosition(set_lbl_padding, set_lbl_padding).setAnchorPoint(0, 0)
    .setText(book_text_question.question).setMultiline(true)
    .setAlign("left").setFontFamily('Open Sans');

  var scroller = new lime.ui.Scroller().setDirection(lime.ui.Scroller.Direction.VERTICAL);
      scroller.setFill('#B1B1B1');
      scroller.setSize(set_scroller_width, set_scroller_height);
      scroller.setAnchorPoint(0, 0);
      scroller.setPosition(10, set_spr_header);
      scroller.appendChild(lbl_btq);
      scroller.scrollTo(0);

  var btn_starting = set_spr_footer;
  var btn_height = 70;
  var btn_padding = 20;
  var btn_width_ratio = gameObj.width-(10*2);
  var btn_color = '#B0171F';

  var btn_choice1 = new hiddencloud.Button().setColor(btn_color).setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*1))
    .setText("CHOICE 1").setFontSize(13)
    .setLabelWidth(btn_width_ratio);

  var btn_choice2 = new hiddencloud.Button().setColor(btn_color).setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*2))
    .setText("CHOICE 2").setFontSize(13)
    .setLabelWidth(btn_width_ratio);

  var btn_choice3 = new hiddencloud.Button().setColor(btn_color).setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(gameObj.width/2, btn_starting+((btn_height + btn_padding)*3))
    .setText("CHOICE 3").setFontSize(13)
    .setLabelWidth(btn_width_ratio);

  layer_answer_btq.appendChild(bg_answer_btq);
  layer_answer_btq.appendChild(scroller);
  layer_answer_btq.appendChild(btn_choice1);
  layer_answer_btq.appendChild(btn_choice2);
  layer_answer_btq.appendChild(btn_choice3);
  scene_answer_btq.appendChild(layer_answer_btq);

  hiddencloud.director.replaceScene(scene_answer_btq);

  // only after clicking a choice
  hiddencloud.Functions.randomizeBookChoicesButton(gameObj, current_game, book_text_question, btn_choice1, btn_choice2, btn_choice3);
}

hiddencloud.Modules.startMovingBall = function(gameObj, current_game, average_wpm) {

  var scene_moving_ball = new lime.Scene();
  var layer_moving_ball = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_moving_ball = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var lbl_instructions = new lime.Label()
    // .setText("Don't move your head. Just follow the ball with your eyes.")
    .setText("")
    .setSize(gameObj.width, 50)
    .setMultiline(true)
    .setAlign("center")
    .setPosition(gameObj.width/2, gameObj.height/2);

  var pos_x = 0;
  var pos_y = 0;
  var pos_x_max = gameObj.width;
  var pos_y_max = gameObj.height;
  var ball_radius = 20;
  var padding = 15;
  var position = [];

  var red_ball = new lime.Circle().setSize(ball_radius, ball_radius)
      .setFill('#B0171F').setPosition(gameObj.width/2, gameObj.height/2);

  // position.push([gameObj.width/2, gameObj.height/2]);
  // position.push([gameObj.width/2, gameObj.height/2]);
  position.push([gameObj.width/2, gameObj.height/2]);

  for (var i = 0; i < 2; i++) {
    position.push([0+padding, 0+padding]);
    position.push([pos_x_max-padding, 0+padding]);
    position.push([0+padding, pos_y_max-padding]);
    position.push([pos_x_max-padding, pos_y_max-padding]);
  }
  for (var i = 0; i < 30; i++) {
    if(pos_y+padding < pos_y_max) {
      position.push([pos_x+padding, pos_y+padding]);
      position.push([pos_x_max-padding, pos_y+padding]);
      pos_y += ball_radius+10;
    }
  }
  for (var i = 0; i < 2; i++) {
    position.push([0+padding, 0+padding]);
    position.push([pos_x_max-padding, 0+padding]);
    position.push([0+padding, pos_y_max-padding]);
    position.push([pos_x_max-padding, pos_y_max-padding]);
  }
  // pos_x = 0;
  // pos_y = 0;
  // for (var i = 0; i < 50; i++) {
  //   if(pos_x+padding < pos_x_max) {
  //     position.push([pos_x+padding, pos_y+padding]);
  //     position.push([pos_x+padding, pos_y_max-padding]);
  //     pos_x += ball_radius*2;
  //   }
  // }
  // for (var i = 0; i < 2; i++) {
  //   position.push([0+padding, 0+padding]);
  //   position.push([pos_x_max-padding, 0+padding]);
  //   position.push([0+padding, pos_y_max-padding]);
  //   position.push([pos_x_max-padding, pos_y_max-padding]);
  // }
  position.push([gameObj.width/2, gameObj.height/2]);

  // var words_per_line = 15;
  // var dt = 500;
  var dt = hiddencloud.Functions.getMovingBallDT(average_wpm); // range = 600 - 350

  if (current_game.difficulty > 0) {
    red_ball.setFill('#8c0000'); // #FFF154
    dt = 800;
  }
  if (current_game.difficulty > 2) {
    red_ball.setFill('#8c0000'); // #8c0000
    dt = 650;
  }
  if (current_game.difficulty > 5) {
    red_ball.setFill('#8c0000'); // #985F5F
    dt = 500;
  }
  if (current_game.difficulty > 8) {
    red_ball.setFill('#8c0000'); // #9C9C9C
    dt = 350;
  }

  // console.log("average_wpm: " + average_wpm);
  // console.log("dt: " + dt);

  var fun;
  lime.scheduleManager.scheduleWithDelay(fun=function() {
    if(position.length > 0) {
      hiddencloud.Functions.moveCircle(gameObj, current_game, red_ball, position.shift());
    }
    else {
      lime.scheduleManager.unschedule(fun, red_ball);
      // hiddencloud.Modules.ChooseGenre(gameObj, current_game);
      hiddencloud.director.popScene();
    }
  }, red_ball, dt);

  layer_moving_ball.appendChild(bg_moving_ball);
  layer_moving_ball.appendChild(red_ball);
  layer_moving_ball.appendChild(lbl_instructions);
  scene_moving_ball.appendChild(layer_moving_ball);

  hiddencloud.director.pushScene(scene_moving_ball);

  if (current_game.difficulty == 1) {
    window.read_instructions_ball();
  }

  // goog.events.listen(exitMoveBallButton, ['mousedown', 'touchstart'], function(e) {
  //   console.log("pressed back button");
  //   hiddencloud.Modules.startGame(gameObj);
  // });
}

hiddencloud.Modules.startRapidSerialVisualPresentation = function(gameObj, current_game, chosen_b_t, chosen_q_and_c) {

  current_game.current_reading_time = 0;

  var increaseReadingTime, dt = 1000;
  var current_reading_time = current_game.current_reading_time;
  lime.scheduleManager.scheduleWithDelay(increaseReadingTime=function() {
    if (current_reading_time >= 0) {
      current_reading_time = hiddencloud.Functions.increaseTime(current_reading_time);
      current_game.current_reading_time = current_reading_time;
    }
  }, current_game.current_reading_time, dt);

  var scene_rsvp = new lime.Scene();
  var layer_rsvp = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var bg_rsvp = new lime.Sprite().setSize(gameObj.width, gameObj.height)
    .setFill('#CCCCCC').setPosition(0, 0).setAnchorPoint(0, 0);

  var lbl_big_text = new lime.Label()
    .setText("Text").setFontFamily('Open Sans')
    .setFontWeight('bold').setFontColor('#000')
    .setSize(gameObj.width, gameObj.height/10)
    .setFontSize(80)
    .setPosition(gameObj.width/2, (gameObj.height/2)-((gameObj.height/10)/1))
    .setAlign("center");

  var btn_padding = 10;
  var btn_width_ratio = (gameObj.width/2)-(btn_padding*1.5);
  var btn_starting = gameObj.height-100;
  var btn_height = 50;

  var btn_decrease = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition((btn_width_ratio/2)+(btn_padding*1), btn_starting+((btn_height + btn_padding)*1))
    .setText("DECREASE SPEED (-)").setFontSize(15);

  var btn_increase = new hiddencloud.Button().setColor('#B0171F').setSize(btn_width_ratio, btn_height).setAnchorPoint(0,0)
    .setPosition(((btn_width_ratio*3)/2)+(btn_padding*2), btn_starting+((btn_height + btn_padding)*1))
    .setText("INCREASE SPEED (+)").setFontSize(15);

  var moving_text = chosen_b_t.text.match(/\S+/g);
  lbl_big_text.setText(moving_text[0]);

  var ball_radius = 20;
  var ball = new lime.Circle().setSize(ball_radius, ball_radius)
      .setFill('#8c0000').setPosition(gameObj.width/2, (gameObj.height/2)-(ball_radius/1)); // #9C9C9C

  layer_rsvp.appendChild(bg_rsvp);
  layer_rsvp.appendChild(ball);
  layer_rsvp.appendChild(lbl_big_text);
  layer_rsvp.appendChild(btn_decrease);
  layer_rsvp.appendChild(btn_increase);
  scene_rsvp.appendChild(layer_rsvp);

  hiddencloud.director.replaceScene(scene_rsvp);

  var displayTextFunction, decreaseSpeedFunction, increaseSpeedFunction;
  var dt = 200;
  lime.scheduleManager.scheduleWithDelay(displayTextFunction = function() {
    if(moving_text.length > 0)
      lbl_big_text.setText( moving_text.shift() );
    else {
      lime.scheduleManager.unschedule(increaseReadingTime, current_game.current_reading_time);
      current_game.total_time.push(current_game.current_reading_time);
      current_game.current_reading_time = -1;
      current_reading_time = -1;

      // console.log(current_game.total_time);

      lime.scheduleManager.unschedule(displayTextFunction, lbl_big_text);
      current_game.difficulty += 1;
      hiddencloud.Modules.AnswerBookTextQuestion(gameObj, current_game, chosen_b_t, chosen_q_and_c);
    }
  }, lbl_big_text, dt);

  goog.events.listen(btn_decrease, ['mousedown', 'touchstart'], decreaseSpeedFunction = function(e) {
    if (dt >= 0) {
      dt = dt + 30;
      console.log("decreased speed to " + dt);
      lime.scheduleManager.unschedule(displayTextFunction, lbl_big_text);
      lime.scheduleManager.scheduleWithDelay(displayTextFunction, lbl_big_text, dt);
    }
  });

  goog.events.listen(btn_increase, ['mousedown', 'touchstart'], increaseSpeedFunction = function(e) {
    if (dt >= 0) {
      dt = dt - 30;
      console.log("increased speed to " + dt);
      lime.scheduleManager.unschedule(displayTextFunction, lbl_big_text);
      lime.scheduleManager.scheduleWithDelay(displayTextFunction, lbl_big_text, dt);
    }
  });

  if (current_game.difficulty == 3) {
    window.read_instructions_rsvp();
  }
}

hiddencloud.Modules.endOfQuiz = function(gameObj, current_game) {
  var scene_end_of_quiz = new lime.Scene();
  var layer_end_of_quiz = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_end_of_quiz = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_header = new lime.Layer().setPosition(0, 0)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_difficulty = new lime.Layer().setPosition(0, gameObj.height-70)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);
  var layer_results = new lime.Layer().setPosition(25, 110)
    .setRenderer(gameObj.renderer).setAnchorPoint(0, 0);

  var bg_end_of_quiz = new lime.Sprite().setSize(gameObj.width, gameObj.height)
  .setFill('#CCCCCC').setFill('resources/images/paper_bg.jpg').setPosition(0, 0).setAnchorPoint(0, 0);  

  var bg_header = new lime.Sprite().setSize(gameObj.width, 60).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, 0);

  var awpm_here = Math.round(hiddencloud.Functions.getWPM(current_game, 0, 9));
  var rc_here = hiddencloud.Functions.getReadingComprehension(current_game.choices);
  var e_awpm = Math.round(awpm_here * (rc_here/100));
  var score_here = hiddencloud.Functions.getScore(current_game, current_game.difficulty-1);
  var tweet_text = "Tweet Results:\r\nI can read as fast as " + e_awpm + " WPM! Test your speed now! #hiddencloudacademy http://j.mp/hiddencloud";
  var random_book = hiddencloud.Functions.getRandomBookData();
  var random_book_mins = random_book.total_words / e_awpm;
  // var random_book_mins = random_book.total_words / 600;
  var in_hours = Math.floor(random_book_mins/60);
  var in_minutes = Math.round(random_book_mins%60);
  var correct_here = hiddencloud.Functions.getCorrectAnswers(current_game.choices);

  var game_result = GameResult.create({
    "training_date": new Date(),
    "average_wpm": awpm_here,
    "average_rc": rc_here,
    "total_correct": correct_here,
    "quiz_score": score_here,
    "b_awpm": current_game.benchmark_speed
  });

  game_result.save();
  hca_functions.send_game_result(game_result);

  // console.log(random_book_mins);
  // console.log(in_hours);
  // console.log(in_minutes);
  // console.log(game_result);
  // send results to server

  var lbl_quote = new lime.Label().setSize(gameObj.width, 60)
    .setText("With that speed, you can read " + random_book.title + " in " + in_hours + " hours and " + in_minutes + " minutes.")
    .setPosition(0, 20).setAnchorPoint(0, 0)
    .setFontColor("#ffffff")
    .setFontSize(13);

  var set_starting_point_y = 0;
  var set_lbl_height = 30;
  var set_lbl_padding_x = 20;
  var set_lbl_padding_y = 10;

  var bg_results = new lime.Sprite().setSize((gameObj.width/2)-40, 250).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, 0);

  var lbl_words_read = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*1)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("TOTAL WORDS READ: " + hiddencloud.Functions.getTotalWords(current_game.total_words)).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var lbl_time_used = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*2)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("TOTAL TIME USED: " + hiddencloud.Functions.getTotalTime(current_game.total_time)).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var lbl_average_wpm = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*3)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("AVERAGE WPM: " + awpm_here + " WPM").setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var lbl_reading_comprehension = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*4)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("READING COMPREHENSION: " + rc_here + "%").setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var lbl_total_coins = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*5)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("EFFICIENT SPEED: " + e_awpm + " WPM").setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var lbl_total_score = new lime.Label().setSize(gameObj.width, set_lbl_height)
    .setPosition(set_lbl_padding_x, set_lbl_padding_y+(set_lbl_height*6)+set_starting_point_y).setAnchorPoint(0, 0)
    .setText("TOTAL SCORE: " + score_here).setFontSize(15)
    .setFontColor("#ffffff").setFontFamily(gameObj.ui.font_family)
    .setAlign("left");

  var set_res_width = (gameObj.width/2)-30;
  var set_res_height = 100;
  var set_res_pos_x = (gameObj.width/2)-20;
  var set_res_pos_y = 0;
  var set_res_padding = 10;

  var bg_tweet_results = new lime.Sprite().setSize(set_res_width, set_res_height).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(set_res_pos_x, set_res_pos_y);

  var lbl_tweet = new lime.Label()
    .setSize(set_res_width-(set_res_padding*2), set_res_height-(set_res_padding*2))
    .setPosition(set_res_pos_x+set_res_padding, set_res_pos_y+set_res_padding+5).setAnchorPoint(0, 0)
    .setText(tweet_text)
    .setFontSize(13)
    .setFontColor("#ffffff")
    .setFontFamily(gameObj.ui.font_family)
    .setAlign("left")
    .setMultiline(true);

  var l_size = 100;
  var c_size = 35;
  var c_padding = 8;

  var bg_line = new lime.Sprite().setSize(gameObj.width, l_size).setAnchorPoint(0,0)
    .setFill("#141414").setPosition(0, c_size/2);

  var btn_normal_var = "#252525";

  // #138113
  var e1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*1,0);
  var e2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*2,0);
  var e3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*3,0);

  // #DDDD00
  var m1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*5,0);
  var m2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*6,0);
  var m3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*7,0);

  // #8c0000
  var h1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*9,0);
  var h2 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*10,0);
  var h3 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*11,0);

  // #3f3f3f
  var x1 = new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
    .setFill(btn_normal_var).setPosition((c_size+c_padding)*13,0);

  var btn_start_pos = 130;
  var btn_height = 40;
  var btn_padding = btn_height/4;
  var btn_start_x = gameObj.width-195;

  var btn_tweet_text = new hiddencloud.Button().setColor('#B0171F').setSize(set_res_width, btn_height).setAnchorPoint(0,0)
    .setPosition(btn_start_x, btn_start_pos+((btn_height+btn_padding)*0))
    .setText("TWEET RESULTS").setFontSize(15);

  var btn_view_progress = new hiddencloud.Button().setColor('#B0171F').setSize(set_res_width, btn_height).setAnchorPoint(0,0)
    .setPosition(btn_start_x, btn_start_pos+((btn_height+btn_padding)*1))
    .setText("VIEW PROGRESS").setFontSize(15);

  var btn_menu_selection = new hiddencloud.Button().setColor('#B0171F').setSize(set_res_width, btn_height).setAnchorPoint(0,0)
    .setPosition(btn_start_x, btn_start_pos+((btn_height+btn_padding)*2))
    .setText("BACK TO MENU").setFontSize(15);

  layer_end_of_quiz.appendChild(bg_end_of_quiz);
  layer_header.appendChild(bg_header);
  layer_header.appendChild(lbl_quote);
  layer_results.appendChild(bg_results);
  layer_results.appendChild(bg_tweet_results);
  layer_results.appendChild(lbl_tweet);
  layer_results.appendChild(lbl_words_read);
  layer_results.appendChild(lbl_time_used);
  layer_results.appendChild(lbl_average_wpm);
  layer_results.appendChild(lbl_reading_comprehension);
  layer_results.appendChild(lbl_total_score);
  layer_results.appendChild(lbl_total_coins);
  layer_results.appendChild(btn_tweet_text);
  layer_results.appendChild(btn_view_progress);
  layer_results.appendChild(btn_menu_selection);
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
  scene_end_of_quiz.appendChild(layer_end_of_quiz);
  scene_end_of_quiz.appendChild(layer_header);
  scene_end_of_quiz.appendChild(layer_results);
  scene_end_of_quiz.appendChild(layer_difficulty);

  // load color on current difficulty 
  var color_current = "#4b4b4b";
  switch(current_game.difficulty) {
    case 11:
    case 10:
      if(current_game.difficulty == 10) {
        x1.setFill(color_current);
      }
      if(current_game.choices[9] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*13,0));
      }
    case 9:
      if(current_game.difficulty == 9) {
        h3.setFill(color_current);
      }
      if(current_game.choices[8] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*11,0));
      }
    case 8:
      if(current_game.difficulty == 8) {
        h2.setFill(color_current);
      }
      if(current_game.choices[7] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*10,0));
      }
    case 7:
      if(current_game.difficulty == 7) {
        h1.setFill(color_current);
      }
      if(current_game.choices[6] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*9,0));
      }
    case 6:
      if(current_game.difficulty == 6) {
        m3.setFill(color_current);
      }
      if(current_game.choices[5] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*7,0));
      }
    case 5:
      if(current_game.difficulty == 5) {
        m2.setFill(color_current);
      }
      if(current_game.choices[4] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*6,0));
      }
    case 4:
      if(current_game.difficulty == 4) {
        m1.setFill(color_current);
      }
      if(current_game.choices[3] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*5,0));
      }
    case 3:
      if(current_game.difficulty == 3) {
        e3.setFill(color_current);
      }
      if(current_game.choices[2] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*3,0));
      }
    case 2:
      if(current_game.difficulty == 2) {
        e2.setFill(color_current);
      }
      if(current_game.choices[1] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*2,0));
      }
    case 1:
      if(current_game.difficulty == 1) {
        e1.setFill(color_current);
      }
      if(current_game.choices[0] == 1) {
        layer_difficulty.appendChild(new lime.Circle().setSize(c_size,c_size).setAnchorPoint(0,0)
          .setFill("#138113").setPosition((c_size+c_padding)*1,0));
      }
  }

  hiddencloud.director.replaceScene(scene_end_of_quiz);

  goog.events.listen(btn_tweet_text, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
    window.answer_survey(current_game.benchmark_speed, awpm_here, rc_here);
    hiddencloud.Functions.tweetScore(e_awpm);
  });
  goog.events.listen(btn_menu_selection, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
    window.answer_survey(current_game.benchmark_speed, awpm_here, rc_here);
    hiddencloud.Modules.MenuSelection(gameObj);
  });
  goog.events.listen(btn_view_progress, ['mousedown', 'touchstart'], function(e) {
    gameObj.ui.click_button_au.play();
    window.answer_survey(current_game.benchmark_speed, awpm_here, rc_here);
    window.open("./progress.html","_blank");
    // hiddencloud.Modules.MenuSelection(gameObj);
  });


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