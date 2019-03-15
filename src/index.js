/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

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
        add_Movie();
    }
);

/*------------------------------------------------------------------------------------------ */


// "title": "Ajax Requests",
//     "body": "Are a fun way to use JS!",
//     "id": 4

// console.log(data.title);

//

var poster = $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb");
console.log(poster);

$.get("/api/movies").done(function (data) {

    data.forEach(function (data) {

        $('.movieDisplay').append('<div class="column">' +
            '<div class="moviePoster">' + '</div>' +
            '<h3>' + data.title+ '</h3>' +
            '</div>');

    })


});

