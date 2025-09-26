// Mit Blick auf die spätere Suchfunktion lege ich nur EIN Array (nicht mehrere) an,
// in dem jedes Element (Objekt) ein komplettes Pokémon ist:

let pokemonDetails = [];

function init() {
  renderPokemonGallery();
}

async function renderPokemonGallery() {
  // LISTE der Pokémon holen:
  let listResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
  );
  let pokemonList = await listResponse.json(); // in ein JSON umwandeln --> Den Variablenzusatz "AsJson" lasse ich weg, da das schon aus dem Code ersichtlich ist.

  pokemonDetails = [];

  // Für jedes Pokémon aus der LISTE:
  for (let i = 0; i < pokemonList.results.length; i++) {
    let detailResponse = await fetch(pokemonList.results[i].url); // Über die URL die Details dieses Pokemons abrufen.
    let pokemonDetail = await detailResponse.json(); // in ein JSON umwandeln (s.o.)

    pokemonDetails.push(pokemonDetail); // Die Detaildaten werden im globalen Array (jeweils als Objekt) gespeichert.
  }

  // HTML für alle Karten
  let galleryHtml = ""; // ??? Soll ich das ganz nach oben schreiben?
  for (let i = 0; i < pokemonDetails.length; i++) {
    let typeName = pokemonDetails[i].types[0].type.name;
    galleryHtml += getPokemonCardTemplate(pokemonDetails[i], typeName);
  }

  document.getElementById("pokemon_gallery").innerHTML = galleryHtml;
}

function getTypeIcons(pokemonDetail) {
  let galleryHtml = "";

  for (let i = 0; i < pokemonDetail.types.length; i++) {
    let typeName = pokemonDetail.types[i].type.name; // zB "grass"
    galleryHtml += getTypeIconsTemplate(typeName);
  }

  return galleryHtml;
}
