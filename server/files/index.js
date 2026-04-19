window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
           const article = document.createElement('article')
           article.setAttribute("id", movie.imdbID)

            const moviePoster = document.createElement('div')
            moviePoster.setAttribute("class", "article-img")
            
            // Poster
            const poster = document.createElement('img')
            poster.src = movie.Poster
            poster.alt = movie.Title + ' poster'

            const movieInfo = document.createElement('div')

            // Title
            const title = document.createElement('h2')
            title.textContent = movie.Title

            const releasedAndRuntime = document.createElement('p')

            // Released
            const released = document.createElement('time')
            released.setAttribute("class", "info-span")
            released.setAttribute('datetime', movie.Released)
            released.textContent = new Date(movie.Released).toLocaleDateString('en-GB', {
                year: 'numeric', month: 'long', day: 'numeric'
            })

            // Runtime
            const runtime = document.createElement('span')
            runtime.textContent = movie.Runtime + ' min'

            releasedAndRuntime.append(released, runtime)

            const genres = document.createElement('p')
            // Genres
            movie.Genres.forEach(function (genre) {
                const genreTag = document.createElement('span')
                genreTag.setAttribute("class", "genre-tag")
                genreTag.textContent = genre
                genres.append(genreTag)
            })

            // Directors
            const directors = document.createElement('p')
            directors.textContent = 'Directed by: ' + movie.Directors.join(', ')

            // Writers
            const writers = document.createElement('p')
            writers.textContent = 'Written by: ' + movie.Writers.join(', ')

            // Actors
            const actorsLabel = document.createElement('p')
            actorsLabel.textContent = 'Starring:'

            const actorsList = document.createElement('ul')
            movie.Actors.forEach(function (name) {
                const li = document.createElement('li')
                li.textContent = name
                actorsList.appendChild(li)
            })

            // Plot
            const plot = document.createElement('p')
            plot.setAttribute("class", "plot")
            plot.textContent = movie.Plot

            const rating = document.createElement('p')

            // Metascore
            const metascore = document.createElement('span')
            metascore.setAttribute("class", "rating")
            metascore.textContent = 'Metascore: ' + movie.Metascore + ' / 100'

            // IMDb Rating
            const imdbRating = document.createElement('span')
            imdbRating.setAttribute("class", "rating")
            imdbRating.textContent = 'IMDb: ' + movie.imdbRating + ' / 10'

            rating.append(metascore, imdbRating)

            // Edit Button
            const editButton = document.createElement('button')
            editButton.textContent = 'Edit'
            editButton.addEventListener('click', function () {
              console.log('Edit clicked for', movie.imdbID)
              location.href = 'edit.html?imdbID=' + movie.imdbID
            })

            moviePoster.append(poster)
            movieInfo.append(title, releasedAndRuntime, genres, directors, writers, actorsLabel, actorsList, plot, rating, editButton)
            article.append(moviePoster, movieInfo)
            bodyElement.append(article)
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
