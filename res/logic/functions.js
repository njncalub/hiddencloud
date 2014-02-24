window.hca_functions = (function() {
  // declare site-wide methods

  var hca_functions = {};

  hca_functions.auth_key = "username=hiddencloud&api_key=2fd6cc46978f77484599261d171c56e4f810d2ba";
  hca_functions.current_profile = {};

  hca_functions.async = function (fn, callback) {
    // emulates an asynchronus function
    // from: http://www.benlesh.com/2012/05/calling-javascript-function.html

    setTimeout(function() {
        fn();
        if (callback) { callback();}
    }, 0);
  }

  hca_functions.get_querystring = function(qs) {
    // get querystring value from current url
    // from: https://developer.mozilla.org/en-US/docs/Web/API/window.location
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(qs).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  hca_functions.get_nb_user_profile_id = function() {
    // get nimbusbase user profile ids
    var nb_user_profile_id = "";

    return nb_user_profile_id;
  }

  hca_functions.sync_model = function(obj_name) {

    // sync nimbusbase objects
    switch(obj_name) {
      case "all":
        Player.sync_all(function(){ console.log("Player is synced"); });
        Book.sync_all(function(){ console.log("Book is synced"); });
        Score.sync_all(function(){ console.log("Score is synced"); });
        Player.sync_all();
        console.log("finished syncing all");
        break;
      case "player":
        Player.sync_all(function(){ console.log("Player is synced") });
        console.log("finished syncing player");
        break;
      case "book":
        Book.sync_all(function(){ console.log("Book is synced") });
        console.log("finished syncing book");
        break;
      case "score":
        Score.sync_all(function(){ console.log("Score is synced") });
        console.log("finished syncing score");
        break;
    }
  }

  hca_functions.has_user_profile = function() {
    var has_user_profile = false;
    var user_profile;

    if (Player.count() > 0) {
      console.log("checking: has user profile");
      has_user_profile = true;
    }
    else {
      console.log("checking: has no user profile");
      hca_functions.sync_model("player");
      // check window.current_player
      // create user profile
      if (window.current_profile !== undefined) {
        has_user_profile = true;
        console.log("checked again: has user profile");
      }
    }

    return has_user_profile;
  }

  hca_functions.ajax = function(uri, method, data) {
    // prepare new ajax request
    // from: http://blog.miguelgrinberg.com/post/writing-a-javascript-rest-client
    var request = {
      url: uri,
      type: method,
      contentType: "application/json",
      accepts: "application/json",
      cache: false,
      dataType: 'json',
      data: JSON.stringify(data),
      error: function(jqXHR) {
        console.log("ajax error " + jqXHR.status);
      }
    };
    return $.ajax(request);
  }

  hca_functions.jax = function(uri, method, data) {
    // prepare new ajax request (async: false)
    // will finish first before continuing
    // from: http://blog.miguelgrinberg.com/post/writing-a-javascript-rest-client
    var request = {
      async: false,
      url: uri,
      type: method,
      contentType: "application/json",
      accepts: "application/json",
      cache: false,
      dataType: 'json',
      data: JSON.stringify(data),
      error: function(jqXHR) {
        console.log("ajax error " + jqXHR.status);
      }
    };
    return $.ajax(request);
  }

  hca_functions.get_server_profile = function(uid) {
    var profile_uri = "http://hiddencloud.pythonanywhere.com/api/v1/user_profile/?format=json&" + hca_functions.auth_key + "&uid=" + uid;
    // window.current_profile = Player.last();

    hca_functions.jax(profile_uri, 'GET').done(function (data) {
        window.current_profile.resource_uri = "http://hiddencloud.pythonanywhere.com" + data.objects[0].resource_uri;
        window.current_profile.save();
        console.log( window.current_profile );
    });
  }

  hca_functions.getRandomArbitary = function(min, max) {
    return Math.random() * (max - min) + min;
  }

  hca_functions.get_book_genre = function() {
    var book_genre_uri = "http://hiddencloud.pythonanywhere.com/api/v1/book_genre/?format=json&" + hca_functions.auth_key;

    hca_functions.jax(book_genre_uri, 'GET').done(function (data) {
      window.book_genres = [];
      for (var i = 0; i < data.objects.length; i++) {
        window.book_genres.push(data.objects[i]);
      }
      console.log( window.book_genres );
    });
  }

  hca_functions.send_profile = function(player_profile) {
    var pdata = {
      "uid": player_profile.id,
      "last_name": player_profile.last_name,
      "first_name": player_profile.first_name,
      "middle_name": player_profile.middle_name,
      "email_address": player_profile.email_address,
      "gender": player_profile.gender,
      "cluster": player_profile.cluster,
      "current_year": player_profile.current_year,
      "department": player_profile.department,
      "birth_date": player_profile.birth_date
    };

    if (typeof window.current_profile !== "undefined") {
      if (typeof window.current_profile.resource_uri !== "undefined") {
        var profile_uri = window.current_profile.resource_uri + "?" + hca_functions.auth_key;

        hca_functions.ajax(profile_uri, 'PUT', pdata).done(function(data) {
          console.log("PUT profile");
        });
      }
      else {
        var profile_uri = "http://hiddencloud.pythonanywhere.com/api/v1/user_profile/" + "?" + hca_functions.auth_key;

        hca_functions.jax(profile_uri, 'POST', pdata).done(function(data) {
          console.log("POST profile");
          hca_functions.get_server_profile(window.current_profile.uid);
        });
      }
    }
  }

  hca_functions.send_game_result = function(result) {
    
  }

  return hca_functions;

}());