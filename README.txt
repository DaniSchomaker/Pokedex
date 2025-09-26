# Pokédex-Projekt

## Aufbau der PokéAPI
Die PokéAPI ist zweistufig aufgebaut:

1. **Liste (Inhaltsverzeichnis)**  
   Beispiel: https://pokeapi.co/api/v2/pokemon?limit=10&offset=0  
   --> liefert ein Objekt, ua mit der Property 'results'.  
   --> 'results' enthält nur den NAMEN des Pokemons und die URL zu den Details.

2. **Details**  
   Beispiel: https://pokeapi.co/api/v2/pokemon/1  
   --> liefert ein Objekt mit alle Informationen zu genau einem Pokémon, zB:  
       - 'id'          
       - 'name'        
       - 'sprites'   (Bilder)  
       - 'types'     (zB grass, poison)  
       - 'stats'     (zB hp [Lebenspunkte], attack, defense)  

## Code
- Zuerst wird die Pokémon-Liste (mit Namen + URLs) abgerufen.  
- Anschließend wird für jedes Pokémon die Detail-URL aufgerufen.  
- Die Detailobjekte werden im globalen Array 'pokemonDetails' gespeichert.  
- Mit diesen Detaildaten (id, name, sprite, types, stats …) werden die Karten für die Galerie im HTML erzeugt.  

## Wichtig
- Der Listen-Endpunkt dient nur als "Wegweiser", um an die Detail-URLs zu gelangen.  
- Alle relevanten Daten für die Anzeige stammen aus den Details.  
