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




function openLightbox(i) {
  // currentPhotoIndex = i; // ToDo umbenennen // brauche ich das?
  const pokemonDetail = pokemonDetails[i]; // passendes Pokemon holen
  renderLightbox(pokemonDetail); // an den Renderer übergeben
  lightboxRef.showModal(); // .showModal = Dialog/Lightbox wird geöffnet
}

function renderLightbox(pokemonDetail) { //Übergabeparamter?
  const pokemonLightbox = document.getElementById("pokemon_lightbox");
  // const headerLightbox = document.getElementById("header_lightbox");
  // const imgLightbox = document.getElementById("img_lightbox");
  // const footerLightbox = document.getElementById("footer_lightbox");

  pokemonLightbox.innerHTML = getPokemonLightboxTempl(pokemonDetail);

  // headerLightbox.innerHTML = getHeaderLightboxTemplate(pokemonDetail);
  // imgLightbox.innerHTML = getImgLightboxTemplate(pokemonDetail);
  // footerLightbox.innerHTML = getFooterLightboxTemplate();
}

function closeLightbox() {
  lightboxRef.close();
}

function closeLightboxBubblingProtection(event) {
  event.stopPropagation(); // bei den Event "click" wird der Bubbling-Effekt (also das Durchgreifen auf die unteren Ebenen) vermieden
}




///// Fokusshift /////

// function setFocusOnTop() {
//   const elementRef = document.getElementById("headline");
//   elementRef.focus();
// }
