let lettres;
let page = 1
let API_URL = 'https://api.pokemontcg.io/v2/cards?rarity=Rare Shiny GX';
let API_KEY = 'a9628dce-e44b-4701-b810-9c6cba4f2f1c';
let nombrePageMax = 76

let checkLoader = false


let card_IMG = document.getElementById('Pokemon');
let search_bar = document.querySelector(".sherch_bar"); 
let verif_value_search = false

let loader = document.getElementById('loading');

let pagesDiv = document.querySelector(".pagesDiv")
let header = document.querySelector(".header")

let fleche_left = document.querySelector(".left")
let fleche_rigth = document.querySelector(".rigth")

function showLoader() {
    loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}
function headerFunc() {
  pagesDiv.innerHTML = "";
  if(page == 76){
    let Apage = `
    <a href="#" class="pages colorS" id="${page}">${page}</a>`;
    if(checkLoader == false){
      pagesDiv.insertAdjacentHTML("beforeend", Apage);
    }
  }else if(page == 1){
    let Apage = `
    <a href="#" class="pages colorS" id="${page}">${page}:</a>
    <a href="#" class="pages" id="${page + 1}">${page + 1}:</a>
    <a href="#" class="pages" id="${page + 2}">${page + 2}:</a>
    <a href="#" class="pages" id="${page + 3}">${page + 3}:</a>
    <a href="#" class="pages">...</a>
    <a href="#" class="pages" id="${page + 10}">${page + 10}</a>`;
    if(checkLoader == false){
      pagesDiv.insertAdjacentHTML("beforeend", Apage);
    }
  }
  else{
    let Apage = `
    <a href="#" class="pages" id="${page - 1}">${page - 1}:</a>
    <a href="#" class="pages colorS" id="${page}">${page}:</a>
    <a href="#" class="pages" id="${page + 1}">${page + 1}:</a>
    <a href="#" class="pages" id="${page + 2}">${page + 2}:</a>
    <a href="#" class="pages" id="${page + 3}">${page + 3}:</a>
    <a href="#" class="pages">...</a>
    <a href="#" class="pages" id="${page + 10}">${page + 10}</a>`;
    if(checkLoader == false){
      pagesDiv.insertAdjacentHTML("beforeend", Apage);
    }
  }
  

  const links = document.querySelectorAll(".pages[id]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      page = parseInt(link.id);
      card_IMG.innerHTML = "";
      API_URL = `https://api.pokemontcg.io/v2/cards?page=${page}`;
      reload();
    });
  });
}
function headerHideLoader(){
  header.style.display = "none"
}
function headershowLoader(){
  header.style.display = "flex"
}
function reload(){
  checkLoader = true 
  showLoader()
  // headerHideLoader()
  fetch(API_URL, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then(res => res.json())
    .then(data => {
      hideLoader();
      headershowLoader();
      checkLoader = false 
      headerFunc()
      const cards = data.data; 
      console.log(cards);

      cards.forEach(card => {
        let card_pokemon = `<img loading="lazy" src="${card.images.small}" alt="${card.name}" class="card">`;
        card_IMG.insertAdjacentHTML('beforeend', card_pokemon);
        }
      );
    });
  }


search_bar.addEventListener("change", function() {
    lettres = search_bar.value.toLowerCase()
    console.log(lettres);
    if(checkLoader == false){
      if(lettres == ""){
        card_IMG.innerHTML =""
        API_URL = `https://api.pokemontcg.io/v2/cards?page=${page}`;
        reload()
      }else{
        card_IMG.innerHTML =""
        API_URL = `https://api.pokemontcg.io/v2/cards?q=name:${lettres}*`;
        reload()
      }
    }
});
fleche_left.addEventListener("click", () => {
  if(checkLoader == false){
    if (page < nombrePageMax) {
      page += 1;
      card_IMG.innerHTML = "";
      API_URL = `https://api.pokemontcg.io/v2/cards?page=${page}`;
      reload();
    }
  }
});
fleche_rigth.addEventListener("click", () => {
  if(checkLoader == false){
    if (page > 1) {
      page -= 1;
      card_IMG.innerHTML = "";
      API_URL = `https://api.pokemontcg.io/v2/cards?page=${page}`;
      reload();
    }
  }
});
reload()
