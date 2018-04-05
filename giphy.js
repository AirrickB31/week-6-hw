$(document).ready(function() {
    //Array of Comedians

     var comics = ['Dave Chappelle', 'Richard Pryor', 'Andy Kaufman', 'Eddie Murphy', 'Sara Silverman', 'George Carlin', 'Ellen Degeneres', 'Chris Rock', 'Jerry Seinfeld', 'Amy Schumer', 'Mitch Hedberg', 'Gabriel Inglesias', 'Joan Rivers', 'Rodney Dangerfield'];

   
    function createButton(){
        for (var i = 0; i < comics.lenght; i++){
            var b = $('<button .btn-info>');
            b.addClass('comedian');
            b.attr('data-name', comics[i]);
            b.text(comics[i]);
            b.attr('data-state', $(this).attr('data-state', 'animate'));
            $('#comedianButton').append(b);
        }
    }

    $('#addComedian').on('click', function(){
        var comedian = $('comedian-input').val();
        comics.push(comedian);
        createButton();
        return false;
    });

    createButton();

    //Listening for the button clicks
    $(document).on('click', '.comedian', function(){
        var comedian = $(this).data('name');
        console.log(comedian);
    })

    //Giphy var for api 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comics + "&api_key=GGpwWo5C42EQniA9VpuHRxPQJw9xWVM0&limit=10offset=0&rating=G&lang=en";
    console.log(queryURL);

    $.ajax({url:queryURL, method: "GET"})
    .then(function(response){
      console.log(response);

      var results = response.data;
      $("#comedianGifs").empty();  


      for (var i = 0; i < results.length; i++) { 
        var comedianDiv = $('<div id="comedianDiv">');
        var p = $('<p>').text("Rating: " + results[i].rating);
        var comedianImage = $('<img>');
        comedianImage.attr('src', results[i].images.fixed_height_still.url);
        comedianImage.attr('data-still', results[i].images.fixed_height_still.url);
        comedianImage.attr('data-animate', results[i].images.fixed_height.url);
        comedianImage.attr('class', 'comedianImage');
        comedianImage.attr('data-state', 'still');
        comedianDiv.append(p);
        comedianDiv.append(comedianImage);
        $('comedainGifs').prepend(comedianDiv);
  
      }
    });
      $(document).on('click', '.comedianImage', function(){
        //get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
         // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
        if (state === 'still') {
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
        }
      });
});