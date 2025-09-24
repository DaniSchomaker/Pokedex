function init() {
  showPokemon();
}

async function showPokemon() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/1"); // #TODO: mehrere holen // liefert ein OBJEKT
  let responseAsJson = await response.json();

  console.log(responseAsJson.forms[0].name);
}
