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
const search = document.querySelector(".search")
let pokeWeak;
let modalWeak = document.querySelector('.modal-weak-info')
const load = document.querySelector('.load')
const lista = document.querySelectorAll('li > a');
let pokeIdImg;
const loading = document.querySelector('.loading')

function FilterCardSingleTipo(i) {
  const urlType = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  Promise.resolve(urlType)
    .then((response) => response.json())
    .then((response) => {
      pokeTipo = response.types[0].type.name;
      console.log(pokeTipo)
      const pokeTipoImg = document.querySelectorAll(".card-poke-type");

      pokeTipoImg.src = `./img/icon-types/${pokeTipo}.svg`;
      cardBtn = document.querySelectorAll(".cardBtn");
      // PokeInd.src = `./img/icon-types/${pokeTipo}.svg`
    })}

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
  loading.style.display = "flex"
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
    }).then(() =>   loading.style.display = "none")

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
  console.log(event)
  modal.classList.add("active");
  idPoke = event.srcElement;
  img = event.srcElement.offsetParent.childNodes[1].firstElementChild.firstElementChild.firstElementChild
  
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
        pokeWeak = url.types[0].type.url
        console.log(pokeWeak)
        const pokeType = url.types[0].type.name;
        const bgLine = document.querySelectorAll(".line-bg");
        const modalHeight = document.querySelector(".modal-height > p");
        const modalWeight = document.querySelector(".modal-weight > p");
        const modalAbilities = document.querySelector(".modal-abilities > p");
        const typeIcon = document.querySelector(".modal-type-icon");
        typeIcon.src = `./img/icon-types/${pokeType}.svg`
        modalHeight.innerText = url.height / 10 + "m";
        modalWeight.innerText = url.weight / 10 + "kg";
        modalAbilities.innerText = url.abilities[0].ability.name;
        function typeModal(url) {
          spanType = document.querySelectorAll(".modal-type-name > span");
          console.log(spanType);
          url.types.map((type, index) => {
            console.log(type.type.name);
            spanType[index].innerHTML = type.type.name;
            spanType[index].style.color = `var(--${type.type.name})`;
            spanType[index].style.backgroundColor = `var(--bg-${type.type.name})`;
          });
        }
        url.stats.map((pokeStatus, index) => {
          stats[index].innerText = pokeStatus.base_stat;
          cardPokeImg = document.querySelector('.card-poke-img')

        });


        console.log(pokeType);
        modalBg.style.backgroundImage = `url('./img/bg-types/${pokeType}.svg')`;
        console.log(modalBg.style);
        modalId.innerText = "#" + url.id;
        
        

        modalName.innerText = url.name;
        // console.log(cardImg)
        function mudaImagem() {
          console.log(img)
          modalImg.src = img.src
          cardPokeImg = document.querySelectorAll('.card-poke-img')
          console.log(cardPokeImg)
        }
        mudaImagem()
        typeModal(url);
      function weak(pokeWeak) {
        const url = fetch(`${pokeWeak}`)
        .then((r) => r.json())
        .then((r) => {
          console.log(r)
          const weak = r;
          weak.damage_relations.double_damage_from.map((weak, index) => {
            console.log(weak)
            const spanWeak = document.createElement("span");
            modalWeak.appendChild(spanWeak)
            spanWeak.innerText = `${weak.name}`;
            spanWeak.style.color = `var(--${weak.name})`;
            spanWeak.style.backgroundColor = `var(--bg-${weak.name})`;
          })
        })
      }
      weak(pokeWeak)
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
  containerMain.innerHTML = ''
  url = fetch(`https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}/`)
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
    console.log(search.value)
  const pokeId = response.id
  pokeTipo = response.types[0].type.name;
  containerMain.innerHTML = ''
  const urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`
  const urlFoto2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`
    console.log(pokeId, urlFoto, response.name, urlFoto2,pokeTipo)
  criaCard(urlFoto, response.name, pokeId, urlFoto2);

  function aaaa(response) {
    pokeTipo = response.types[0].type.name;
    const pokeBack = document.querySelector(".card-poke-back");
    pokeBack.style.backgroundColor = `var(--${pokeTipo})`;
    const CardType = document.querySelector('.card-poke-type')
    CardType.src = `./img/icon-types/${pokeTipo}.svg`
    cardPokeImg = document.querySelector('.card-poke-img')
    load.style.display = "none"
  }
aaaa(response)

  }).then(()=> {
    FilterCardSingleTipo(search.value.toLowerCase())
    console.log('aaaaaaa')

  }) 
    

}

  search.addEventListener('keyup', (event) => {
    if (event.code == "Enter") {
      filter();
    }});
modalClose.addEventListener("click", close);

var typeName;

lista.forEach((el) => 
el.addEventListener('click', (event) => {
  typeName = el.innerText.toLowerCase()
})
);

lista.forEach((el) => 
el.addEventListener('click', filterByType)
);

function filterByType() {
  console.log(typeName)

  filterType()
  lista[0].addEventListener('click', all)
   function filterType() {
    loading.style.display = "flex"
    const url = fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    .then((r) => r.json())
    .then( (r)  => {
      console.log(r.pokemon)
      containerMain.innerHTML = '';
      r.pokemon.map((pokemon) => {
        const id = pokemon.pokemon.url.split('/')[6]
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((r) => r.json())
        .then(async (r) => {
          console.log(r)
          const urlFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
          const urlFoto2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          
           criaCard(urlFoto, r.name, id, urlFoto2);
          changeBg()
          i = 0
          ind = 1
          await escondeLoading()
        })
      })

    }).then(() => loading.style.display = "none")
  }
  

function escondeLoading(){
  loading.style.display = "none"
}

    lista[0].removeEventListener('click', filterType)

  
  function changeBg() {
    const pokeBack = document.querySelectorAll(".card-poke-back");
    pokeBack.forEach((pb) => {
      pb.style.backgroundColor = `var(--${typeName})`;
    })
    const CardType = document.querySelectorAll('.card-poke-type')
    CardType.forEach((ct) => {
      ct.src = `./img/icon-types/${typeName}.svg`
    load.style.display = "none"
    })
    
  }

}

function all() {
  containerMain.innerHTML = ""
  i = 0
  ind = 1
  pokeTipo
  containerMain.innerHTML = ""
  fetchApi()
  i = 0
  ind = 1
  load.style.display = "block"
}

filterByType()
// lista.forEach((li) => {
// li.addEventListener('click', filterByType)
// })

