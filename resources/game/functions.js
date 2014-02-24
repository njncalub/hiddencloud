goog.provide('hiddencloud.Functions');

// goog.require('lime.GlossyButton');
goog.require('lime.Circle');

hiddencloud.Functions.load_all_books = function(gameObj) {
  console.log("called load_all_books() function.");

  Book.sync_all();
  Book.sync();
  all_books = Book.all();
  all_books.forEach(function(book) {
    console.log(book);
  });

  return all_books;
}

// hiddencloud.Functions.moveCircle = function(gameObj, the_circle) {
//   var pos_x = Math.floor((Math.random()*gameObj.width)+1);
//   var pos_y = Math.floor((Math.random()*gameObj.height)+1);

//   var move = new lime.animation.MoveTo(pos_x, pos_y).setDuration(0);
//   the_circle.runAction(move);
// }

hiddencloud.Functions.getMovingBallDT = function(awpm) {
  var benchmark_wpm = 400;
  var k = benchmark_wpm * benchmark_wpm;

  return k/awpm;
}


hiddencloud.Functions.moveCircle = function(gameObj, current_game, the_circle, position) {
  // var pos_x = Math.floor((Math.random()*gameObj.width)+1);
  // var pos_y = Math.floor((Math.random()*gameObj.height)+1);
  var pos_x = position[0];
  var pos_y = position[1];

  var move = new lime.animation.MoveTo(pos_x, pos_y).setDuration(0.2);
  the_circle.runAction(move);
}

hiddencloud.Functions.getTotalTime = function(timeArr) {
  var total_time = 0;
  for (var i = 0; i < timeArr.length; i++) {
    total_time += timeArr[i];
  }
  return total_time;
}

hiddencloud.Functions.getTotalWords = function(wordsArr) {
  var num_words = 0;
  for (var i = 0; i < wordsArr.length; i++) {
    num_words += wordsArr[i];
  }
  return num_words;
}

hiddencloud.Functions.decreaseTime = function(current_time, counter) {
  current_time -= 1;
  counter.setText(current_time);
  console.log(current_time);
  return current_time;
}

hiddencloud.Functions.increaseTime = function(current_time) {
  current_time += 1;
  // counter.setText(current_time);
  console.log("reading... time elapsed: " + current_time);
  return current_time;
}

hiddencloud.Functions.getRandomGenres = function(gameObj, current_game, genres, btn_genre1, btn_genre2, btn_genre3) {
  genres = [];
  var book_genre_uri = "http://hiddencloud.pythonanywhere.com/api/v1/book_genre/?format=json&" + hca_functions.auth_key;

  hca_functions.jax(book_genre_uri, 'GET').done(function (data) {
    var book_genres = [];
    for (var i = 0; i < data.objects.length; i++) {
      book_genres.push(data.objects[i]);
    }
    for (var i = 0; i < 3; i++) {
      var rand = hca_functions.getRandomArbitary(0, book_genres.length-1);
      var roll = book_genres.splice(rand, 1)[0]
      genres.push(roll);
    }
    console.log( genres );

    btn_genre1.setText(genres[0].genre);
    btn_genre2.setText(genres[1].genre);
    btn_genre3.setText(genres[2].genre);

    var book_text = {};
    var book_text_question = {};

    goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
      // console.log(genres[0]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[0], current_game.difficulty, book_text, book_text_question);
    });
    goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
      // console.log(genres[1]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[1], current_game.difficulty, book_text, book_text_question);
    });
    goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
      // console.log(genres[2]);
      hiddencloud.Functions.getRandomBookTextAndQuestion(gameObj, current_game, genres[2], current_game.difficulty, book_text, book_text_question);
    });

    return genres;
  });
}

hiddencloud.Functions.getRandomBookTextAndQuestion = function(gameObj, current_game, selected_genre, difficulty, book_text, book_text_question) {
  var book_text_questions = [];
  var book_text_question_uri = "http://hiddencloud.pythonanywhere.com/api/v1/book_text_question/?format=json&" + hca_functions.auth_key;

  var ea_wpm = 150;
  var me_wpm = 200;
  var ha_wpm = 250;
  var ex_wpm = 300;
  var tw_gte = 0;
  var tw_lte = 0;
  var s_difficulty = "";

  // console.log("current difficulty:");
  // console.log(difficulty);
  // console.log("selected genre:");
  // console.log(selected_genre);

  if ((difficulty >= 1) && (difficulty <=3)) {
    tw_gte = 0;
    tw_lte = ea_wpm;
    s_difficulty = "EA";
  }
  if ((difficulty >= 4) && (difficulty <=6)) {
    tw_gte = ea_wpm;
    tw_lte = me_wpm;
    s_difficulty = "ME";
  }
  if ((difficulty >= 7) && (difficulty <=9)) {
    tw_gte = me_wpm;
    tw_lte = ha_wpm;
    s_difficulty = "HA";
  }
  if ((difficulty >= 10) && (difficulty <=12)) {
    tw_gte = ha_wpm;
    tw_lte = ex_wpm;
    s_difficulty = "EX";
  }

  book_text_question_uri = book_text_question_uri + "&from_book_text__from_book__genre__slug=" + selected_genre.slug;
  book_text_question_uri = book_text_question_uri + "&limit=" + 0;
  // book_text_question_uri = book_text_question_uri + "&from_book_text__otal_words__gte=" + tw_gte;
  // book_text_question_uri = book_text_question_uri + "&from_book_text__total_words__lte=" + tw_lte;

  // console.log("chosen uri:");
  // console.log(book_text_question_uri);

  hca_functions.jax(book_text_question_uri, 'GET').done(function (data) {
    // console.log("went here");
    // get random text question
    var total = data.objects.length;
    var chosen_book_text_and_question = {};
    // get 1
    var chosen_text_id = Math.floor(hca_functions.getRandomArbitary(0, total-1))+1;
    // console.log("chosen_text_id: " + chosen_text_id);
    chosen_book_text_and_question = data.objects[chosen_text_id];

    // console.log(chosen_book_text_and_question);
    hiddencloud.Modules.ReadBookText(gameObj, current_game, chosen_book_text_and_question);

    // btn_genre1.setText(genres[0].genre);
    // btn_genre2.setText(genres[1].genre);
    // btn_genre3.setText(genres[2].genre);

    // goog.events.listen(btn_genre1, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[0]);
    // });
    // goog.events.listen(btn_genre2, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[1]);
    // });
    // goog.events.listen(btn_genre3, ['mousedown', 'touchstart'], function(e) {
    //   console.log(genres[2]);
    // });

    return chosen_book_text_and_question;
  });
}

hiddencloud.Functions.defineWord = function(gameObj, word) {
  var definitions;
  var search_uri = "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=" + gameObj.auth.wordnik;

  $.ajax({
    async: false,
    dataType: "json",
    url: search_uri,
    success: function(data) {definitions = data}
  });
  return definitions;
}

hiddencloud.Functions.getScoringWeight = function(choice, difficulty) {

  var mechanics = {
    EQ: 10.0,
    MQ: 12.0,
    HQ: 15.0,
    XQ: 20.0,

    ERC: 1.0,
    MRC: 1.3,
    HRC: 1.9,
    XRC: 2.5
  }

  var Q = 0; // question_weight
  var RC = 0; // right_choice_weight

  switch(difficulty) {
    case 10:
      Q = mechanics.XQ;
      RC = mechanics.XRC;
      break;
    case 9:
    case 8:
    case 7:
      Q = mechanics.HQ;
      RC = mechanics.HRC;
      break;
    case 6:
    case 5:
    case 4:
      Q = mechanics.MQ;
      RC = mechanics.MRC;
      break;
    case 3:
    case 2:
    case 1:
      Q = mechanics.EQ;
      RC = mechanics.ERC;
      break;
  }

  if (choice == "Q") {
    return Q;
  }
  if (choice == "RC") {
    return RC;
  }
  if (choice == "QRC") {
    return Q * RC;
  }
  return 0;
}

hiddencloud.Functions.getCorrectAnswers = function(choices) {
  var correct = 0;
  for(var i = 0; i < choices.length; i++){
    if(choices[i] == 1)
        correct++;
  }
  return correct;
}

hiddencloud.Functions.getScorePerRound = function(current_game) {
  var total_score = 0;
  var diff = current_game.difficulty;
  var num_c = 0;
      num_c = hiddencloud.Functions.getCorrectAnswers(current_game.choices);

  // add the tw, tt later
  for (var i = 0; i < diff; i++) {
    total_score += Math.floor(
      hiddencloud.Functions.getScoringWeight("QRC", i) * current_game.choices[i]
    );
  }

  return total_score;
}

hiddencloud.Functions.getTotalScore = function(current_game) {
  var total_score = 0;

  return total_score;
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
hiddencloud.Functions.shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

hiddencloud.Functions.getCorrectChoiceNumber = function(book_text_question) {
  var correct_choice = book_text_question.correct;

  switch(correct_choice) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
  }
}

hiddencloud.Functions.getChoiceNumber = function(book_text_question, number) {
  switch(number) {
    case 1:
      return book_text_question.choice_1;
    case 2:
      return book_text_question.choice_2;
    case 3:
      return book_text_question.choice_3;
    case 4:
      return book_text_question.choice_4;
    case 5:
      return book_text_question.choice_5;
    case 6:
      return book_text_question.choice_6;
  }
}

hiddencloud.Functions.randomizeBookChoicesButton = function(gameObj, current_game, book_text_question, btn_choice1, btn_choice2, btn_choice3) {
  console.log("went here -- randomize book choices button");

  var order = [1, 2, 3];
      order = hiddencloud.Functions.shuffleArray(order);
      // sample [2, 3, 1]

  var choices = [{},{},{}];
      choices[0] = hiddencloud.Functions.getChoiceNumber(book_text_question, order[0]);
      choices[1] = hiddencloud.Functions.getChoiceNumber(book_text_question, order[1]);
      choices[2] = hiddencloud.Functions.getChoiceNumber(book_text_question, order[2]);
  // sample [{2}, {3}, {1}]

  var correct_choice = order.indexOf(hiddencloud.Functions.getCorrectChoiceNumber(book_text_question)) + 1;

  // console.log("order: ");
  // console.log(order);
  // console.log("choices: ");
  // console.log(choices);
  // console.log("correct choice=" + correct_choice);

  btn_choice1.setText(choices[0]);
  btn_choice2.setText(choices[1]);
  btn_choice3.setText(choices[2]);

  goog.events.listen(btn_choice1, ['mousedown', 'touchstart'], function(e) {
    if (correct_choice == 1) {
      console.log("correct answer!");
      current_game.choices.push(1);
    }
    else {
      console.log("wrong answer!");
      current_game.choices.push(0);
    }
    hiddencloud.Modules.ChooseGenre(gameObj, current_game);
    // console.log("clicked button 1 with choice number " + order[0]);
    // hiddencloud.Modules.ChooseGenre(gameObj, current_game);
  });

  goog.events.listen(btn_choice2, ['mousedown', 'touchstart'], function(e) {
    if (correct_choice == 2) {
      console.log("correct answer!");
      current_game.choices.push(1);
    }
    else {
      console.log("wrong answer!");
      current_game.choices.push(0);
    }
    hiddencloud.Modules.ChooseGenre(gameObj, current_game);
    // hiddencloud.Modules.ChooseGenre(gameObj, current_game);
  });

  goog.events.listen(btn_choice3, ['mousedown', 'touchstart'], function(e) {
    if (correct_choice == 3) {
      console.log("correct answer!");
      current_game.choices.push(1);
    }
    else {
      console.log("wrong answer!");
      current_game.choices.push(0);
    }
    hiddencloud.Modules.ChooseGenre(gameObj, current_game);
    // hiddencloud.Modules.ChooseGenre(gameObj, current_game);
  });
}

hiddencloud.Functions.getWPM = function(current_game, start_i, end_i) {
  var wpm = 0;

  for(var i = start_i; i < end_i; i++) {
    wpm += Math.round(current_game.total_words[i]/(current_game.total_time[i]/60));
  }

  // console.log("wpm: " + wpm);

  return wpm/(end_i-start_i);
}

hiddencloud.Functions.getScore = function(current_game, d) {
  // score = awpm[i] * current_game.choices[i];
  var score = 0;

  for(var i = 0; i < d; i++) {
    if(i >= d) {
      break;
    }
    // console.log("-------------------");
    // console.log("i = " + i);
    // console.log("d = " + d);
    // console.log("hiddencloud.Functions.getWPM(current_game, i, i+1)");
    // console.log(hiddencloud.Functions.getWPM(current_game, i, i+1));
    // console.log("current_game.choices[i]");
    // console.log(current_game.choices[i]);
    var this_score = hiddencloud.Functions.getWPM(current_game, i, i+1) * current_game.choices[i];
    // console.log("this_score");
    // console.log(this_score);
    score += this_score;
  }

  return score;
}

hiddencloud.Functions.getReadingComprehension = function(choices) {
  return (hiddencloud.Functions.getCorrectAnswers(choices) / choices.length)*100.0;
}

hiddencloud.Functions.getTotalCoins = function(total_score) {
  var coins = 0;
  var points_per_coin = 250;

  // 1 coins = 250 points
  coins = Math.floor(total_score / points_per_coin);

  return coins;
}

hiddencloud.Functions.tweetScore = function(current_game, awpm, rc) {

  var url = "https://twitter.com/intent/tweet?source=webclient&text=I%20can%20read%20" + awpm +"%20WPM%20and%20have%20an%20average%20" + rc + "%25%20comprehension!%20Test%20your%20speed%20now!%20%23hiddencloudacademy%20http%3A%2F%2Fj.mp/hiddencloud";

  var win=window.open(url, '_blank');
  win.focus();
}

hiddencloud.Functions.getRandomBookData = function() {
  var books = [];

  books.push({"title":"Harry Potter and the Philosopher's Stone","total_words":76944});
  books.push({"title":"Harry Potter and the Chamber of Secrets","total_words":85141});
  books.push({"title":"Harry Potter and the Prisoner of Azkaban","total_words":107253});
  books.push({"title":"Harry Potter and the Goblet of Fire","total_words":190637});
  books.push({"title":"Harry Potter and the Order of the Phoenix","total_words":257045});
  books.push({"title":"Harry Potter and the Half-Blood Prince","total_words":168923});
  books.push({"title":"Harry Potter and the Deathly Hallows","total_words":198227});
  // books.push({"title":"","total_words":});

  books = hiddencloud.Functions.shuffleArray(books);
  return books[0];
}

hiddencloud.Functions.analyzeResults = function(current_game, awpm) {
  var book = hiddencloud.Functions.getRandomBookData();
  return {};
}