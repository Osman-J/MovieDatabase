const API_KEY = "PASTE-YOUR-API-KEY-HERE";

const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();

const movieID = localStorage.getItem("movieID");
const actualMovieID = localStorage.getItem("actualMovieID");

const endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY;

const trailerEndpoint = `https://api.themoviedb.org/3/movie/${actualMovieID}/videos?api_key=${API_KEY}&language=en-US`;

const reviewsEndpoint = `https://api.themoviedb.org/3/movie/${actualMovieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`

const div=document.querySelector("#movieDiv");
const divContent = document.querySelector("#contentDiv");
const trailerDiv=document.querySelector("#trailerDiv");
const reviewDiv = document.querySelector("#reviewsDiv");

let trailerLink = `https://www.youtube.com/embed/`;
let trailerSettings = `?autoplay=0&controls=0&showinfo=0&autohide=1`;

let movieRating = document.createElement("p");
movieRating.id = "movieRatingID";

let trailerBtn = document.createElement("a");
trailerBtn.className = "btn";

let apiResponse;

fetchTrailer();
fetchAPI();
fetchReviews();

function fetchAPI()
{
  xhr.open("GET",endpoint);
  xhr.send();
  xhr.addEventListener("readystatechange",GetMovie);
}

function fetchTrailer()
{
  xhr2.open("GET", trailerEndpoint);
  xhr2.send();
  xhr2.addEventListener("readystatechange",GetTrailer);
}

function fetchReviews()
{
  xhr3.open("GET", reviewsEndpoint);
  xhr3.send();
  xhr3.addEventListener("readystatechange",GetReviews);
}

function GetReviews()
{
  if(xhr3.readyState == 4)
  {
    const jsonResponse = JSON.parse(xhr3.responseText);
    console.log("entering");
    for(let i = 0; i < jsonResponse.results.length; i++)
    {
      let div = document.createElement("div");
      let review = document.createElement("a");
      review.id = "reviewCard";
      review.setAttribute("href",`${jsonResponse.results[i].url}`);
      review.innerHTML = `${jsonResponse.results[i].author}`;

      div.appendChild(review);
      reviewDiv.appendChild(div);
    }
  }
}

function GetTrailer()
{
  if(xhr2.readyState == 4)
  {
    apiResponse = JSON.parse(xhr2.responseText);
    console.log(apiResponse.id);

    const frame = document.createElement("iframe");
    frame.setAttribute("frameBorder","0");
    frame.setAttribute("width","100%");
    frame.setAttribute("height","720");
    frame.setAttribute("src",`${trailerLink}${apiResponse.results[0].key}${trailerSettings}`);
    
    trailerBtn.setAttribute("href","#trailerDiv");

    trailerBtn.innerHTML = "Trailer";

    trailerDiv.appendChild(frame);
  }
}

function GetMovie()
{
  if(xhr.readyState == 4)
  {
    const jsonResponse = JSON.parse(xhr.responseText);

    const movieIMG = document.createElement("img");
      movieIMG.setAttribute("src", `https://image.tmdb.org/t/p/w185_and_h278_bestv2${jsonResponse.results[movieID].poster_path}`);

    const movieTitle = document.createElement("h4");
    movieTitle.innerHTML = `${jsonResponse.results[movieID].title}<hr>`;

    const movieSyopsis = document.createElement("p");
    movieSyopsis.innerHTML = jsonResponse.results[movieID].overview;

    let dateMovie = new Date(jsonResponse.results[movieID].release_date);
    let movieRelease = document.createElement("p");
    movieRelease.id = "releaseDateID";
    movieRelease.innerHTML = dateMovie.toDateString().replace(/^\S+\s/,'');
      
    let r = jsonResponse.results[movieID].vote_average;

    SetColor(r);

    let reviewsBtn = document.createElement("a");
    reviewsBtn.className = "btn";
    reviewsBtn.setAttribute("href","#reviewTitle");
    reviewsBtn.innerHTML = `Reviews`;

    div.appendChild(movieIMG);
    divContent.appendChild(movieTitle);
    divContent.appendChild(movieRelease);
    divContent.appendChild(movieRating);
    divContent.appendChild(movieSyopsis);
    divContent.appendChild(trailerBtn);
    divContent.appendChild(reviewsBtn);
    div.appendChild(divContent);
  }
}

function SetColor(r)
{
      if(r >= 0.0 && r <= 4.9)
      {
        movieRating.style.color = 'red';
        movieRating.innerHTML = r;
      }
      else if(r >= 5.0 && r <= 6.9)
      {
        movieRating.style.color = 'goldenrod';
        movieRating.innerHTML = r;

      }
      else if(r >= 7.0 && r <= 10.0)
      {
        movieRating.style.color = 'green';
        movieRating.innerHTML = r;
      }
}


