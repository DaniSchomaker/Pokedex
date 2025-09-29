// Mit Blick auf die spätere Suchfunktion lege ich nur EIN Array (nicht mehrere) an,
// in dem jedes Element (Objekt) ein komplettes Pokémon ist:

let pokemonDetails = [];
let lightboxRef = document.getElementById("lightbox");

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
    // galleryHtml += getPokemonCardTemplate(pokemonDetails[i], typeName); 
    galleryHtml += getPokemonCardTempl(pokemonDetails[i], typeName, i);  //////
  }

  document.getElementById("pokemon_gallery").innerHTML = galleryHtml;
}

function getTypeIcons(pokemonDetail) {
  let galleryHtml = "";

  for (let i = 0; i < pokemonDetail.types.length; i++) {
    let typeName = pokemonDetail.types[i].type.name; // zB "grass"
    galleryHtml += getTypeIconsTempl(typeName);
  }

  return galleryHtml;
}

function getAbilities(pokemonDetail) {
  let abilitiesHtml = "";
  for (let i = 0; i < pokemonDetail.abilities.length; i++) {
    if (i > 0) {
      abilitiesHtml += `, <br>`;
    }
    abilitiesHtml += pokemonDetail.abilities[i].ability.name;
  }
  return abilitiesHtml;
}



function openLightbox(i) {
  const pokemonDetail = pokemonDetails[i]; // passendes Pokemon holen
  renderLightbox(pokemonDetail); // an den Renderer übergeben
  lightboxRef.showModal(); // .showModal = Dialog/Lightbox wird geöffnet
}

function renderLightbox(pokemonDetail) { //Übergabeparamter?
  const pokemonLightbox = document.getElementById("pokemon_lightbox");

  pokemonLightbox.innerHTML = getPokemonLightboxTempl(pokemonDetail);
}

function closeLightbox() {
  lightboxRef.close();
}

function closeLightboxBubblingProtection(event) {
  event.stopPropagation(); // bei den Event "click" wird der Bubbling-Effekt (also das Durchgreifen auf die unteren Ebenen) vermieden
}




function showMain() {
  // Tabs
  document.getElementById("button_main").classList.add("active");
  document.getElementById("button_stats").classList.remove("active");

  // Inhalte
  document.getElementById("tab_main").style.display = "block";
  document.getElementById("tab_stats").style.display = "none";
}

function showStats() {
  // Tabs
  document.getElementById("button_main").classList.remove("active");
  document.getElementById("button_stats").classList.add("active");

  // Inhalte
  document.getElementById("tab_main").style.display = "none";
  document.getElementById("tab_stats").style.display = "block";
}










///// Fokusshift /////

// function setFocusOnTop() {
//   const elementRef = document.getElementById("headline");
//   elementRef.focus();
// }
