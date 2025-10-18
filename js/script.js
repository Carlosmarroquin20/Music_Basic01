// js/script.js - Código Mejorado

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtención de Elementos del DOM
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const seekBar = document.getElementById('seek-bar');
    const artistsGrid = document.querySelector('.artists-grid');

    // 2. Estado del Reproductor
    let isPlaying = false;
    let isAudioReady = false; // Nuevo estado para verificar si el audio está cargado

    // --- Funciones del Reproductor de Audio ---

    /**
     * Actualiza el estado del botón y del reproductor.
     */
    function togglePlayPause() {
        if (!isAudioReady) {
            console.warn('Audio is not ready to play.');
            return;
        }

        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
            // Mejor práctica: Usar un atributo aria para accesibilidad
            playPauseBtn.setAttribute('aria-label', 'Play music');
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
            playPauseBtn.setAttribute('aria-label', 'Pause music');
        }
        isPlaying = !isPlaying;
    }

    /**
     * Sincroniza la barra de progreso con el tiempo de reproducción.
     */
    function updateSeekBar() {
        if (!isNaN(audio.duration)) {
            // Calcula el progreso en porcentaje
            const progress = (audio.currentTime / audio.duration) * 100;
            seekBar.value = progress;
        }
    }

    /**
     * Mueve el tiempo de reproducción según la posición de la barra.
     */
    function seekAudio() {
        // Establece el tiempo actual basado en el valor de la barra de 0 a 100
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    }

    // --- Event Listeners del Reproductor ---

    // 1. Manejar la carga del audio (cuando los metadatos están disponibles)
    audio.addEventListener('loadedmetadata', () => {
        // Cuando el audio se carga, establecemos la barra de progreso a 100
        // (Aunque ya está en 100 en HTML, es buena práctica)
        seekBar.max = 100;
        isAudioReady = true;
        // Opcional: Mostrar la duración total en algún lugar si se desea
        // console.log(`Audio duration: ${audio.duration}`);
    });

    // 2. Botón de Play/Pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    // 3. Sincronizar el progreso
    audio.addEventListener('timeupdate', updateSeekBar);

    // 4. Mover el tiempo al arrastrar la barra (usamos 'change' o 'input')
    // Usar 'input' da una sensación más fluida de arrastre
    seekBar.addEventListener('input', seekAudio);

    // 5. Reiniciar el reproductor al finalizar la canción
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
        playPauseBtn.setAttribute('aria-label', 'Play music');
        seekBar.value = 0; // Resetear la barra
        audio.currentTime = 0; // Asegurar que el tiempo de audio se resetea
    });

    // --- Carga de Artistas Dinámicos ---

    // Estructura de datos
    const artistsData = [
        { name: 'Artist 1', description: 'A vibrant pop sensation with catchy tunes.', image: 'assets/images/artist1.jpg' },
        { name: 'Artist 2', description: 'The rock legend who defined a generation.', image: 'assets/images/artist2.jpg' },
        { name: 'Artist 3', description: 'Electronic pioneer mixing futuristic beats.', image: 'assets/images/artist3.jpg' },
        { name: 'Artist 4', description: 'Soulful voice bringing back the classics.', image: 'assets/images/artist4.jpg' },
    ];

    /**
     * Crea y adjunta las tarjetas de artista al DOM.
     * @param {Object} artist - El objeto de datos del artista.
     */
    function createArtistCard(artist) {
        // Uso de 'article' en lugar de 'div' para mejor semántica,
        // replicando el uso en la sección 'genres'.
        const card = document.createElement('article'); 
        card.className = 'genre-card artist-card'; // Clase específica para diferenciar

        // Uso de createElement y appendChild para más seguridad
        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = `Photo of ${artist.name}`;
        img.loading = 'lazy'; // Optimización de carga

        const h3 = document.createElement('h3');
        h3.textContent = artist.name;

        const p = document.createElement('p');
        p.textContent = artist.description;

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(p);
        
        // Agregar un botón o enlace para más interacción
        const link = document.createElement('a');
        link.href = `#artist-${artist.name.replace(/\s+/g, '-').toLowerCase()}`;
        link.textContent = 'View Profile';
        link.className = 'artist-link';
        card.appendChild(link);

        artistsGrid.appendChild(card);
    }

    // Limpia el contenido antes de cargarlos (útil si hay un mensaje de "cargando")
    artistsGrid.innerHTML = ''; 

    // Itera y crea las tarjetas
    artistsData.forEach(createArtistCard);
    
    // --- Lógica del Menú Responsive (si usaste el CSS mejorado) ---
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active'); 
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Cierra el menú al hacer clic en un enlace (útil en móvil)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

});