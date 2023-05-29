const pokeImage = document.querySelectorAll('.poke-image');
const pokeName = document.querySelector('.poke-name');
const btn = document.querySelector('.passbtn');
const containerMain = document.querySelector('.container-main');
const info = document.querySelectorAll('.infos');

var idx = 1
function passarIDX() {
    idx++;
    buscaPokemon(idx);
}
btn.addEventListener('click', passarIDX)



function pagination(){
    containerMain.innerHTML = containerMain.innerHTML + `<div class="infos">
    <div class="back"><img class="poke-image" src="" alt=""></div>
     <h3 class="poke-name"></h3>
 </div>`;
}

function buscaPokemon(id){
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(r => r.json())
.then(pokeSearch => {
    console.log(pokeSearch);
    pokeImage.src = pokeSearch.sprites.other.dream_world.front_default;
    pokeName.innerText = pokeSearch.name;
})
}
buscaPokemon(idx);
console.log(btn)