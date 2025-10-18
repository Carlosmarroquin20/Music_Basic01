const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');
const artistsGrid = document.querySelector('.artists-grid');

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
});

seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Ejemplo de artistas dinámicos
const artists = [
    { name: 'Artist 1', description: 'A pop sensation.', image: 'assets/images/artist1.jpg' },
    { name: 'Artist 2', description: 'Rock legend.', image: 'assets/images/artist2.jpg' },
];

artists.forEach(artist => {
    const card = document.createElement('div');
    card.className = 'genre-card';
    card.innerHTML = `
        <img src="${artist.image}" alt="${artist.name}">
        <h3>${artist.name}</h3>
        <p>${artist.description}</p>
    `;
    artistsGrid.appendChild(card);
});