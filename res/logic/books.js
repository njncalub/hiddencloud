(function() {

  function initialise() {
    window.refresh_books();
    console.log("went here!1");
    $(".book-li").on( "click", function(event) {
      // console.log("went here!2");
      console.log(event.target.id);
      window.load_book(event.target.id);
    });
  };

  // Redirect to main page if already authorized:
  $(document).ready(function() {
    initialise();
    // var button = Dropbox.createChooseButton(options);
    // document.getElementById("container").appendChild(button);

    

    // file = {
    //   // Name of the file.
    //   name: "filename.txt",

    //   // URL to access the file, which varies depending on the linkType specified when the
    //   // Chooser was triggered.
    //   link: "https://...",

    //   // Size of the file in bytes.
    //   bytes: 464,

    //   // URL to a 64x64px icon for the file based on the file's extension.
    //   icon: "https://...",

    //   // A thumbnail URL generated when the user selects images and videos.
    //   // If the user didn't select an image or video, no thumbnail will be included.
    //   thumbnailLink: "https://...?bounding_box=75&mode=fit",
    // };


  });

  // $(document).ajaxComplete(function() {
  //   console.log('ajaxComplete() called.');
  // });

}).call(this);