goog.provide('hiddencloud.Models');

// models.js store the object models that nimbusbase needs

hiddencloud.Models.Player = function() {
  // Players store the personal data of the users
  
  // initialize variables:
  this.last_name = "Last Name";
  this.first_name = "First Name";
  this.middle_name = "Middle Name";
  this.email_address = "email@website.org";
  this.gender = "Gender";
  this.cluster = "Computer Studies"
  this.department = "Information Technology";
  this.birth_date = Date();

  console.log('created player object: ' + this.last_name);
};

hiddencloud.Models.Book = function() {
  // Books are the texts that the reader application will read

  this.book_title = "Book Name";
  this.book_text = "Book text";
  this.book_url = "Book URL";
  this.date_created = Date();

  console.log('created book object: ' + this.book_title);
};

hiddencloud.Models.Score = function() {
  // Scores store the progress of each player
  
  this.score = 0;
  this.player = "";
  this.date_created = Date();
  
  console.log('created score object: ' + this.score);
};

hiddencloud.Models.Log = function() {
  // Logs store the progress of each player

  this.date_created = Date();

  console.log('created log object: ' + this.date_created);
}