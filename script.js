// let pokemonName = [];

let pokemonData = [];

function init() {
  renderPokemonGallery();
  // renderPokemonImg();
}

async function renderPokemonGallery() {
  let pokemonList = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  ); // liefert ein OBJEKT
  let pokemonListAsJson = await pokemonList.json();

  // console.log(responseAsJson);


  for (let i = 0; i < pokemonListAsJson.results.length; i++) {
    let pokemonDetails = await fetch (pokemonListAsJson.results[i].url);
    let pokemonDetailsAsJson = await pokemonDetails.json();

    pokemonName.push(pokemonListAsJson.results[i].name);
    document.getElementById("pokemon_gallery").innerHTML +=
      getPokemonGalleryTemplate(i);
  }
  console.log(pokemonName);
}




// TIPP FREDDY:
// async function showPokemon() {
//   for (let index = 0; index < 20; index++) {
//     let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index); // #TODO: mehrere holen // liefert ein OBJEKT
//     let responseAsJson = await response.json();

//     // in Array pushen (global definieren)
//   }

//   console.log(responseAsJson.forms[0].name);
// }
