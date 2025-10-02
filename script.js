let pokemonDetails = []; // Array mit allen Pokemons (jeweils als Objekt)
let currentPokemons = []; // für die Filter-Funktion
let currentPokemonIndex = 0; // merkt sich, welches Pokémon in der Lightbox angezeigt wird

const lightboxRef = document.getElementById("lightbox");

let currentOffset = 0; // Start bei 0 --> So merke ich mir, wie weit ich schon gekommen bin
let limit = 40; // immer eine bestimmte Anzahl an Pokémons laden

let isSearchActive = false; // für Suchfunktion


const maxHP = 255;
const maxAttack = 190;
const maxDefense = 250;
const maxSpecialAttack = 194;
const maxSpecialDefense = 250;
const maxSpeed = 200;

////// functions //////

async function init() {
  showLoadingSpinner();
  await loadPokemons(limit);
  renderAll();
  showBrowseMode();
  hideLoadingSpinner();
}

async function loadPokemons(limit) {
  // LISTE der Pokémon holen:
  let listResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`
  );
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
  showLoadingSpinner();

  const searchInputRef = document.getElementById("search_input");
  const searchInput = searchInputRef.value.trim().toLowerCase();

  const errorMessageRef = document.getElementById("search_error");

  // Fehlermeldung, wenn < 3 Buchstaben in das Suchfeld eingegeben werden
  if (searchInput.length < 3) {
    errorMessageRef.innerHTML = `<span class='error'>Please enter at least 3 letters.</span>`;
    hideLoadingSpinner();
    return;
  }

  const results = pokemonDetails.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchInput)
  );

  if (results.length === 0) {
    const galleryRef = document.getElementById("pokemon_gallery"); // global definieren, da doppelt?
    galleryRef.innerHTML = `<span class='error'>Uuuups, no Pokémon found.</span>`;
    showFilterMode(); // Der Button ändert sich von "show more" zu "clear search"
    hideLoadingSpinner();
    return;
  }

  // gültige Suche mit Treffern -> Filter anzeigen
  errorMessageRef.innerHTML = "";
  isSearchActive = true;

  currentPokemons = results;
  renderCurrentPokemons();
  showFilterMode();
  hideLoadingSpinner();
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
  showLoadingSpinner();

// await new Promise(requestAnimationFrame); //////////////////////////

  const buttonShowMore = document.getElementById("button_show_more");
  buttonShowMore.disabled = true;

  currentOffset += limit;
  await loadPokemons(limit);
  renderAll();

  buttonShowMore.disabled = false;
  hideLoadingSpinner();
}

function showFilterMode() {
  // Suche aktiv -> Show more ausblenden, Reset zeigen
  document.getElementById("button_show_more").classList.add("d_none");
  document.getElementById("button_reset_filter").classList.remove("d_none");
}

function showBrowseMode() {
  // Normale Ansicht -> Show more zeigen, Reset ausblenden
  document.getElementById("button_show_more").classList.remove("d_none"); // mit style?
  document.getElementById("button_reset_filter").classList.add("d_none");
}

async function resetSearch() {
  showLoadingSpinner();
  // await new Promise(requestAnimationFrame); /////////////////////////////////
  await new Promise(r => setTimeout(r, 120)); ///////////////////////////////

  const searchInputRef = document.getElementById("search_input");
  const errorMessageRef = document.getElementById("search_error");

  searchInputRef.value = "";
  errorMessageRef.innerHTML = "";

  isSearchActive = false;

  renderAll(); // alle bisher geladenen
  showBrowseMode(); // Show more wieder sichtbar
  hideLoadingSpinner();
}

// Lightbox

function openLightbox(i) {
  currentPokemonIndex = i;
  // const pokemonDetail = pokemonDetails[i]; // passendes Pokemon holen
  renderLightbox(); // an den Renderer übergeben
  lightboxRef.showModal(); // .showModal = Dialog/Lightbox wird geöffnet

  document.body.classList.add("no_scroll"); // Hintergrund-Scrollen verhindern
}

function renderLightbox() {
  //Übergabeparamter?
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
  // Tabs umschalten
  document.getElementById("button_main").classList.remove("active");
  document.getElementById("button_stats").classList.add("active");
  document.getElementById("tab_main").style.display = "none"; 
  document.getElementById("tab_stats").style.display = "block";

  // Aktuelles Pokémon bestimmen
  const currentPokemon = currentPokemons[currentPokemonIndex]; // vielleicht als globale Variable???

  // Werte setzen
  document.getElementById("stat_hp").innerText = getBaseStat(currentPokemon, "hp");
  document.getElementById("stat_attack").innerText = getBaseStat(currentPokemon, "attack");
  document.getElementById("stat_defense").innerText = getBaseStat(currentPokemon, "defense");
  document.getElementById("stat_special_attack").innerText = getBaseStat(currentPokemon, "special-attack");
  document.getElementById("stat_special_defense").innerText = getBaseStat(currentPokemon, "special-defense");
  document.getElementById("stat_speed").innerText = getBaseStat(currentPokemon, "speed");

  // Balken setzen
  setBarWidth("bar_hp",              getBaseStat(currentPokemon, "hp"),              255);
  setBarWidth("bar_attack",          getBaseStat(currentPokemon, "attack"),          190);
  setBarWidth("bar_defense",         getBaseStat(currentPokemon, "defense"),         250);
  setBarWidth("bar_special_attack",  getBaseStat(currentPokemon, "special-attack"),  194);
  setBarWidth("bar_special_defense", getBaseStat(currentPokemon, "special-defense"), 250);
  setBarWidth("bar_speed",           getBaseStat(currentPokemon, "speed"),           200);
}









function getBaseStat(pokemonDetail, statName) {
  // Wenn keine Daten da sind, gib einfach "-" zurück
  // if (!pokemonDetail || !pokemonDetail.stats) {
  //   return "-";
  // }

  // Alle Stat-Einträge durchgehen
  for (let i = 0; i < pokemonDetail.stats.length; i++) {
    const statEntry = pokemonDetail.stats[i]; 

    // Prüfen, ob der Name mit dem gesuchten übereinstimmt
    if (statEntry.stat.name === statName) {
      return statEntry.base_stat; // z. B. 45
    }
  }

  // Falls nichts gefunden → Standardwert ///// RAUS?
  return "-";
}

function setBarWidth(barElementId, statValue, maxValue) {
  const barElement = document.getElementById(barElementId);

  // Prozentualen Anteil berechnen
  const percentage = Math.round((statValue / maxValue) * 100);

  // Breite des inneren Balkens setzen
  barElement.style.width = percentage + "%";
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

///// Loading-Spinner /////

function showLoadingSpinner() {
  document.getElementById("loading_spinner").style.display = "flex";
}

function hideLoadingSpinner() {
  document.getElementById("loading_spinner").style.display = "none";
}

///// Fokusshift /////

// function setFocusOnTop() {
//   const elementRef = document.getElementById("headline");
//   elementRef.focus();
// }
