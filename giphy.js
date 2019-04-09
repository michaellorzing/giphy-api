var $searchInput = ""
var gifArray = ["Michael Jordan", "Kobe Bryant", "Ray Lewis", "Wayne Gretzky", "Tiger Woods", "Peyton Manning", "Drew Brees", "Derek Jeter"]
var apiKey = "NiZ8WIuEMsu0QheTz5m2ToaQ8v17Somq"
console.log(gifArray);
console.log($searchInput);



//create buttons from array
$(document).ready(function () {

//create a form that takes new search items and adds them to the array

  var $searchButton = $("#search-button");
  var $searchInput = $("#search-input");
  $searchButton.on("click", function (event) {
    event.preventDefault()
    if ($searchInput.val() === "") {
      alert("You have not made a valid selection");
    } else {
      var gifRequest = $searchInput.val().trim()
      gifArray.push(gifRequest);
      makeButtons();
    }
  })

  function makeButtons() {
    $("#button-pool").empty();
    for (var i = 0; i < gifArray.length; i++) {
      var $gifButton = $("<button>");
      $gifButton.addClass("gif-button btn btn-primary btn-lg mr-2 mt-2 flex-column");
      $gifButton.attr("data-name", gifArray[i]);
      $gifButton.text(gifArray[i]);
      $("#button-pool").append($gifButton)
    }
  }

  makeButtons();
  pause();

  

  //make request to api and display the gifs based on a button click

  $("button").on("click", function () {
    var sports = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r") {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var sportsGif = $("<img>");
            sportsGif.attr("src", results[i].images.fixed_width_downsampled.url);
            console.log(sportsGif);
            gifDiv.append(sportsGif);
            $("#gifDisplay").prepend(gifDiv);
          }
        }
      })

  })
  function pause(){
  $(".gif").on("click", function () {

    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  }
})