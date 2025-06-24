let sherch = document.querySelector('.sherchPokemonCrad')
let centerNav = document.querySelector('.centerNav')
let rechercheETLogo = document.querySelector('.rechercheETLogo')


window.addEventListener('scroll', function () {
    let scrollY = window.scrollY; 
    if (scrollY >= 402) {
        centerNav.appendChild(sherch);
    }else{
        rechercheETLogo.appendChild(sherch)
    }
}); 



