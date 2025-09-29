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

      <section>
        <br> <br> Hier <br> kommt <br> was <br> anderes <br> hin
      </section>
    </article>  
  `;
}

// function getHeaderLightboxTempl(pokemonDetail) {
//   return `
//           <span>#${pokemonDetail.id}</span> 
//           <h2>${pokemonDetail.name}</h2>
    
//     <button aria-label="Pokemon-Datailansicht schließen" onclick="closeLightbox()">
//     x
//     </button>`;
// }


// function getHeaderLightboxTempl() {
//   return `
//     <h2 id="lightbox_title">Test</h2>
//     <button aria-label="Fotogroßansicht schließen" onclick="closeLightbox()">
//     x
//     </button>`;
// }

// function getImgLightboxTempl() {
//   return `
//     Hier <br> kommt <br> das <br> Bild <br> hin `;
// }

// function getFooterLightboxTempl(i) {
//   return `
//     Das ist der Footer
//   `;
// }

// , setFocusOnTop() --> in <button am Ende>


