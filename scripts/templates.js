function getTypeIconsTemplate(typeName) {
  return `
    <span class="type_bg_icons ${typeName}">
      <img class="type_icon" src="./assets/icons/types/${typeName}.svg" alt="${typeName}">
    </span>
  `;
}

function getPokemonCardTemplate(pokemonDetail, typeName, i) { // brauche ich das i?
  return `
    
      <article class="pokemon_card" onclick="openLightbox()">
        <header class="pokemon_card_header">
          <span>#${pokemonDetail.id}</span> 
          <h2>${pokemonDetail.name}</h2>
        </header>

        <section class="pokemon_img ${typeName}"> 
          <img src="${pokemonDetail.sprites.other.home.front_default}" alt="${pokemonDetail.name}">
        </section>

        <footer class="pokemon_card_footer">
           ${getTypeIcons(pokemonDetail)}
        </footer>
      </article>  
    
  `;
}

function getHeaderLightboxTemplate() {
  return `
    <h2 id="lightbox_title">Test</h2>
    <button aria-label="Fotogroßansicht schließen" onclick="closeLightbox()">
    x
    </button>`;
}

function getImgLightboxTemplate() {
  return `
    Hier <br> kommt <br> das <br> Bild <br> hin `;
}

function getFooterLightboxTemplate(i) {
  return `
    Das ist der Footer
  `;
}

// , setFocusOnTop() --> in <button am Ende>


