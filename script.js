// Mit Blick auf die spätere Suchfunktion lege ich nur EIN Array an, 
// in dem jedes Element (Objekt) ein komplettes Pokémon ist:

let pokemonDetails = [];


function init() {
  renderPokemonGallery();
}

async function renderPokemonGallery() {
  // LISTE der Pokémon holen:
  let listResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  let pokemonList = await listResponse.json(); // in ein JSON umwandeln --> Den Variablenzusatz "AsJson" lasse ich weg, da das schon aus dem Code ersichtlich ist.

  // Für jedes Pokémon aus der LISTE: 
  for (let i = 0; i < pokemonList.results.length; i++) {
    let pokemonListItem = pokemonList.results[i]; // Eintrag aus der Liste speichern (Name + URL).

    let detailResponse = await fetch(pokemonListItem.url); // Über die URL die Details dieses Pokemons abrufen.
    let pokemonDetail = await detailResponse.json(); // in ein JSON umwandeln (s.o.)

    pokemonDetails.push(pokemonDetail); // Die Detaildaten werden im globalen Array (jeweils als Objekt) gespeichert.

    // In HTML über Template (Übergabeparameter "pokemonDetail" (Singular!) einfügen:
    document.getElementById("pokemon_gallery").innerHTML +=
      getPokemonGalleryTemplate(pokemonDetail);
  }

  // Kontrolle: 
  console.log(pokemonDetails);
}



