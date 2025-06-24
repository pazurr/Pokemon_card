let URL = "https://api.pokemontcg.io/v2/sets";
let ApiKey = 'a9628dce-e44b-4701-b810-9c6cba4f2f1c';
let Allserie = document.querySelector('.Allserie')
let loadeMore = document.querySelector('.loadeMore');
let reloadCard = document.querySelector('.reload')
let messageEror = document.querySelector('.messageEror')
let retoure = document.querySelector('.retoure')
let logo = document.querySelector('.logo')
let header = document.querySelector('.header')
let carte_Unique = document.querySelector('.carte-Unique')
let visible = document.querySelector('.visible')
let cartes = document.querySelector('.cartes')
let all_prices = document.querySelector('.all-prices')
let body = document.querySelector('body')
let setLogo;
let image;
let valuePage = 1;
let idSerie;
let totalCard;



function reloadCards(n) {
    retoure.style.display = "block";
    loadeMore.style.display = "block";
    reloadCard.classList.add('pad')

    let placeholders = [];

    for (let i = 0; i < n; i++) {
        let placeholder = document.createElement('div');
        placeholder.classList.add('reflect-box');
        Allserie.appendChild(placeholder);
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

        logo.innerHTML = "";

        setLogo =data.data[0].set.images.logo

        let logoSets = `<img src="${setLogo}" alt="">`

        logo.insertAdjacentHTML('beforeend',logoSets)

        totalCard= data.data.length
        let nummbreSupPaceholde = 50 - totalCard ;
        console.log(totalCard,nummbreSupPaceholde);
        if (totalCard < 50) {
            for (let i = 0; i < nummbreSupPaceholde; i++) {
                Allserie.removeChild(Allserie.lastChild)
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
            img.className = 'card';
            img.style.display = 'none';

            img.onload = () => {
            const target = placeholders[index];
            if (target) {
                Allserie.replaceChild(img, target);
                img.style.display = 'block';
            }};

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

function reloadsets() {

    valuePage = 1;

    Allserie.innerHTML = "";
    logo.innerHTML = "";
    retoure.style.display = "none";
    messageEror.style.display = "none"
    loadeMore.style.display = "none";
    reloadCard.classList.remove('pad') 

    header.classList.add('cent')

    fetch(URL, {
    headers: {
        'X-Api-Key': ApiKey
    }
    })
    .then(res => res.json())
    .then(data => {

        header.classList.remove('cent')

        let reversedData = data.data.reverse();
        console.log(reversedData);
            

        reversedData.forEach((serie,index)=> {
            image = serie.images.logo
            let nom = serie.id

            console.log(image);
        
            let serieCard = ` <div class="seriePokemon" id="${nom}">
                                <img src="${image}" alt="logo de la serie pokemon ${nom}" id="${reversedData[index]}}">
                            </div>`

            Allserie.insertAdjacentHTML('beforeend',serieCard)
        });

        let seriePokemon = document.querySelectorAll('.seriePokemon')
        seriePokemon.forEach(serie => { 
            serie.addEventListener("click", () => {
                console.log(serie.id);
                idSerie = serie.id;
                Allserie.innerHTML = "";
                URL = `https://api.pokemontcg.io/v2/cards?q=set.id:${idSerie}&page=1&pageSize=50`;
                reloadCards(50)
            });
        });
    })
}
    
reloadsets()


loadeMore.addEventListener("click",()=>{
    console.log(idSerie);
    valuePage += 1;
    URL = `https://api.pokemontcg.io/v2/cards?q=set.id:${idSerie}&page=${valuePage}&pageSize=50`;
    reloadCards(50)
}); 



retoure.addEventListener("click",()=>{
    URL = "https://api.pokemontcg.io/v2/sets"
    reloadsets()
})