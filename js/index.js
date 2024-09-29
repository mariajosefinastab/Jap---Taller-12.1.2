document.addEventListener("DOMContentLoaded", function() {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            window.moviesData = data; // Almacenar los datos
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});


document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.toLowerCase();
    const results = window.moviesData.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genres.some(genre => genre.toLowerCase().includes(query)) ||
        movie.tagline.toLowerCase().includes(query) ||
        movie.overview.toLowerCase().includes(query)
    );

    // Mostrar los resultados de la búsqueda
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpiar resultados anteriores

    results.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.onclick = () => showMovieDetails(movie); // Evento para mostrar detalles

        // Crear el sistema de estrellas
        const stars = Math.round(movie.vote_average);
        let starHTML = '';
        for (let i = 1; i <= 5; i++) {
            starHTML += `<span class="fa fa-star ${i <= stars ? 'checked' : ''}"></span>`;
        }

        li.innerHTML = `
            <strong>${movie.title}</strong><br>
            <em>${movie.tagline}</em><br>
            <div>${starHTML} (${movie.vote_average})</div>
        `;

        lista.appendChild(li);
    });

    // Si no hay resultados, mostrar un mensaje
    if (results.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = 'No se encontraron resultados.';
        lista.appendChild(li);
    }
});

// Mostrar los detalles de la película
function showMovieDetails(movie) {
    document.getElementById('movieDetailsLabel').textContent = movie.title;
    document.getElementById('movieOverview').textContent = movie.overview;
    document.getElementById('movieGenres').textContent = movie.genres.join(', ');

    // Detalles adicionales
    document.getElementById('movieYear').textContent = `Año de lanzamiento: ${new Date(movie.release_date).getFullYear()}`;
    document.getElementById('movieDuration').textContent = `Duración: ${movie.runtime} minutos`;
    document.getElementById('movieBudget').textContent = `Presupuesto: $${movie.budget.toLocaleString()}`;
    document.getElementById('movieRevenue').textContent = `Ganancias: $${movie.revenue.toLocaleString()}`;

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('movieDetails'));
    offcanvas.show();
}