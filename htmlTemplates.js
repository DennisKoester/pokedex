function smallPokeCardHTML(i, pokemonName, image, type) {
    return /*html*/`
    <div onclick="loadBigCard(${i})" id="card${i}" class="pokemon-card ${type}">
       <div class="box-content">
           <div class="head">
               <h2>${pokemonName}</h2>
               <p>#${i}</p>
           </div>
           <div id="types${i}" class="types"></div>
           <img src="${image}" alt="">
       </div>
   </div>`;
}


function bigPokeCardHTML(i, pokemonName, image, type) {
    return /*html*/ `
    <div class="background" onclick="closeBigCard()"></div>
    <div class="z-index">
        <div class="top-container ${type}">
            <div class="header-btns">
                <img onclick="closeBigCard()" src="./img/icons/icons8-pfeil_-lang,-links-50.png" alt="">
                <div class="arrow-btns">
                    <span id="back-btn" onclick="prevPokemon(${i})" class="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span id="next-btn" onclick="nextPokemon(${i})" class="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
            </div>
            <div class="name-id">
                <h1>${pokemonName}</h1>
                <p>#${i}</p>
            </div>
            <div id="typesBig${i}" class="typesBig"></div>
        </div>
        <div class="info-container">
            <img id="pokemonImage" class="pokemonImage" src="${image}" alt="">
            <div class="pokemon-infos">
                <div id="pokemon-navbar" class="pokemon-navbar">
                    <ul>
                        <li onclick="renderAbout()"class="btn active">About</li>
                        <li onclick="renderStats()" class="btn">Base Stats</li>
                        <li class="btn">Evolution</li>
                        <li class="btn">Moves</li>
                    </ul>
                </div>
                <div id="informations"></div>
            </div>
        </div>
    </div>`;
}


function aboutHTML(height, weight) {
    return /*html*/ `
        <table>
            <tbody>
                <tr>
                    <td>Height</td>
                    <td>${height}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>${weight} lbs</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td id="abilties"></td>
                </tr>
            </tbody>
        </table>`;
}


function statstHTML(i, stat, statNumber) {
    return /*html*/ `
        <div class="stats-container">
            <div>
                <p>${stat}</p>
            </div>
            <div class="progress-container">
                <p>${statNumber}</p>
                <div class="progressbar">
                    <div id="progress-value${i}" style="width: ${statNumber}%"></div>
                </div>
            </div>
        </div>`;
}


function typeHTML(type) {
    return /*html*/ `
    <span class="type">${type}</span>`;
}