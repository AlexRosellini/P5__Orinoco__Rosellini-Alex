
/*Notre premier objectif est de récuperer l'ID du produit séléctioner*/

let id = window.location.hash.substr(1);

console.log (id) //Nous renvoie ce qui est juste après le # dans notre url.

/*Nous devons ensuite créer notre Html, pour ça nous appelons une nouvelle fois l'API, cette fois on cherchant notre ID*/

fetch(`http://localhost:3000/api/teddies/${id}`)
.then(response => response.json())           
.then(response => { 
    console.log(response.name) 
    
    /*On ajoute ensuite notre Html*/
    let htmlProduit = `<div class="card">
    <div class="card__name"><h3>${response.name}</h3></div>
    <div class="card__img"><img src="${response.imageUrl}"></div>
    <div class="card__description"><p>${response.description}</p></div>
    <div class = "card__bottom">
    <div class="card__price"><p>Price : ${response.price/100} €</p></div>
    <label class="card__label"><h3>Personalisez votre ours!</h3></label>
    <select class="card__colors"></select>
    <div class="card__button><p>Ajouter au panier</p></div>
    </div>
    </div>`


    /*
    notre but est ensuite d'ajouter chacune des options à nos produits, soit en notre cas, des couleurs. 
    pour ce faire, on utilise une boucle for avec en paramètre 'j' qui va se positioner sur chaque couleur. Ensuite, on créer les éléements
    via create element, classname et textcontent ou nous ajoutons nos options.
    */

    document.querySelector(".card").innerHTML = htmlProduit

    let choice = document.querySelector('.card__colors')
    for (j = 0; j < response.colors.length; j++) {
    let option = document.createElement('option')
    option.className = ".card__color"
    option.textContent = response.colors[j];
    choice.appendChild(option)
       
    }
}) 




    