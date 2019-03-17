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
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});


//--------------------------------------------------Add poster images to movies using movieDB database------------------------------//


function addImage() {

    const film = $('#movieTitle').val();

    if (film === '') {

        //Empty input submission
        $('#movieTitle').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

    } else {


        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function (json) {

            //If successful
            if (json !== "Nothing found.") {


                //Append movie title and movie img

                console.log(typeof json.results);
                $('.earth-container').append(json.results[0].title + '<img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');


                //Existing movie, so add to database
                add_Movie();



            }


        })

    }

    //If movie doesnt exist
    return false;

}

//--------------------------------Add movie to the databse after add Image is successful using post----------------------------------//


//

function add_Movie() {
    const movie_info = {title: $('#movieTitle').val(), rating: $('#movieRating').val()};
    //url to the database
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


//Tie it to the grid system.

function deleteMovie() {


    $.get("/api/movies").done(function (data){
        console.log(data[0].id);
        //url to the database
        const url = '/api/movies';
        const options = {
            method: 'DELETE',
        };
        fetch(url, options)
            .then(console.log("post was created successfully"))
            .catch(console.log(" handle errors "));
    })
}







/*--Sumbit button for submitting movies to the database---------------------------------------------------------------------------------------- */

$('#mSubmit').click(
    function () {
        addImage();

    }
)


$('#delete').click(
    function () {
        deleteMovie();

    }
)


/*---------------------------------------------------Appending movies/Displaying Movies---------------------------------------------------- */




$.get("/api/movies").done(function (data) {

    data.forEach(function (data) {

        const film = data.title;

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function (json) {


            console.log(json.results[0].poster_path);
            $('.display-movies').append('<div class="earth">' +
                '<div class="earth-wrapper">' +
                '<div class="earth-container">' +
                '<div class="posterImage">' + $('.earth-container').append(data.title + '<img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >') + '</div>'
                + '</div>');


        });

    });
})





