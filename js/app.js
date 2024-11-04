const characters = [
    "Luke Skywalker",
    "Darth Vader",
    "Leia Organa",
    "Obi-Wan Kenobi",
    "Yoda"
];

// Función para leer personajes dinámicamente
function loadCharacterTimeline() {
    const timeline = document.getElementById('character-timeline');
    characters.forEach((name, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('single-timeline-area');

        timelineItem.innerHTML = `
            <div class="timeline-date">
                <p>${name}</p>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-timeline-content d-flex" onmouseenter="fetchCharacterData('${name}', this)">
                        <div class="timeline-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
                        <div class="timeline-text">
                            <h6>${name}</h6>
                            <p class="character-info">Saber peso y altura...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Función fetch para info del personaje desde SWAPI
function fetchCharacterData(name, element) {
    fetch(`https://swapi.dev/api/people/?search=${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const character = data.results[0];
                const info = `Altura: ${character.height} cm | Peso: ${character.mass} kg`;
                element.querySelector('.character-info').innerText = info;
            } else {
                element.querySelector('.character-info').innerText = 'Character data not found.';
            }
        })
        .catch(error => {
            element.querySelector('.character-info').innerText = 'Error loading data.';
            console.error('Error fetching character data:', error);
        });
}

// Leer el timeline en pagina
document.addEventListener('DOMContentLoaded', loadCharacterTimeline);