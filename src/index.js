/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */


//------------------------------------------------------console log database----------------------------------------------------------//
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    //console.log('Here are all the movies:');


    movies.forEach(({title, rating, id}) => {
     console.log(`id#${id} - ${title} - rating: ${rating}`);



        //$(".dataBase").append('<div>'+ id + title + '<span class="fa fa-star one1 two2 tree3 four4 five5"></span>'+'<span class="fa fa-star two2 tree3 four4 five5"></span>'+'<span class="fa fa-star tree3 four4 five5"></span>'+'<span class="fa fa-star four4 five5"></span>'+'<span class="fa fa-star five5"></span>' + '</div>')
        $(".dataBase").append(`<div> ${id} ${title}<span class="star-${rating}"></span></div>`)




    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});



//--------------------------------------------------Add poster images to movies using movieDB database------------------------------//


function addImage () {

    const film = $('#movieTitle').val();

    if(film === ''){

        //Empty input submission
        $('#movieTitle').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

    } else {


        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function (json) {

            //If successful
            if (json != "Nothing found.") {
                console.log(json);

            // stars
                 let rating = Math.round((json.results[0].vote_average)/2);
                console.log(rating);
                if (rating === 1){
                    $(".one").addClass( "checked" );

                } else if (rating === 2){
                    $(".two").addClass( "checked" );

                } else if (rating === 3){
                    $(".tree").addClass( "checked" );

                } else if (rating === 4){
                    $(".four").addClass( "checked" );

                } else if(rating === 5 ){
                    $(".fa").addClass( "checked" );

                }

                $('.earth-container').append('<p><strong>' + json.results[0].title +'</strong></p>'+ '<span class="fa fa-star one two tree four"></span>'+'<span class="fa fa-star two tree four"></span>'+'<span class="fa fa-star tree four"></span>'+'<span class="fa fa-star four"></span>'+'<span class="fa fa-star five"></span>' +'<img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');

                add_Movie();

            } else {
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=goonies&callback=?", function(json) {

                    console.log(json);
                    $('#poster').html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
                });
            }

        })

    }

    return false;






}

//Add movie to the databsed after



function add_Movie() {
    const movie_info = {title: $('#movieTitle').val(), rating: $('#movieRating').val()};
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie_info),
    };
    fetch(url, options)
        .then(console.log("post was created successfully"))
        .catch(console.log(" handle errors "));
}

/*--Sumbit button for submitting movies to the backend---------------------------------------------------------------------------------------- */

$('#mSubmit').click(
    function () {
        addImage();
       // $(".fa").removeClass( "checked" );

    }
);

/*------------------------------------------------------------------------------------------ */


// "title": "Ajax Requests",
//     "body": "Are a fun way to use JS!",
//     "id": 4

// console.log(data.title);

//


$.get("/api/movies").done(function (data) {

    data.forEach(function (data) {

        $('.display-movies').append('<div class="earth">' +
            '<div class="earth-wrapper">' +
                '<div class="earth-container">'  +
            data.title
            +'</div>');

    })


});


//hi