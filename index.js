const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

        
        function createMovieElements(movies) {
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = ''; 

            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                
                const imgElement = document.createElement('img');
                imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                imgElement.alt = movie.title;
                movieElement.appendChild(imgElement);

                
                const infoElement = document.createElement('div');
                infoElement.classList.add('movie-info');
                movieElement.appendChild(infoElement);

                
                const titleElement = document.createElement('h2');
                titleElement.textContent = movie.title;
                infoElement.appendChild(titleElement);

                const dateElement = document.createElement('h3');
                dateElement.textContent = movie.release_date;
                titleElement.appendChild(dateElement);

                const popuElement = document.createElement('h4');
                popuElement.textContent = movie.popularity;
                titleElement.appendChild(popuElement);

                
                const descriptionElement = document.createElement('p');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = movie.overview;
                infoElement.appendChild(descriptionElement);

                movieList.appendChild(movieElement);

                
                movieElement.addEventListener('mouseenter', () => {
                    infoElement.style.opacity = '1';
                });

                movieElement.addEventListener('mouseleave', () => {
                    infoElement.style.opacity = '0';
                });
            });
        }

        // Function to fetch movie data
        function fetchMoviesAndDisplay(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => data.results)
                .then(createMovieElements)
                .catch(error => console.error('Error fetching data:', error));
        }

        // Initial page load
        fetchMoviesAndDisplay(apiUrl);

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.trim().toLowerCase();
            if (searchTerm !== '') {
                const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
                fetchMoviesAndDisplay(searchUrl);
            } else {
                fetchMoviesAndDisplay(apiUrl);
            }
        });