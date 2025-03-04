document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    const form = document.querySelector('#search-form');
    const input = document.querySelector('#search-input');
    const API_Key = "ed547943b8b53b39df5491ac63145639";
    const BASE_PATH = "https://image.tmdb.org/t/p/original";
    const resultsSection = document.querySelector('#results');
    const resultsGrid = document.querySelector('#results-grid');

    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h5').textContent;
            alert(`You clicked on ${title}!`);
        });
    });

    const watchButton = document.querySelector('.watch-btn');
    watchButton.addEventListener('click', () => {
        alert('Starting your streaming experience!');
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = input.value.trim();
        if (!searchTerm) return;

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1&api_key=${API_Key}`);
            const result = await response.json();
            console.log(result.results);
            displayData(result.results);
        } catch (error) {
            alert('Error fetching the movie data: not found');
        }
    });

    function displayData(data) {
        resultsGrid.innerHTML = "";
        resultsSection.classList.add('active');
        
        if (data.length === 0) {
            resultsGrid.innerHTML = '<p>No results found</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        data.forEach((obj) => {
            if (obj.poster_path) {  // Only include movies with posters
                const div = document.createElement("div");
                div.className = 'movie-card';
                
                const image = document.createElement('img');
                const title = document.createElement('h5');
                
                image.src = BASE_PATH + obj.poster_path;
                image.alt = obj.title;
                title.textContent = obj.title;

                div.appendChild(image);
                div.appendChild(title);
                fragment.appendChild(div);
            }
        });
        resultsGrid.appendChild(fragment);
    }
});
