// Initial array of animals
      var topics = ["Dogs", "Cats", "Otters", "Red Pandas"];

      // displayGifInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {

        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zd12mHAtRAtU8VMjnD9Y5o2q26831qtq&q=" + topics + "&limit=10&offset=0";

        // Creates AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          for (var i = 0; i < 10; i++) {

          // Creates a div to hold the animal
          var animaldiv = $('<div>');

          // Retrieves the Rating Data
          // Creates an element to have the ratings displayed
          // Displays the ratings
          $(animaldiv).append('<div>' + "Rating: " + response.data[i].rating + '</div>');

          //Retrieves the Images data
          // Creates an element to have the images displayed
          // Displays the images
          $(animaldiv).append('<img src="' + response.data[i].images.fixed_width_still.url + '"/>')
          
          // Puts the entire animal gif above the previous animals.
          $('#animals').prepend(animaldiv)
        }

        });

      }

      // Function for displaying gif data
      function renderButtons() {

        // Deletes the animal prior to adding new animals
        $("#animalButtons").empty();

        // Loops through the array of animals
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");

          // Adds a class of animals to our button
          a.addClass("animals");

          // Added a data-attribute
          a.attr("data-name", topics[i]);

          // Provided the initial button text
          a.text(topics[i]);

          // Added the button to the buttons-view div
          $("#animalButtons").append(a);

        }
      }

      // This function handles events where the add animal button is clicked
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var topic = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
        
      });

      // Adding click event listeners to all elements with a class of "animals"
      //Event Delegation in jQuery - Important
      $(document).on("click", ".animals", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();