const pokeImage = document.querySelector('.poke-image');
const pokeName = document.querySelector('.poke-name');
const btn = document.querySelector('.passbtn');
var idx = 1
function passarIDX() {
    idx++;
    buscaPokemon(idx);
}
btn.addEventListener('click', passarIDX)






function buscaPokemon(id){
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(r => r.json())
.then(pokeSearch => {
    console.log(pokeSearch);
    pokeImage.src = pokeSearch.sprites.front_default;
    pokeName.innerText = pokeSearch.name;
})
}

console.log(btn)