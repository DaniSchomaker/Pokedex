function getTypeIconsTempl(typeName) {
  return `
    <span class="type_bg_icons ${typeName}" title="${typeName}">
      <img class="type_icon" src="./assets/icons/types/${typeName}.svg" alt="${typeName}">
    </span>
  `;
}

function getPokemonCardTempl(pokemon, typeName, i) {
  return `
    <button type="button"
        class="pokemon_card"
        onclick="openLightbox(${i})"
        aria-label="open Pokémon details">
   
      <header class="pokemon_card_header">
        <span>#${pokemon.id}</span> 
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      </header>

      <section class="pokemon_img ${typeName}"> 
        <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
      </section>

      <footer class="pokemon_type">
        ${getTypeIcons(pokemon)}
      </footer>
    </button>  
  `;
}

function getPokemonLightboxTempl(activePokemon, typeName) {
  return `
    <article class="pokemon_lightbox">
      <header class="pokemon_card_header">
        <span>#${activePokemon.id}</span> 
        <h2>${
          activePokemon.name.charAt(0).toUpperCase() +
          activePokemon.name.slice(1)
        }</h2>
        <button 
          onclick="closeLightbox(), setFocusOnTop()"
          class ="button_close" 
          aria-label="close Pokémon detail view">
            <img src="./assets/icons/close.png" alt="close button">
        </button>
      </header>

      <section class="pokemon_card_img ${typeName}"> 
        <button class="button_arrow" onclick="showPreviousPokemon()" aria-label="show previous Pokémon">
          <img src="./assets/icons/arrow_left.png" alt="show previous pokémon">
        </button>
          <img src="${activePokemon.sprites.other.home.front_default}" alt="${activePokemon.name}">
        <button class="button_arrow" onclick="showNextPokemon()" aria-label="show next Pokémon">
          <img src="./assets/icons/arrow_right.png" alt="show next pokémon">
        </button>
      </section>

      <section class="pokemon_type">
        ${getTypeIcons(activePokemon)}
      </section>

      <section class="tabs">
        <button id="button_main" class="tab_button active" onclick="showMainTab()">main</button>
        <button id="button_stats" class="tab_button" onclick="showStatsTab()">stats</button>
      </section>

      <section id="tab_main" class="tab_main" style="display:block;">
        <table class="pokemon_main_table">
          <tr>
            <td>height:</td>
            <td>${activePokemon.height / 10} m</td> 
          </tr>
          <tr>
            <td>weight:</td>
            <td>${activePokemon.weight / 10} kg</td> 
          </tr>
          <tr>
            <td>base experience:</td>
            <td>${activePokemon.base_experience}</td> 
          </tr>
          <tr>
            <td>abilities:</td>
            <td>${getAbilities(activePokemon)}</td>
          </tr>

        </table>        
      </section>

      <section id="tab_stats" class="tab_stats" style="display:none;">
        <table class="pokemon_stats_table">
          <tr>
            <td>hp:</td>
            <td id="stat_hp">X</td>
            <td>
              <div class="progress">
                <div id="bar_hp" class="progress_fill"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>attack:</td>
            <td id="stat_attack">X</td>
            <td>
             <div class="progress">
                <div id="bar_attack" class="progress_fill"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>defense:</td>
            <td id="stat_defense">X</td>
            <td>
              <div class="progress">
                <div id="bar_defense" class="progress_fill"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>special-attack:</td>
            <td id="stat_special_attack">X</td>
            <td>
              <div class="progress">
                <div id="bar_special_attack" class="progress_fill"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>special-defense:</td>
            <td id="stat_special_defense">X</td>
            <td>
              <div class="progress">
                <div id="bar_special_defense" class="progress_fill"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>speed:</td>
            <td id="stat_speed">X</td>
            <td>
              <div class="progress">
                <div id="bar_speed" class="progress_fill"></div>
              </div>
            </td>
          </tr>
        </table>        
      </section>
    </article>  
  `;
}
