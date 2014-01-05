goog.provide('hiddencloud.Models');

// models.js store the object models that nimbusbase needs

hiddencloud.Models.Cluster = function() {
  // Cluster is the data model for the clusters of the player

  var cluster_choices = [
    {
      "cluster":"Accountancy",
      "short_name":"ACC",
      "departments":[
        {
          "short_name":"BSA",
          "department":"Bachelor of Science in Accountancy",
        },
        {
          "short_name":"BS AcT",
          "department":"Bachelor of Science in Accounting Technology",
        },
      ],
    },
    {
      "cluster":"Business and Management",
      "short_name":"BM",
      "departments":[
        {
          "short_name":"BSBM",
          "department":"Bachelor of Science in Business Management",
        },
        {
          "short_name":"BS ENTREP",
          "department":"Bachelor of Science in Entrepreneurship",
        },
        {
          "short_name":"BS FIN",
          "department":"Bachelor of Science in Finance",
        },
        {
          "short_name":"BS HRM",
          "department":"Bachelor of Science in Human Resource Management",
        },
        {
          "short_name":"BS MKTG",
          "department":"Bachelor of Science in Marketing",
        },
      ],
    },
    {
      "cluster":"Computer Studies",
      "short_name":"CS",
      "departments":[
        {
          "short_name":"BS CS",
          "department":"Bachelor of Science in Computer Science",
        },
        {
          "short_name":"BS IS",
          "department":"Bachelor of Science in Information Systems",
        },
        {
          "short_name":"BS IT",
          "department":"Bachelor of Science in Information Technology",
        },
      ],
    },
    {
      "cluster":"Education",
      "short_name":"EDUC",
      "departments":[
        {
          "short_name":"BEED",
          "department":"Bachelor of Elementary Education - General",
        },
        {
          "short_name":"BEED-PS",
          "department":"Bachelor of Elementary Education - Preschool",
        },
        {
          "short_name":"BSED-ENGLISH",
          "department":"Bachelor of Secondary Education Major in English",
        },
        {
          "short_name":"BSED-MATH",
          "department":"Bachelor of Secondary Education Major in Math",
        },
        {
          "short_name":"BSED-PHYS",
          "department":"Bachelor of Secondary Education Major in Physical Sciences",
        },
        {
          "short_name":"BSED-SS",
          "department":"Bachelor of Secondary Education Major in Social Studies",
        },
        {
          "short_name":"BSED-BIO",
          "department":"Bachelor of Secondary Education Major in Biological Sciences",
        },
      ],
    },
    {
      "cluster":"Engineering and Architecture",
      "short_name":"EA",
      "departments":[
        {
          "short_name":"BS Arch",
          "department":"Bachelor of Science in Architecture",
        },
        {
          "short_name":"BS CE",
          "department":"Bachelor of Science in Civil Engineering",
        },
        {
          "short_name":"BS Comp Eng",
          "department":"Bachelor of Science in Computer Engineering",
        },
        {
          "short_name":"BS ChE",
          "department":"Bachelor of Science in Chemical Engineering",
        },
        {
          "short_name":"BS ECE",
          "department":"Bachelor of Science in Electronics and Communications Engineering",
        },
        {
          "short_name":"BS EE",
          "department":"Bachelor of Science in Electrical Engineering",
        },
        {
          "short_name":"BS IE",
          "department":"Bachelor of Science in Industrial Engineering",
        },
        {
          "short_name":"BS ME",
          "department":"Bachelor of Science in Mechanical Engineering",
        },
      ],
    },
    {
      "cluster":"Humanities and Letters",
      "short_name":"HUMLET",
      "departments":[
        {
          "short_name":"AB ENG",
          "department":"Bachelor of Arts in English",
        },
        {
          "short_name":"AB MC",
          "department":"Bachelor of Arts in Mass Communication",
        },
        {
          "short_name":"AB PHILO",
          "department":"Bachelor of Arts Major in Philosophy",
        },
      ],
    },
    {
      "cluster":"Natural Sciences and Mathematics",
      "short_name":"NSM",
      "departments":[
        {
          "short_name":"BS BIO",
          "department":"Bachelor of Science in Biology",
        },
        {
          "short_name":"BS CHEM",
          "department":"Bachelor of Science in Chemistry",
        },
        {
          "short_name":"BS MATH",
          "department":"Bachelor of Science in Mathematics",
        },
        {
          "short_name":"BS ENVI SCI",
          "department":"Bachelor of Science in Environmental Science",
        },
      ],
    },
    {
      "cluster":"Nursing",
      "short_name":"CON",
      "departments":[
        {
          "short_name":"BSN",
          "department":"Bachelor of Science in Nursing",
        },
        
      ],
    },
    {
      "cluster":"Social Sciences",
      "short_name":"SS",
      "departments":[
        {
          "short_name":"AB ECON",
          "department":"Bachelor of Arts in Economics",
        },
        {
          "short_name":"AB IS-AMST",
          "department":"Bachelor of Arts in International Studies - Major in American Studies",
        },
        {
          "short_name":"AB IS-ASST",
          "department":"Bachelor of Arts in International Studies - Major in Asian Studies",
        },
        {
          "short_name":"AB POLSCI",
          "department":"Bachelor of Arts in Political Science",
        },
        {
          "short_name":"AB PSYCH",
          "department":"Bachelor of Arts in Psychology",
        },
        {
          "short_name":"AB SOCIO",
          "department":"Bachelor of Arts in Sociology",
        },
        {
          "short_name":"BSSW",
          "department":"Bachelor of Science in Social Work",
        },
      ],
    },
  ]; // /cluster_choices
};

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

hiddencloud.Models.LogBook = function() {
  // LogBook stores the log of each player

  this.date_created = Date();

  console.log('created log object: ' + this.date_created);
};