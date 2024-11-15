const apiKey = "p3oo5TSObsLbiVPhWE5Bs0YRGcVeWWxi"; // se define la clave de API para acceder a Giphy
const searchButton = document.getElementById('searchButton'); // se define el botón de búsqueda
const searchInput = document.getElementById('searchInput'); // se define el campo de entrada de texto
const gifContainer = document.getElementById('gifContainer'); // se define el contenedor donde se mostrarán los GIFs
const clearButton = document.getElementById('clearButton'); // se define el botón para limpiar la búsqueda

clearButton.addEventListener('click', function() { // evento al botón de limpiar para borrar los GIFs y el texto de búsqueda
    gifContainer.innerHTML = ''; // Limpiar el contenedor de GIFs
    searchInput.value = ''; // Limpiar el campo de búsqueda
});

searchButton.addEventListener('click', function() { // evento al botón de buscar para realizar la búsqueda cuando se hace click
    const searchTerm = searchInput.value.trim(); // obtiene el valor ingresado en el campo de búsqueda y elimina espacios en blanco al principio y al final

    if (searchTerm === '') { //  comprueba si el campo de búsqueda está vacío, y si es así, muestra un mensaje de alerta
        alert('Por favor ingresa un término de búsqueda');
        return;
    }
    // construye la URL de la API de Giphy con los parámetros de búsqueda
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=9&offset=0&rating=g&lang=es&bundle=messaging_non_clips`;

    fetch(apiUrl) // con esta función se realiza una solicitud a la API de Giphy, devuelve una promesa 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`); // si la respuesta no es correcta, muestra un error
            }
            return response.json(); // si la respuesta es correcta, se convierte la respuesta a formato JSON
        })
        .then(data => { // se verifica data , la lista de GIFs
            if (data.data.length === 0) {  // Si no hay resultados muestra un mensaje
                gifContainer.innerHTML = '<p>Rayos! No encontramos ese GIF. Lo siento :( Realiza una nueva búsqueda.</p>';
            } else {
                displayGifs(data.data);  // Muestra los GIFs si hay resultados
            }
        })
        .catch(error => { // se muestra un mensae de error si ocurre algún error durante el proceso
            console.error("Error fetching GIFs:", error);
            gifContainer.innerHTML = '<p>UPS! No encontramos ese GIF. Lo siento :(</p>';
        });
});

function displayGifs(gifs) { // esta función recibe una lista de GIFs y se encarga de mostrarlos
    gifContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos GIFs
    gifs.forEach(gif => {
        console.log(gif.images.original.url); // esta función imprime en la consola la URL del GIF 
        let imagen = document.createElement("img");
        imagen.src = gif.images.original.url;
        gifContainer.appendChild(imagen); // Agrega la imagen al contenedor gifContainer en lugar de document.body para hacerlo visible
    });
}
