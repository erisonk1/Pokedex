const pokeImg = document.querySelector(".card-poke-img");
const pokeName = document.querySelectorAll(".card-poke-name");
const containerMain = document.querySelector(".container-main");
const pokeId = document.querySelector(".card-poke-id");
let card = document.querySelectorAll(".card");
let i = 0;
let ind = 1;
function fetchSingleApi(ind) {

  const urlType = fetch(`https://pokeapi.co/api/v2/pokemon/${ind}/`);
  Promise.resolve(urlType)
    .then((response2) => response2.json())
    .then((response2) => {
      console.log(response2)
  
      const pokeTipo = response2.types[0].type.name;
      console.log(pokeTipo);
      const pokeBack = document.querySelectorAll(".card-poke-back");
      const PokeInd = pokeBack[ind - 1];
      PokeInd.style.backgroundColor = `var(--${pokeTipo})`
  
      



  //     pokeBack.forEach((item) => {
  //       item.style.backgroundColor = `var(--${pokeTipo})`;
  //       ind++
  //     });

  //     console.log(pokeBack[ind]);

  //     console.log(pokeBack);
      

    })

    .catch((error) => console.log("deu erro/nao carregou", error))
    .finally();
}

function fetchApi() {
  console.log(i);
  const url = fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${i}`);
  Promise.resolve(url)
    .then((response) => response.json())
    .then((response) => {
      const pokeLista = response.results;
      pokeLista.map((pokemon) => {
        // console.log(pokemon)
        const pokeId = pokemon.url.split("/")[6];
        // console.log(pokeId)
        const urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
        criaCard(urlFoto, pokemon.name, pokeId);
        fetchSingleApi(ind);
        ind++
      });
      i = i + 20;
    })
    .catch(() => console.log("deu erro/nao carregouuuuuuuuuu"))
    .finally();
}

function criaCard(urlFoto, nome, pokeId) {
  const mcard = document.createElement("div");
  containerMain.appendChild(mcard);

  mcard.innerHTML = `
    <div class="card">
                <div class="card-center">
                 <div class="card-poke-back">
                     <img class="card-poke-img" src="${urlFoto}" alt="">
                 </div>
                </div> 
                
                 <p class="card-poke-id">#${pokeId}</p>
                 <div class="card-center-stats"><h1 class="card-poke-name">${nome}</h1> <img class="card-poke-type" src="./img/fire.svg" alt=""></div>
                 
                 
             </div>
    `;
  card = document.querySelectorAll(".card");
}
fetchApi();
