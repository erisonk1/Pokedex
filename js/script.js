let pokeImg = document.querySelector(".card-poke-img");
const pokeName = document.querySelectorAll(".card-poke-name");
const containerMain = document.querySelector(".container-main");
const stats = document.querySelectorAll(".num");
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
let spanType;
let cardPokeImg;
const search = document.querySelector(".search");
let pokeWeak;
let modalWeak = document.querySelector(".modal-weak-info");
const load = document.querySelector(".load");
const lista = document.querySelectorAll("li > a");
let pokeIdImg;
const loading = document.querySelector(".loading");

function FilterCardSingleTipo(i) {
  const urlType = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  Promise.resolve(urlType)
    .then((response) => response.json())
    .then((response) => {
      pokeTipo = response.types[0].type.name;
      const pokeTipoImg = document.querySelectorAll(".card-poke-type");

      pokeTipoImg.src = `./img/icon-types/${pokeTipo}.svg`;
      cardBtn = document.querySelectorAll(".cardBtn");
      // PokeInd.src = `./img/icon-types/${pokeTipo}.svg`
    });
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

function fetchApi(i) {
  loading.style.display = "flex";
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
        criaCard(urlFoto, pokemon.name, pokeId, urlFoto2);
        CardSingleTipo(ind);
        ind++;
      });
      i = i + 20;
    })
    .then(() => setTimeout(() => (loading.style.display = "none")))

    .catch((erro) => console.log("deu erro/nao carregouuuuuuuuuu", erro))
    .finally();
}

function criaCard(urlFoto, nome, pokeId, urlFoto2) {
  const mcard = document.createElement("div");
  containerMain.appendChild(mcard);

  if (pokeId < 649) {
    mcard.innerHTML = `
  <button class="cardBtn" onclick="openCard(event)" id="${pokeId}"> 

    <div class="card">
                <div class="card-center">
                 <div class="card-poke-back">
                     <img class="card-poke-img" id="${pokeIdImg}" src="${urlFoto}" alt="">
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
<button class="cardBtn" onclick="openCard(event)" id="${pokeId}">      

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

function openCard(event) {
  fixModal.classList.add("active");
  modal.classList.add("active");
  idPoke = event.srcElement;
  img =
    event.srcElement.offsetParent.childNodes[1].firstElementChild
      .firstElementChild.firstElementChild;

  function useModal(event) {
    const url = fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke.id}/`);
    Promise.resolve(url)
      .then((url) => url.json())
      .then((url) => {
        let modalImg = document.querySelector(".modal-img-poke");
        const modalName = document.querySelector(".modal-poke-name");
        const cardImg = document.querySelectorAll(".card-poke-img");
        const modalId = document.querySelector(".modal-poke-id");
        const modalBg = document.querySelector(".modal-bg-type");
        pokeWeak = url.types[0].type.url;
        const pokeType = url.types[0].type.name;
        const bgLine = document.querySelectorAll(".line-bg");
        const modalHeight = document.querySelector(".modal-height > p");
        const modalWeight = document.querySelector(".modal-weight > p");
        const modalAbilities = document.querySelector(".modal-abilities > p");
        const typeIcon = document.querySelector(".modal-type-icon");
        typeIcon.src = `./img/icon-types/${pokeType}.svg`;
        modalHeight.innerText = url.height / 10 + "m";
        modalWeight.innerText = url.weight / 10 + "kg";
        modalAbilities.innerText = url.abilities[0].ability.name;

        function typeModal(url) {
          spanType = document.querySelectorAll(".modal-type-name > span");


          url.types.map((type, index) => {
            spanType[index].innerHTML = type.type.name;
            spanType[index].style.color = `var(--${type.type.name})`;
            spanType[
              index
            ].style.backgroundColor = `var(--bg-${type.type.name})`;
          });
        }
        url.stats.map((pokeStatus, index) => {
          stats[index].innerText = pokeStatus.base_stat;
          cardPokeImg = document.querySelector(".card-poke-img");
        });

        modalBg.style.backgroundImage = `url('./img/bg-types/${pokeType}.svg')`;
        modalId.innerText = "#" + url.id;

        modalName.innerText = url.name;
        function mudaImagem() {
          modalImg.src = img.src;
          cardPokeImg = document.querySelectorAll(".card-poke-img");
        }
        mudaImagem();
        typeModal(url);
        function weak(pokeWeak) {
          const url = fetch(`${pokeWeak}`)
            .then((r) => r.json())
            .then((r) => {
              const weak = r;
              weak.damage_relations.double_damage_from.map((weak, index) => {
                const spanWeak = document.createElement("span");
                modalWeak.appendChild(spanWeak);
                spanWeak.innerText = `${weak.name}`;
                spanWeak.style.color = `var(--${weak.name})`;
                spanWeak.style.backgroundColor = `var(--bg-${weak.name})`;
              });
            });
        }
        weak(pokeWeak);
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
  spanType[1].innerHTML = "";
  spanType[1].style.backgroundColor = "transparent";
  modalWeak.innerHTML = "";
}

function filter() {
  containerMain.innerHTML = "";
  url = fetch(
    `https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`
  )
    .then((response) => response.json())
    .then((response) => {

      const pokeId = response.id;
      pokeTipo = response.types[0].type.name;
      containerMain.innerHTML = "";
      const urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
      const urlFoto2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
      criaCard(urlFoto, response.name, pokeId, urlFoto2);

      function aaaa(response) {
        pokeTipo = response.types[0].type.name;
        const pokeBack = document.querySelector(".card-poke-back");
        pokeBack.style.backgroundColor = `var(--${pokeTipo})`;
        const CardType = document.querySelector(".card-poke-type");
        CardType.src = `./img/icon-types/${pokeTipo}.svg`;
        cardPokeImg = document.querySelector(".card-poke-img");
        load.style.display = "none";
      }
      aaaa(response);
    })
    .then(() => {
      FilterCardSingleTipo(search.value.toLowerCase());
    });
}

search.addEventListener("keyup", (event) => {
  if (event.code == "Enter" || event.code == "NumpadEnter") {
    filter();
  }
});
modalClose.addEventListener("click", close);

var typeName;

lista.forEach((el) =>
  el.addEventListener("click", (event) => {
    typeName = el.innerText.toLowerCase();
  })
);

lista.forEach((el) => el.addEventListener("click", filterByType));
function filterType() {
  loading.style.display = "flex";
  const url = fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    .then((r) => r.json())
    .then((r) => {
      containerMain.innerHTML = "";
      r.pokemon.map((pokemon) => {
        const id = pokemon.pokemon.url.split("/")[6];
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          .then((r) => r.json())
          .then(async (r) => {
            const urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
            const urlFoto2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            criaCard(urlFoto, r.name, id, urlFoto2);
            changeBg();
            i = 0;
            ind = 1;
            escondeLoading();
          });
      });
    })
    .then(() => setTimeout(() => (loading.style.display = "none"), 20000));
}
function changeBg() {
  const pokeBack = document.querySelectorAll(".card-poke-back");
  pokeBack.forEach((pb) => {
    pb.style.backgroundColor = `var(--${typeName})`;
  });
  const CardType = document.querySelectorAll(".card-poke-type");
  CardType.forEach((ct) => {
    ct.src = `./img/icon-types/${typeName}.svg`;
    load.style.display = "none";
  });
}
function escondeLoading() {
  loading.style.display = "none";
}
function filterByType() {


  filterType();
  lista[0].addEventListener("click", all);



  lista[0].removeEventListener("click", filterType);

 
}

function all() {
  containerMain.innerHTML = "";
  i = 0;
  ind = 1;
  pokeTipo;
  containerMain.innerHTML = "";
  fetchApi();
  i = 0;
  ind = 1;
  load.style.display = "block";
}

// lista.forEach((li) => {
// li.addEventListener('click', filterByType)
// })

const imgFilter = document.querySelector(".open-nav > img");
const btnFilter = document.querySelector(".open-nav");

const nav = document.querySelector("nav");
function openNav() {
  nav.classList.toggle("active");
  imgFilter.classList.toggle("agctive");
  btnFilter.classList.toggle("active");
}

const btnTop = document.querySelector(".btn-top");

function voltarTopo() {
  console.log(window.scrollY);
  if (window.scrollY >= 1581) {
    btnTop.classList.add("visible");
  } else {
    btnTop.classList.remove("visible");
  }
}

btnTop.addEventListener("click", function() {
  window.scrollTo(0, 848);
});

window.addEventListener("scroll", voltarTopo);


