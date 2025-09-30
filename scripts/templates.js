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
        <h2>${pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)}</h2>
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
        <h2>${pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)}</h2>
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
            <td>height:</td>
            <td>${pokemonDetail.height / 10} m</td> 
          </tr>
          <tr>
            <td>weight:</td>
            <td>${pokemonDetail.weight / 10} kg</td> 
          </tr>
          <tr>
            <td>base experience:</td>
            <td>${pokemonDetail.base_experience}</td> 
          </tr>
          <tr>
            <td>abilities:</td>
            <td>${getAbilities(pokemonDetail)}</td>
          </tr>

        </table>        
      </section>

      <section id="tab_stats" class="tab_stats" style="display:none;">
        <table class="pokemon_main_table">
          <tr>
            <td>hp:</td>
            <td> X </td>
          </tr>
          <tr>
            <td>attack:</td>
            <td> X </td>
          </tr>
          <tr>
            <td>defense:</td>
            <td> X </td>
          </tr>   
          <tr>
            <td>special-attack:</td>
            <td> X </td>
          </tr> 
          <tr>
            <td>special-defense:</td>
            <td> X </td>
          </tr> 
          <tr>
            <td>speed:</td>
            <td> X </td>
          </tr>       
        </table>
      </section>



    </article>  
  `;
}


// tab_button active // data-tab

// , setFocusOnTop() --> in <button am Ende>


