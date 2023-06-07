let pokeImg = document.querySelector(".card-poke-img");
const pokeName = document.querySelectorAll(".card-poke-name");
const containerMain = document.querySelector(".container-main");

const fixModal = document.querySelector(".fix-modal");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
let cardBtn;
let card = document.querySelectorAll(".card");
let i = 0;
let ind = 1;
let pokeTipo;
let containerType = document.querySelector(".modal-type-name");
let idPoke;
let span;
let span2;

function creatModal() {
  const url = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
}

function CardSingleTipo(i) {
  const urlType = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  Promise.resolve(urlType)
    .then((response) => response.json())
    .then((response) => {
      pokeTipo = response.types[0].type.name;

      const pokeTipoImg = document.querySelectorAll(".card-poke-type");
      let PokeInd = pokeTipoImg;

      PokeInd[i - 1].src = `./img/icon-types/${pokeTipo}.svg`;
      cardBtn = document.querySelectorAll(".cardBtn");
      // PokeInd.src = `./img/icon-types/${pokeTipo}.svg`
    })

    .catch((error) => console.log("deu erro/nao carregou", error))
    .finally();
}
function fetchSingleApi(ind) {
  const urlType = fetch(`https://pokeapi.co/api/v2/pokemon/${ind}/`);
  Promise.resolve(urlType)
    .then((response) => response.json())
    .then((response) => {
      pokeTipo = response.types[0].type.name;

      const pokeBack = document.querySelectorAll(".card-poke-back");
      const PokeInd = pokeBack[ind - 1];
      PokeInd.style.backgroundColor = `var(--${pokeTipo})`;
    })

    .catch((error) => console.log("deu erro/nao carregou", error))
    .finally();
}

function fetchApi() {
  const url = fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${ind - 1}`
  );
  Promise.resolve(url)
    .then((response) => response.json())
    .then((response) => {
      const pokeLista = response.results;
      pokeLista.map((pokemon) => {
        const pokeId = pokemon.url.split("/")[6];

        var urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
        var urlFoto2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
        fetchSingleApi(ind);
        criaCard(urlFoto, pokemon.name, pokeId, urlFoto2, pokeTipo);
        CardSingleTipo(ind);
        ind++;
      });
      i = i + 20;
    })

    .catch((erro) => console.log("deu erro/nao carregouuuuuuuuuu", erro))
    .finally();
}

function criaCard(urlFoto, nome, pokeId, urlFoto2) {
  const mcard = document.createElement("div");
  containerMain.appendChild(mcard);

  if (pokeId < 649) {
    mcard.innerHTML = `
  <button class="cardBtn" onclick="handleEvent(event)" id="${pokeId}"> 

    <div class="card">
                <div class="card-center">
                 <div class="card-poke-back">
                     <img class="card-poke-img" src="${urlFoto}" alt="">
                 </div>
                </div> 
                
                 <p class="card-poke-id">#${pokeId}</p>
                 <div class="card-center-stats"><h1 class="card-poke-name">${nome}</h1> <img class="card-poke-type" src="./img/fire.svg" alt=""></div>
                 
                 
             </div>
             <div class="card-id" id="${pokeId}">  <div>  
<button> 
             `;
  }
  if (pokeId >= 649) {
    mcard.innerHTML = `
<button class="cardBtn" onclick="handleEvent(event)>      

  <div class="card">
                  <div class="card-center">
                   <div class="card-poke-back">
                       <img class="card-poke-img card-poke-img2" src="${urlFoto2}" alt="">
                   </div>
                  </div> 
                  
                   <p class="card-poke-id">#${pokeId}</p>
                   <div class="card-center-stats"><h1 class="card-poke-name">${nome}</h1> <img class="card-poke-type" src="./img/fire.svg" alt=""></div>
                   
                   
               </div>
               <div class="card-id" id="${pokeId}">  <div>  
<button>
      `;
  }

  card = document.querySelectorAll(".card");
}

fetchApi();

function handleEvent(event) {
  fixModal.classList.add("active");
  modal.classList.add("active");
  idPoke = event.srcElement;
  // console.log(idPoke.id)
  function useModal() {
    const url = fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke.id}/`);
    Promise.resolve(url)
      .then((url) => url.json())
      .then((url) => {
        const modalImg = document.querySelector(".modal-img-poke");
        const modalName = document.querySelector(".modal-poke-name");
        const cardImg = document.querySelectorAll(".card-poke-img");
        const modalId = document.querySelector(".modal-poke-id");
        const modalBg = document.querySelector(".modal-bg-type");
        const pokeType = url.types[0].type.name;
        const bgLine = document.querySelectorAll(".line-bg");
        const modalHeight = document.querySelector(".modal-height > p");
        const modalWeight = document.querySelector(".modal-weight > p");
        const modalAbilities = document.querySelector(".modal-abilities > p");
        modalHeight.innerText = url.height / 10 + "m";
        modalWeight.innerText = url.weight / 10 + "kg";
        modalAbilities.innerText = url.abilities[0].ability.name;
        for (i = 0; i < url.types.length; i++) {
          const createType = document.createElement("span");
          containerType.appendChild(createType);
          createType.innerHTML = url.types[i].type.name;
        }

        for (i = 0; i < bgLine.length; i++) {
          bgLine[i].style.width = +url.stats[i].base_stat / 1.6 + "%";
        }
        console.log(pokeType);
        modalBg.style.backgroundImage = `url('./img/bg-types/${pokeType}.svg')`;
        console.log(modalBg.style);
        modalId.innerText = "#" + url.id;
        // console.log(url.name)
        modalName.innerText = url.name;
        // console.log(cardImg)
        modalImg.src = cardImg[idPoke.id - 1].src;
      })
      .then((url) => {
        changeBgType();
      });
  }
  useModal(idPoke.id);
  changeCategory(idPoke.id);
}

function changeCategory(idPoke) {
  const url = fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPoke}`);
  Promise.resolve(url)
    .then((response) => response.json())
    .then((response) => {
      const modalCategory = document.querySelector(".modal-category p");
      const categoryName = response.genera[7].genus;
      modalCategory.innerText = categoryName.split(" ")[0];
    });
}

function close() {
  modal.classList.remove("active");
  fixModal.classList.remove("active");
   span = document.querySelectorAll(".modal-type-name > span");
   span2 = document.querySelectorAll(".modal-weak-info > span");
  for (i = 0; i < span.length; i++) span[i].remove();
  for (i = 0; i < span2.length; i++) span2[i].remove();
}
function changeBgType() {
  span = document.querySelectorAll(".modal-type-name > span");
  span2 = document.querySelectorAll(".modal-weak-info > span");
  for (i = 0; i < span.length; i++) {
    console.log(span[i].innerHTML);
    span[i].style.backgroundColor = `var(--bg-${span[i].innerHTML})`;
    span[i].style.color = `var(--${span[i].innerHTML})`;

  }
  return span;
}

modalClose.addEventListener("click", close);
