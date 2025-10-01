let pokemonDetails = []; // Array mit allen Pokemons (jeweils als Objekt)
let currentPokemons = []; // für die Filter-Funktion
let currentPokemonIndex = 0; // merkt sich, welches Pokémon in der Lightbox angezeigt wird

const lightboxRef = document.getElementById("lightbox");

let currentOffset = 0;   // Start bei 0 --> So merke ich mir, wie weit ich schon gekommen bin
let limit = 40;        // immer eine bestimmte Anzahl an Pokémons laden

let isSearchActive = false; // für Suchfunktion

////// functions //////

async function init() {
  await loadPokemons(limit);
  renderAll();   
  showBrowseMode();
}



async function loadPokemons(limit) {
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
}

function renderAll() {
  currentPokemons = pokemonDetails;
  renderCurrentPokemons();
}

function renderCurrentPokemons() {
  const galleryRef = document.getElementById("pokemon_gallery");
  galleryRef.innerHTML = "";

  for (let i = 0; i < currentPokemons.length; i++) {
    const pokemon = currentPokemons[i];
    const typeName = pokemon.types[0].type.name;

    // globalen Index für die Lightbox ermitteln
    // const globalIndex = pokemonDetails.findIndex(detail => detail.id === pokemon.id); /////////////////// 
    
    galleryRef.innerHTML += getPokemonCardTempl(pokemon, typeName, i);
  }
}

function startSearch() {
  const searchInputRef = document.getElementById("search_input");
  const searchInput = searchInputRef.value.trim().toLowerCase();

  const errorMessageRef = document.getElementById("search_error");

  // Fehlermeldung, wenn < 3 Buchstaben in das Suchfeld eingegeben werden
  if (searchInput.length < 3) {
    errorMessageRef.innerHTML = `<span class='error'>Please enter at least 3 letters.</span>`;
    return;
  }

  const results = pokemonDetails.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchInput)
  );

  if (results.length === 0) {
    const galleryRef = document.getElementById("pokemon_gallery"); // global definieren, da doppelt?
    galleryRef.innerHTML = `<span class='error'>Uuuups, no Pokémon found.</span>`; 
    showFilterMode(); // Der Button ändert sich von "show more" zu "clear search"
    return; 
  }

  // gültige Suche mit Treffern -> Filter anzeigen
  errorMessageRef.innerHTML = "";
  isSearchActive  = true;

  currentPokemons = results;
  renderCurrentPokemons();
  showFilterMode();
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

async function loadMore() {
  const buttonShowMore = document.getElementById("button_show_more");
  buttonShowMore.disabled = true;

  currentOffset += limit;
  await loadPokemons(limit);
  renderAll();

  buttonShowMore.disabled = false;
}







function showFilterMode() {
  // Suche aktiv -> Show more ausblenden, Reset zeigen
  document.getElementById("button_show_more").classList.add("d_none");
  document.getElementById("button_reset_filter").classList.remove("d_none");
}

function showBrowseMode() {
  // Normale Ansicht -> Show more zeigen, Reset ausblenden
  document.getElementById("button_show_more").classList.remove("d_none");
  document.getElementById("button_reset_filter").classList.add("d_none");
}


function resetSearch() {
  const searchInputRef = document.getElementById("search_input");
  const errorMessageRef   = document.getElementById("search_error");

  searchInputRef.value = "";
  errorMessageRef.innerHTML = "";

  isSearchActive = false;
  // lastSearchInput = "";

  renderAll();      // alle bisher geladenen
  showBrowseMode(); // Show more wieder sichtbar
}



// Lightbox

function openLightbox(i) {
  currentPokemonIndex = i;
  // const pokemonDetail = pokemonDetails[i]; // passendes Pokemon holen
  renderLightbox(); // an den Renderer übergeben
  lightboxRef.showModal(); // .showModal = Dialog/Lightbox wird geöffnet

  document.body.classList.add("no_scroll"); // Hintergrund-Scrollen verhindern
}

function renderLightbox() { //Übergabeparamter?
  const pokemonLightbox = document.getElementById("pokemon_lightbox");
  const pokemonDetail = currentPokemons[currentPokemonIndex]; 
  pokemonLightbox.innerHTML = getPokemonLightboxTempl(pokemonDetail);
}

function closeLightbox() {
  lightboxRef.close();
  document.body.classList.remove("no_scroll"); // Scrollen wieder erlauben
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




///// Lightbox-Buttons: previous/next photo /////

function showPreviousPokemon() { 
  if (currentPokemonIndex > 0) {
    currentPokemonIndex--;
  } else {
    currentPokemonIndex = currentPokemons.length - 1; // zum letzten Bild springen
  }
  renderLightbox();
}

function showNextPokemon() {
  if (currentPokemonIndex < currentPokemons.length - 1) {
    currentPokemonIndex++;
  } else {
    currentPokemonIndex = 0; // vom letzten zurück zum ersten
  }
  renderLightbox();
}

// function showNextPokemon() {
//   if (currentPhotoIndex < PHOTOS.length - 1) {
//     currentPhotoIndex++;
//   } else {
//     currentPhotoIndex = 0; // zum ersten Bild springen
//   }
//   renderLightbox();
// }





///// Fokusshift /////

// function setFocusOnTop() {
//   const elementRef = document.getElementById("headline");
//   elementRef.focus();
// }
