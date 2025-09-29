function getTypeIconsTempl(typeName) {
  return `
    <span class="type_bg_icons ${typeName}">
      <img class="type_icon" src="./assets/icons/types/${typeName}.svg" alt="${typeName}">
    </span>
  `;
}

function getPokemonCardTempl(pokemonDetail, typeName, i) {
  return `
    <article class="pokemon_card" onclick="openLightbox(${i})">
      <header class="pokemon_card_header">
        <span>#${pokemonDetail.id}</span> 
        <h2>${pokemonDetail.name}</h2>
      </header>

      <section class="pokemon_img ${typeName}"> 
        <img src="${pokemonDetail.sprites.other.home.front_default}" alt="${pokemonDetail.name}">
      </section>

      <footer class="pokemon_type">
        ${getTypeIcons(pokemonDetail)}
      </footer>
    </article>  
  `;
}

function getPokemonLightboxTempl(pokemonDetail, typeName) {
  return `
    <article class="pokemon_lightbox">
      <header class="pokemon_card_header">
        <span>#${pokemonDetail.id}</span> 
        <h2>${pokemonDetail.name}</h2>
        <button 
          onclick="closeLightbox()"
          class ="button_close" 
          aria-label="Pokemon-Datailansicht schließen">
            X  
        </button>
      </header>

      <section class="pokemon_img ${typeName}"> 
        <img src="${pokemonDetail.sprites.other.home.front_default}" alt="${pokemonDetail.name}">
      </section>

      <section class="pokemon_type">
        ${getTypeIcons(pokemonDetail)}
      </section>

      <section class="tabs">
        <button id="button_main" class="tab_button active" onclick="showMain()">main</button>
        <button id="button_stats" class="tab_button" onclick="showStats()">stats</button>
      </section>

      <section id="tab_main" class="tab_main" style="display:block;">
        <table class="pokemon_main_table">
          <tr>
            <td>Height:</td>
            <td>${pokemonDetail.height / 10} m</td> 
          </tr>
          <tr>
            <td>Weight:</td>
            <td>${pokemonDetail.weight / 10} kg</td> 
          </tr>
          <tr>
            <td>Base experience:</td>
            <td>${pokemonDetail.base_experience}</td> 
          </tr>
          <tr>
            <td>Abilities:</td>
            <td>${getAbilities(pokemonDetail)}</td>
          </tr>

        </table>
        
      </section>

      <section id="tab_stats" class="tab_stats" style="display:none;">
        <p>Stats-Inhalt …</p>
      </section>



    </article>  
  `;
}


// tab_button active // data-tab

// , setFocusOnTop() --> in <button am Ende>


