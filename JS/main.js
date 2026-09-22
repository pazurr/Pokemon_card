let sherchBar = document.querySelector('.sherchPokemonCrad');
let cardsContener = document.querySelector('.card-contner');
let loadeMore = document.querySelector('.loadeMore');
let reloadCard = document.querySelector('.reload')
let messageEror = document.querySelector('.messageEror')
let carte_Unique = document.querySelector('.carte-Unique')
let visible = document.querySelector('.visible')
let cartes = document.querySelector('.cartes')
let all_prices = document.querySelector('.all-prices')
let body = document.querySelector('body')
let lettre = "";
let valuePage = 1;
let URL ;
let debounceTimer;
let totalCard;
let idImg = 0


// fonction poru tout les url

function changeUrl() {
  if (lettre == "" && energyTypes == "" && logSubTypes ==  "") {
    URL;
  }else{
    URL = `https://api.pokemontcg.io/v2/cards?q=name:${lettre}*${energyTypes}${logSubTypes}&page=${valuePage}&pageSize=50`;
    console.log(URL);
    reload(50)
  }
}

// 

function reload(n) {

  let placeholders = [];

  for (let i = 0; i < n; i++) {
    let placeholder = document.createElement('div');
    placeholder.classList.add('reflect-box');
    cardsContener.appendChild(placeholder);
    placeholders.push(placeholder);
  }
  

  fetch(URL, {
    headers: {
      'X-Api-Key': ApiKey
    }
  })
    .then(res => res.json())
    .then(data => {

      console.log(data.data);

      totalCard= data.data.length
      let nummbreSupPaceholde = 50 - totalCard ;
      console.log(totalCard,nummbreSupPaceholde);
      if (totalCard < 50) {
        for (let i = 0; i < nummbreSupPaceholde; i++) {
          cardsContener.removeChild(cardsContener.lastChild)
        }

        messageEror.style.display = "none"
        loadeMore.style.display = "none";
        reloadCard.classList.remove('pad') 
      }
      
      if (totalCard == 0) {
        loadeMore.style.display = "none";
        messageEror.style.display = "block"
      }
    
      data.data.forEach((cards,index)=> {
        
        const img = new Image();
        img.src = cards.images.large;
        img.id = `${idImg}`
        img.className = 'card';
        img.style.display = 'none';
        idImg += 1

        img.onload = () => {
         const target = placeholders[index];
          if (target) {
            cardsContener.replaceChild(img, target);
            img.style.display = 'block';
          }
        };

        img.addEventListener('click', () => {
          body.classList.add('no-scrool')
          cartes.classList.add('carte-Unique')
          let crdmarket = '';
          let prices = cards.cardmarket.prices
          let name = cards.name
          let hp = cards.hp
          let img_logo = cards.set.images.logo
          let img_cart = cards.images.large
          let artiste = cards.artist
          let lien_cardMarket = cards.cardmarket.url
          let Maj = cards.cardmarket.updatedAt


          for (const [key, value] of Object.entries(prices)) {
            console.log(`${key}: ${value}`);
            crdmarket += `
            <div class="div-prices">
                    <p class="name-prices">${key}</p>
                    <p class="prices">${value}€</p>
              </div>`
          }


          let carte = `
            <div class="contenu-Card">
              <div class="Info-principal">
                  <p class="texte-card-info">Name: ${name}</p>
                  <p class="texte-card-info">Hp: ${hp}</p>
              </div>
              <img src="${img_logo}" alt="" class="logo-serie">
              <img src="${img_cart}" alt="" class="image-carte">
              <div class="Artiste">
                  <p class="texte-card-info">Artiste: ${artiste}</p>
              </div>
            </div>
            <div class="cardmarket">
              <div class="nav-cardmarket">
                  <img src="assette/image.png" alt="" class="img-cardmarket">
                  <img src="assette/cross-svgrepo-com (5).svg" alt="" class="croos">
              </div>
              <div class="all-prices">
                ${crdmarket}
              </div>
              <div class="info-cardmarcket">
                <p class="texte-card-info">Dernier mis a jour: ${Maj}</p>
                <a href="${lien_cardMarket}" class="texte-card-info" target="_blank">Lien cardMarket</a>
              </div>
            </div>`

          cartes.insertAdjacentHTML("beforeend",carte)

          let croos = document.querySelector('.croos')

          croos.addEventListener("click",()=>{
            body.classList.remove('no-scrool');
            cartes.classList.remove('carte-Unique')
            cartes.innerHTML = "";
          });

        });
      });
    });
}



sherchBar.addEventListener("input", function(){
  messageEror.style.display = "none"
  lettre = sherchBar.value.toLowerCase().trim()
  console.log(lettre);
  cardsContener.innerHTML = "";
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("caca");
    if(!lettre == "" ){
      console.log(loadeMore)
      idImg = 0
      valuePage = 1;
      loadeMore.style.display = "block";
      reloadCard.classList.add('pad')
      changeUrl()
    }else{
      console.log(loadeMore)
      loadeMore.style.display = "none";
      reloadCard.classList.remove('pad')  
      cardsContener.innerHTML = "";
      changeUrl()
    }
  }, 500);
});



loadeMore.addEventListener("click", () => {
  idImg = 0
  valuePage += 1;
  changeUrl()
});


// variable pour les type 

let urlType = "https://api.pokemontcg.io/v2/types";
let details_Types = document.querySelector('.details_Types')
let All_Selection_Type = document.querySelector('.All_Selection_Type')
let energy = document.querySelector('.energy')
let texte_Types = document.querySelector('.texte_Types')
let energyTypes = "";

// variable pour les subtype
let urlSubType = "https://api.pokemontcg.io/v2/subtypes";
let details_SubTypes = document.querySelector('.details_SubTypes')
let All_Selection_SubType = document.querySelector('.All_Selection_SubType')
let logo = document.querySelector('.logo')
let texte_SubTypes = document.querySelector('.texte_SubTypes')
let logSubTypes = "";

// fetch energy
fetch(urlType, {
  headers: {
    'X-Api-Key': ApiKey
  }
}) 
.then(res => res.json())
.then(data => {
    
    data.data.forEach(types => {
      let nameTypes = types
      let listeTypes = `<li class="selection selectionTypes" id="${nameTypes}" title="${nameTypes}">
                            <img src="assette/types/${nameTypes}.png" alt="" class="energy">
                        </li>`;
      
      All_Selection_Type.insertAdjacentHTML("beforeend", listeTypes)
    });


    let buttontypesles = `<p class="textNAV  selection selectionTypes" id="type">type</p>`;
    All_Selection_Type.insertAdjacentHTML("beforeend", buttontypesles)


    let selectionTypes = document.querySelectorAll('.selectionTypes')
    selectionTypes.forEach(energy => {
      energy.addEventListener("click", ()=> {
        cardsContener.innerHTML = "";
        idImg = 0
        valuePage = 1;

        energyTypes = `+types:${energy.id}`
        let energyDetailles 

        if (energy.id == "type") {
          texte_Types.innerHTML = "";
          energyDetailles = `<p class="textNAV ">type</p>`
          energyTypes = ``
          loadeMore.style.display = "none";
          reloadCard.classList.remove('pad')
          changeUrl()
        }else{
          texte_Types.innerHTML = "";
          energyDetailles = `<img src="assette/types/${energy.id}.png" alt="${energy.id}" class="energyButton"  >`
          loadeMore.style.display = "block";
          reloadCard.classList.add('pad')
          changeUrl()
        }

        
        console.log(energyTypes);
        details_Types.removeAttribute("open");
        
        texte_Types.insertAdjacentHTML("beforeend",energyDetailles)
      })
    });
})

// fetch subtype
fetch(urlSubType, {
  headers: {
    'X-Api-Key': ApiKey
  }
}) 
.then(res => res.json())
.then(data => {
    
    data.data.forEach(subTypes => {
      let nameSubTypes = subTypes
      let listeSubTypes = `<li class="selection selectionSubTypes" id="${nameSubTypes}" title="${nameSubTypes}">
                            <img src="assette/subtypes/${nameSubTypes}.png" alt="" class="energy">
                        </li>`;
      
      All_Selection_SubType.insertAdjacentHTML("beforeend", listeSubTypes)
    });


    let buttonSubtypesles = `<p class="textNAV  selection selectionSubTypes" id="subtype">Subtype</p>`;
    All_Selection_SubType.insertAdjacentHTML("beforeend", buttonSubtypesles)


    let selectionSubTypes = document.querySelectorAll('.selectionSubTypes')
    selectionSubTypes.forEach(logo => {
      logo.addEventListener("click", ()=> {
        cardsContener.innerHTML = "";
        idImg = 0
        valuePage = 1;

        let logoId = logo.id;
        console.log(logoId);
        

        logSubTypes = `+subtypes:"${logoId}"`
        let logoDetailles 

        if (logoId == "subtype") {
          texte_SubTypes.innerHTML = "";
          logoDetailles = `<p class="textNAV ">Subtype</p>`
          logSubTypes = ``
          loadeMore.style.display = "none";
          reloadCard.classList.remove('pad')
          changeUrl()
        }else{
          texte_SubTypes.innerHTML = "";
          logoDetailles = `<img src="assette/subtypes/${logoId}.png" alt="${logoId}" class="energyButton">`
          loadeMore.style.display = "block";
          reloadCard.classList.add('pad')
          changeUrl()
        }

        
        details_SubTypes.removeAttribute("open");
        
        texte_SubTypes.insertAdjacentHTML("beforeend",logoDetailles)
      })
    });
})