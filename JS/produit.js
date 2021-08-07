
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
    <div class="card-product__name"><h2>${response.name}</h2></div>
    <div class="card-product__img"><img src="${response.imageUrl}"></div>
    <div class="card-product__description"><p>${response.description}</p></div>  
    <div class = "card-product__bottom">
    <div class="card-product__price"><p>Prix: ${response.price/100} €</p></div>
    <div class="card-product__personalize"><h3>Personalisez votre ours!</h3></div>
    <label for="color" class = card-product__label>Couleur:</label>
    <select class="card-product__colors" name="color"></select>
    <label class = "card-product__label"for="Quantity">Quantitée:</label>
    <input type="number" class="card-product__quantity" name="Quantity" min="1" max="99" value="1" oninput="this.value = 
    !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : null">
    <button class="card-product__button"><p>Ajouter au panier</p></button>
    </div>
    </div>`
    
    document.querySelector(".card").innerHTML = htmlProduit

    /*
    notre but est ensuite d'ajouter chacune des options à nos produits, soit en notre cas, des couleurs. 
    pour ce faire, on utilise une boucle for avec en paramètre 'j' qui va se positioner sur chaque couleur. Ensuite, on créer les éléements
    via create element, classname et textcontent ou nous ajoutons nos options.
    */

    let choice = document.querySelector('.card-product__colors')
    for (j = 0; j < response.colors.length; j++) {
    let option = document.createElement('option')
    option.className = ".card-product__color"
    option.id = ".card__color"
    option.textContent = response.colors[j];
    choice.appendChild(option)
    }       
  
    
    const envoyerPanier = document.querySelector('.card-product__button')
    console.log(envoyerPanier)

    envoyerPanier.addEventListener('click', (event) =>{


    /*Maintenant, nous allons récupérer les données utilisateurs lors de l'ajout du panier*/
    let colorChoice = document.querySelector('.card-product__colors')
        colorChoice = colorChoice[colorChoice.selectedIndex].textContent;

    let quantity = parseInt(document.querySelector('.card-product__quantity').value);
        
    let produitstring = {
        _id: response._id,
        name: response.name,
        price: response.price,
        description: response.description,
        imageUrl: response.imageUrl,
        option: colorChoice,
        quantity: quantity,
        
    }

    console.table(produitstring)

    let userPanier = JSON.parse(localStorage.getItem("produit"));
    if (userPanier) {
        userPanier.push(produitstring)
        localStorage.setItem("produit", JSON.stringify(userPanier))

    } else {
        userPanier = []; 
        userPanier.push(produitstring)
        localStorage.setItem("produit", JSON.stringify(userPanier))
    }
         
    })
});    




