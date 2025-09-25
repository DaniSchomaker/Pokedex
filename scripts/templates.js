function getPokemonGalleryTemplate(i) {
  return `
    <article class="pokemon_card">
      <header class="pokemon_card_header">
        <span>#${i+1}</span> 
        <h2>${pokemonName[i]}</h2>
      </header>

      <section class="pokemon_img"> 
        <img src="" alt="">
      </section>

      <footer class="pokemon_card_footer">

      </footer>
      
    </article>  

  `;
}