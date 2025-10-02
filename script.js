////////////////// variables //////////////////

const maxHP = 255;
const maxAttack = 190;
const maxDefense = 250;
const maxSpecialAttack = 194;
const maxSpecialDefense = 250;
const maxSpeed = 200;

const galleryRef = document.getElementById("pokemon_gallery");
const lightboxRef = document.getElementById("lightbox");

const limit = 40; // immer eine bestimmte Anzahl an Pokémons laden
let currentOffset = 0; // Zum Leden der Pokemons --> So merke ich mir, wie weit ich beim Laden schon gekommen bin

let loadedPokemons = []; // Array mit allen geladenen Pokemons (einzelne Pokémons als Objekt)
let visiblePokemons = []; // für die Filter-Funktion --> diese werden in der Gallery angezeigt
let activePokemonIndex = 0; // merkt sich, welches Pokémon in der Lightbox angezeigt wird

////////////////// functions //////////////////

async function init() {
  showLoadingSpinner();
  await loadPokemons(limit);
  renderLoadedPokemons();
  showShowMoreButton();
  hideLoadingSpinner();
}

////// pokémon gallery //////

async function loadPokemons(limit) {
  // LISTE der Pokémon holen:
  let listResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`
  );
  let pokemonList = await listResponse.json(); // in ein JSON umwandeln --> Den Variablenzusatz "AsJson" lasse ich weg, da das schon aus dem Code ersichtlich ist.

  // Für jedes Pokémon aus der Liste die DETAILS holen:
  for (let i = 0; i < pokemonList.results.length; i++) {
    let detailResponse = await fetch(pokemonList.results[i].url); // Über die URL die Details dieses Pokémons abrufen.
    let fetchedPokemon = await detailResponse.json(); // in ein JSON umwandeln (s.o.)

    loadedPokemons.push(fetchedPokemon); // Die Detaildaten werden im globalen Array (jeweils als Objekt) gespeichert.
  }
}

function renderLoadedPokemons() {
  visiblePokemons = loadedPokemons;
  renderVisiblePokemons();
}

function renderVisiblePokemons() {
  galleryRef.innerHTML = "";

  for (let i = 0; i < visiblePokemons.length; i++) {
    const pokemon = visiblePokemons[i];
    const typeName = pokemon.types[0].type.name;
    galleryRef.innerHTML += getPokemonCardTempl(pokemon, typeName, i);
  }
}

////// pokémon search //////

function applySearch() {
  const searchInputRef = document.getElementById("search_input");
  const searchInput = searchInputRef.value.trim().toLowerCase();
  const errorMessageRef = document.getElementById("search_error");

  showLoadingSpinner();

  // Fehlermeldung, wenn < 3 Buchstaben in das Suchfeld eingegeben werden
  if (searchInput.length < 3) {
    errorMessageRef.innerHTML = `<span class='error'>Please enter at least 3 letters.</span>`;
    hideLoadingSpinner();
    return;
  }

  const results = loadedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchInput) // pokémons sind in der API klein geschrieben
  );

  if (results.length === 0) {
    galleryRef.innerHTML = `<span class='no_search_result'>Uuuups, no Pokémon found.</span>`;
    showResetSearchButton(); // Der Button ändert sich von "show more" zu "reset search"
    hideLoadingSpinner();
    return;
  }

  // gültige Suche mit Treffern --> Filter anzeigen
  errorMessageRef.innerHTML = "";
  visiblePokemons = results;
  renderVisiblePokemons();
  showResetSearchButton();
  hideLoadingSpinner();
}

function showResetSearchButton() {
  document.getElementById("button_show_more").classList.add("d_none");
  document.getElementById("button_reset_search").classList.remove("d_none");
}

function showShowMoreButton() {
  document.getElementById("button_show_more").classList.remove("d_none");
  document.getElementById("button_reset_search").classList.add("d_none");
}

async function resetSearch() {
  showLoadingSpinner();
  await new Promise(requestAnimationFrame); // damit der Loading-Spinner Zeit hat, angezeigt zu werden 

  const searchInputRef = document.getElementById("search_input");
  const errorMessageRef = document.getElementById("search_error");

  searchInputRef.value = "";
  errorMessageRef.innerHTML = "";

  renderLoadedPokemons(); // alle bisher geladenen
  showShowMoreButton(); // Show more-Button ist wieder sichtbar
  hideLoadingSpinner();
}

////// Lightbox (Pokémon Cards) //////

function openLightbox(i) {
  activePokemonIndex = i;
  renderLightbox();
  lightboxRef.showModal(); // .showModal = Dialog/Lightbox wird geöffnet

  document.body.classList.add("no_scroll"); // Hintergrund-Scrollen verhindern
}

function renderLightbox() {
  const pokemonLightboxRef = document.getElementById("pokemon_lightbox");
  const activePokemon = visiblePokemons[activePokemonIndex];
  const typeName = activePokemon.types[0].type.name;
  pokemonLightboxRef.innerHTML = getPokemonLightboxTempl(
    activePokemon,
    typeName
  );
}

function getTypeIcons(pokemonDetail) {
  let galleryHtml = "";

  for (let i = 0; i < pokemonDetail.types.length; i++) {
    let typeName = pokemonDetail.types[i].type.name;
    galleryHtml += getTypeIconsTempl(typeName);
  }

  return galleryHtml;
}

function closeLightbox() {
  lightboxRef.close();
  document.body.classList.remove("no_scroll"); // Scrollen wieder erlauben
}

function closeLightboxBubblingProtection(event) {
  event.stopPropagation(); // bei den Event "click" wird der Bubbling-Effekt (also das Durchgreifen auf die unteren Ebenen) vermieden
}

function showMainTab() {
  // Tabs
  document.getElementById("button_main").classList.add("active");
  document.getElementById("button_stats").classList.remove("active");

  // Inhalte
  document.getElementById("tab_main").style.display = "block";
  document.getElementById("tab_stats").style.display = "none";
}

function getAbilities(activePokemon) {
  let abilitiesHtml = "";
  for (let i = 0; i < activePokemon.abilities.length; i++) {
    if (i > 0) {
      abilitiesHtml += `, <br>`;
    }
    abilitiesHtml += activePokemon.abilities[i].ability.name;
  }
  return abilitiesHtml;
}

function switchToStatsTab() {
  document.getElementById("button_main").classList.remove("active");
  document.getElementById("button_stats").classList.add("active");
  document.getElementById("tab_main").style.display = "none";
  document.getElementById("tab_stats").style.display = "block";
}

function fillStatsValues(activePokemon) {
  document.getElementById("stat_hp").innerHTML = getBaseStat(activePokemon, "hp");
  document.getElementById("stat_attack").innerHTML = getBaseStat(
    activePokemon,
    "attack"
  );
  document.getElementById("stat_defense").innerHTML = getBaseStat(
    activePokemon,
    "defense"
  );
  document.getElementById("stat_special_attack").innerHTML = getBaseStat(
    activePokemon,
    "special-attack"
  );
  document.getElementById("stat_special_defense").innerHTML = getBaseStat(
    activePokemon,
    "special-defense"
  );
  document.getElementById("stat_speed").innerHTML = getBaseStat(
    activePokemon,
    "speed"
  );
}

function getBaseStat(pokemonDetail, statName) {
  for (let i = 0; i < pokemonDetail.stats.length; i++) {
    const statEntry = pokemonDetail.stats[i];

    // Prüfen, ob der Name mit dem gesuchten übereinstimmt:
    if (statEntry.stat.name === statName) {
      return statEntry.base_stat;
    }
  }
}

function fillStatsBars(activePokemon) {
  setBarWidth("bar_hp", getBaseStat(activePokemon, "hp"), maxHP);
  setBarWidth("bar_attack", getBaseStat(activePokemon, "attack"), maxAttack);
  setBarWidth("bar_defense", getBaseStat(activePokemon, "defense"), maxDefense);
  setBarWidth(
    "bar_special_attack",
    getBaseStat(activePokemon, "special-attack"),
    maxSpecialAttack
  );
  setBarWidth(
    "bar_special_defense",
    getBaseStat(activePokemon, "special-defense"),
    maxSpecialDefense
  );
  setBarWidth("bar_speed", getBaseStat(activePokemon, "speed"), maxSpeed);
}

function setBarWidth(barElementId, statValue, maxValue) {
  const barElement = document.getElementById(barElementId);
  const percentage = Math.round((statValue / maxValue) * 100); // Prozentualen Anteil zum MAX berechnen
  barElement.style.width = percentage + "%"; // Breite des inneren Balkens setzen
}

function showStatsTab() {
  switchToStatsTab();
  const activePokemon = visiblePokemons[activePokemonIndex];
  fillStatsValues(activePokemon);
  fillStatsBars(activePokemon);
}

///// Lightbox-Buttons: previous/next pokémon /////

function showPreviousPokemon() {
  if (activePokemonIndex > 0) {
    activePokemonIndex--;
  } else {
    activePokemonIndex = visiblePokemons.length - 1; // zum letzten Pokémon springen
  }
  renderLightbox();
}

function showNextPokemon() {
  if (activePokemonIndex < visiblePokemons.length - 1) {
    activePokemonIndex++;
  } else {
    activePokemonIndex = 0; // vom letzten zurück zum ersten Pokémon
  }
  renderLightbox();
}

////// load more Pokémons //////

async function loadMore() {
  showLoadingSpinner();

  const buttonShowMore = document.getElementById("button_show_more");
  buttonShowMore.disabled = true;

  currentOffset += limit;
  await loadPokemons(limit);
  renderLoadedPokemons();

  buttonShowMore.disabled = false;
  hideLoadingSpinner();
}

///// Loading-Spinner (as Overlay) /////

function showLoadingSpinner() {
  document.getElementById("loading_spinner").style.display = "flex";
  document.body.classList.add("no_scroll");
}

function hideLoadingSpinner() {
  document.getElementById("loading_spinner").style.display = "none";
  document.body.classList.remove("no_scroll");
}

///// Fokusshift /////

function setFocusOnTop() {
  const elementRef = document.getElementById("headline");
  elementRef.focus();
}
