const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            value = this.responseText;
            callback(value);
        } else {
            console.log(this.status);
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

document.getElementById("search-button").addEventListener('click', function(e) {

    let usr = document.getElementById("search-review").value;
    let url = "/user-records?userName=" + usr; 
    ajaxGET(url, function(table) {
        document.getElementById("records-container").innerHTML = table;
    })
});

window.addEventListener("load", function(){
    const template = document.getElementById("movie-container").content;
    ajaxGET("/movies",function(data){
        let parsedData = JSON.parse(data);

        parsedData.movies.forEach(movie => {
            let movieCard = template.cloneNode(true);

            movieCard.querySelector("img").src = movie.image;
            movieCard.querySelector(".movie-name").textContent = movie.name;
            movieCard.querySelector(".movie-date").textContent = movie.date;
            movieCard.querySelector(".movie-time").textContent = movie.time;
            movieCard.querySelector(".movie-director").textContent = movie.director;
            movieCard.querySelector(".movie-discription").textContent = movie.type;

            document.getElementById("movies-go-here").appendChild(movieCard);
        })

    });
});

window.addEventListener("load", function(){
    ajaxGET("/comingsoon", function(data){
        document.getElementById("table-goes-here").innerHTML = data;
    });
})

