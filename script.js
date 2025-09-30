// Mit Blick auf die spätere Suchfunktion lege ich nur EIN Array (nicht mehrere) an,
// in dem jedes Element (Objekt) ein komplettes Pokémon ist:

let pokemonDetails = [];
const lightboxRef = document.getElementById("lightbox");

let currentOffset = 0;   // Start bei 0 --> So merke ich mir, wie weit ich schon gekommen bin
let limit = 10;        // immer eine bestimmte Anzahl Pokémon laden

let currentPokemons = [];


function init() {
  renderPokemonGallery(limit);
}




async function renderPokemonGallery(limit) {
  // LISTE der Pokémon holen:
  let listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
  let pokemonList = await listResponse.json(); // in ein JSON umwandeln --> Den Variablenzusatz "AsJson" lasse ich weg, da das schon aus dem Code ersichtlich ist.

  // pokemonDetails = []; // ggf. wieder einkommentieren, falls ich nur immer 20 auf einer Seite anzeigen möchte

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

// Funktion für den Button (mit async und await, damit sich der Button während des Ladens deaktivieren kann)
async function loadMore() {
  const buttonShowMore = document.getElementById("button_show_more");

  // Button während des Ladens deaktivieren:
  buttonShowMore.disabled = true;
  
  currentOffset += limit; // Offset um 20 erhöhen
  await renderPokemonGallery(limit);

  // Button nach dem Laden wieder aktivieren:
  buttonShowMore.disabled = false;
}

// Suchfunktion

function startSearch() {
  let inputRef = document.getElementById("search_input");
  let input = inputRef.value.toLowerCase();
  console.log(input);
  
  let errorMessageRef = document.getElementById("search_error");

  if (input.length < 3) {
    errorMessageRef.classList.remove("d_none");
    errorMessageRef.innerHTML = `<span>Search requires a minimum of 3 letters.</span>`;
    return;
  }
}





// Lightbox

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
