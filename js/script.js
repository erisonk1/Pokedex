const pokeImg = document.querySelector('.card-poke-img');
const pokeName = document.querySelector('.card-poke-name');
const containerMain = document.querySelector('.container-main');
const pokeId = document.querySelector('.card-poke-id');
const card = document.querySelector('card');

let i = 1;
fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
.then(r => r.json())
.then(data => {
    console.log(data)
    pokeImg.src = data.sprites.other.dream_world.front_default;
    pokeName.innerText = data.name
})

function criaCard() {
    const mcard = document.createElement('div');
    containerMain.appendChild(mcard)
    mcard.classList.add('card');
    mcard.innerHTML = `
    <div class="card">
                <div class="card-center">
                 <div class="card-poke-back">
                     <img class="card-poke-img" src="./img/charizard.svg" alt="">
                 </div>
                </div> 
                
                 <p class="card-poke-id">#006</p>
                 <div class="card-center-stats"><h1 class="card-poke-name">Charizard </h1> <img class="card-poke-type" src="./img/fire.svg" alt=""></div>
                 
                 
             </div>
    `
}