let allPokemon = [];
let currentPokemon;
let pokemonLimit = 30;
let offset = 1;
let load = false; // Is used to stop triggering the onscroll function. 


async function init() {
    loadAllPokemons();
}


function renderBigCard(i) {
    renderSlider(i);
    loadTypesBig(i);
    renderAbout();
    toggleBackground();
    active();
}


async function loadAllPokemons() {

    for (let i = offset; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json(); // TODO why without "let"?
        allPokemon.push(currentPokemon);

        renderSmallPokemonCard(i);
    }
    window.addEventListener('scroll', ScrollForMorePokemon);
}


const ScrollForMorePokemon = async () => {

    if (window.scrollY + window.innerHeight >= document.body.clientHeight && load == false) {
        for (let i = pokemonLimit; i < pokemonLimit + 15; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let res = await fetch(url);
            currentPokemon = await res.json();
            allPokemon.push(currentPokemon);
            await renderSmallPokemonCard(i);
            load = true; // Is used to stop triggering the onscroll function. 
        }
        pokemonLimit += 15;
        offset += 15;
        load = false; // Is used to stop triggering the onscroll function. 
    }
}

// Small Cards

function renderSmallPokemonCard(i) {
    let pokemonName = currentPokemon['name'];
    let image = currentPokemon['sprites']['other']['home']['front_default'];
    let type = currentPokemon['types'][0]['type']['name']; // For the background color of each pokemon.
    let content = document.getElementById('allPokemon');

    content.innerHTML += smallPokeCardHTML(i, pokemonName, image, type);

    loadTypes(i);
}


function loadTypes(i) {
    let types = document.getElementById(`types${i}`);

    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        let typeCapi = capitalizeFirstLetter(type);
        types.innerHTML += typeHTML(typeCapi);
    }
}


function loadTypesBig(i) {
    let types = document.getElementById(`typesBig${i}`);

    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        let typeCapi = capitalizeFirstLetter(type);
        types.innerHTML += typeHTML(typeCapi);
    }
}


function capitalizeFirstLetter(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// Big Card

/* async function loadBigCard(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    currentPokemon = await response.json();
    let pokemonName = currentPokemon['name'];
    let image = currentPokemon['sprites']['other']['home']['front_default'];
    let type = currentPokemon['types'][0]['type']['name']; // For the background color of each pokemon.
    let bigCard = document.getElementById('bigPokeCard');
    let bodyhtml = document.getElementById('body');

    bigCard.innerHTML = '';
    bigCard.classList.remove('d-none');
    bigCard.innerHTML = bigPokeCardHTML(i, pokemonName, image, type);
    bodyhtml.classList.add('no-scroll');

    renderBigCard(i);
} */


async function loadBigCard(i) {
    let pokeId = i - 1;
    let bigPokemon = allPokemon[pokeId];
    let pokemonName = bigPokemon['name'];
    let image = bigPokemon['sprites']['other']['home']['front_default'];
    let type = bigPokemon['types'][0]['type']['name']; // For the background color of each pokemon.
    let bigCard = document.getElementById('bigPokeCard');
    let bodyhtml = document.getElementById('body');

    bigCard.innerHTML = '';
    bigCard.classList.remove('d-none');
    bigCard.innerHTML = bigPokeCardHTML(i, pokemonName, image, type);
    bodyhtml.classList.add('no-scroll');

    renderBigCard(i);
}

// !! "currentPokemon" is already set from the function openBigCard. Thats why it works.

function renderAbout() {
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    let about_content = document.getElementById('informations');

    about_content.innerHTML = '';

    about_content.innerHTML = aboutHTML(height, weight);

    renderAbilites();
}


function renderAbilites() {
    let abilities = document.getElementById('abilties');

    abilities.innerHTML = '';

    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities.innerHTML += /*html*/ `
        ${ability}`;
    }
}


function renderStats() {
    let baseStats = document.getElementById('informations');

    baseStats.innerHTML = '';

    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let stat = currentPokemon['stats'][i]['stat']['name'];
        let statNumber = currentPokemon['stats'][i]['base_stat'];

        baseStats.innerHTML += statstHTML(i, stat, statNumber);
        changeProgressColor(i, statNumber);
    }
}


function changeProgressColor(i, statNumber) {
    let progressColor = document.getElementById(`progress-value${i}`);

    if (statNumber >= 50) {
        progressColor.style.backgroundColor = 'rgb(0, 255, 0)';
    }
}


function closeBigCard() {
    let bigCard = document.getElementById('bigPokeCard');

    bigCard.classList.add('d-none');

    toggleBackground();
}


function toggleBackground() {
    let header = document.getElementById('header');
    let background = document.getElementById('allPokemon');
    let bigCard = document.getElementById('bigPokeCard');
    let bodyhtml = document.getElementById('body');

    if (!bigCard.classList.contains('d-none')) {
        header.classList.add('hidden-bg', 'disable-div');
        background.classList.add('hidden-bg', 'disable-div');
        bodyhtml.classList.add('no-scroll');

    } else {
        header.classList.remove('hidden-bg', 'disable-div');
        background.classList.remove('hidden-bg', 'disable-div');
        bodyhtml.classList.remove('no-scroll');
    }
}

// Slider //

function renderSlider(i) {
    backBtn = document.getElementById('back-btn');
    nextBtn = document.getElementById('next-btn');


    if (i >= 2) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }
    if (i == allPokemon.length) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}


function nextPokemon(i) {
    i++;
    loadBigCard(i);
}


function prevPokemon(i) {
    backBtn = document.getElementById('back-btn');

    if (i == 1) {
        backBtn.disable = true;
    } else {
        i--;
        loadBigCard(i);
    }
}

// Search Function // 

function searchPokemon() {
    let input = document.getElementById('search').value;
    search = input.toLowerCase();
    let content = document.getElementById('allPokemon');
    content.innerHTML = '';

    for (let i = 0; i < allPokemon.length; i++) {
        const pokemonName = allPokemon[i]['name'];
        if (pokemonName.startsWith(search)) {
            currentPokemon = allPokemon[i];
            renderSmallPokemonCard(i + 1); // important to get and open the right pokemon
        }
    }
}

// Active Menu Tab //

function active() {
    let bigCard = document.getElementById('bigPokeCard');

    if (!bigCard.classList.contains("d-none")) {
        var btnContainer = document.getElementById('pokemon-navbar');

        var btns = btnContainer.getElementsByClassName("btn");

        // Loop through the buttons and add the active class to the current/clicked button
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }
}
