function getPokemonGalleryTemplate(pokemonDetail) {
  return `
    <article class="pokemon_card">
      <header class="pokemon_card_header">
        <span>#${pokemonDetail.id}</span> 
        <h2>${pokemonDetail.name}</h2>
      </header>

      <section class="pokemon_img"> 
        <img src="${pokemonDetail.sprites.other.home.front_default}" alt="${pokemonDetail.name}">
      </section>

      <footer class="pokemon_card_footer">
      </footer>
    </article>  
  `;
}

