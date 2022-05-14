const xhr = new XMLHttpRequest();
const API_KEY = "PASTE-YOUR-API-KEY-HERE";
const endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY;


fetchAPI();

function fetchAPI()
{
  xhr.open("GET",endpoint);
  xhr.send();
  xhr.addEventListener("readystatechange",GetMovies);
}

function GetMovies()
{
  if(xhr.readyState == 4)
  {
    const jsonResponse = JSON.parse(xhr.responseText);

    for(let i = 0; i < jsonResponse.results.length; i++)
    {
      const div = document.createElement("div");
      movieSection.appendChild(div);

      let movieIMG = document.createElement("img");
      movieIMG.setAttribute("src", `https://image.tmdb.org/t/p/w185_and_h278_bestv2${jsonResponse.results[i].poster_path}`);

      let movieTitle = document.createElement("h4");
      movieTitle.innerHTML = `${jsonResponse.results[i].title}`;

      let movieSyopsis = document.createElement("p");
      movieSyopsis.innerHTML = jsonResponse.results[i].overview;
      
      let dateMovie = new Date(jsonResponse.results[i].release_date);
      let movieRelease = document.createElement("p");
      movieRelease.id = "releaseDateID";
      movieRelease.innerHTML = dateMovie.toDateString().replace(/^\S+\s/,'');

      let movieRating = document.createElement("p");
      movieRating.id = "movieRatingID";
      let r = jsonResponse.results[i].vote_average;

      if(r >= 0.0 && r <= 4.9)
      {
        movieRating.style.color = 'red';
        movieRating.innerHTML = `${jsonResponse.results[i].vote_average}`;
      }
      else if(r >= 5.0 && r <= 6.9)
      {
        movieRating.style.color = 'goldenrod';
        movieRating.innerHTML = `${jsonResponse.results[i].vote_average}`;
      }
      else if(r >= 7.0 && r <= 10.0)
      {
        movieRating.style.color = 'green';
        movieRating.innerHTML = `${jsonResponse.results[i].vote_average}`;
      }
          
      div.appendChild(movieIMG);
      div.appendChild(movieTitle);
      div.appendChild(movieRelease);
      div.appendChild(movieSyopsis);
      div.appendChild(movieRating);

      
      movieIMG.addEventListener("click", function()
      {

        localStorage.setItem("movieID",i);
        localStorage.setItem("actualMovieID",jsonResponse.results[i].id);
        window.location.href = "Details.html";
        
      });
    }
  }
}


