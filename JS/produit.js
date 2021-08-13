/******************************************************************************/ 
//Fonction pour le HTML de la page

async function productBuild(product) { 
    let htmlProduit = `<div class="card">
    <div class="card-product__name"><h2>${product.name}</h2></div>
    <div class="card-product__img"><img src="${product.imageUrl}"></div>
    <div class="card-product__description"><p>${product.description}</p></div>  
    <div class = "card-product__bottom">
    <div class="card-product__price"><p>Prix: ${product.price / 100} €</p></div>
    <div class="card-product__personalize"><h3>Personalisez votre ours!</h3></div>
    <label for="color" class = card-product__label>Couleur:</label>
    <select class="card-product__colors" name="color"></select>
    <label class = "card-product__label"for="Quantity">Quantité:</label>
    <input type="number" class="card-product__quantity" name="Quantity" min="1" max="99" value="1" oninput="this.value = 
    !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : null"> 
    <button class="card-product__button"><p>Ajouter au panier</p></button>
    </div>
    </div>`;

    document.querySelector(".card").innerHTML = htmlProduit

}

/******************************************************************************/ 
//fonction pour les options (couleurs des ours)

async function choiceOptions (product) {
    let choice = document.querySelector(".card-product__colors");
    for (j = 0; j < product.colors.length; j++) { //On créer une loop qui va chercher chaque option
      let option = document.createElement("option");  
      option.className = ".card-product__color";
      option.textContent = product.colors[j]; 
      choice.appendChild(option); //Pour chaque itération, on créer une option avec une class, et notre choix de couleur.
    }
}

/******************************************************************************/ 
//Fonction pour l'envoi au panier et dans le localstorage.

async function cartBtnEvent (product) {

    const sendcart = document.querySelector('.card-product__button')
    sendcart.addEventListener('click', (event) =>{ //La fonction s'applique sur un click du btn 
      
      let quantity = parseInt(document.querySelector('.card-product__quantity').value)   //On créer des variables pour les éléments
      
        if (isNaN(quantity)) { //On empêche que la quantité soit NaN
            alert("La quantité ne doit pas être inférieur à 1")
            return
        }

      let colorChoice = document.querySelector('.card-product__colors')
      colorChoice = colorChoice[colorChoice.selectedIndex].textContent; //On selectione notre option
      
      let productString = {  //On créer un objet à envoyer
          _id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          option: colorChoice,
          quantity: quantity,
      }
      
      let userCart = JSON.parse(localStorage.getItem("product")); //On selectione notre objet pour l'envoyer
      
      if (!userCart) { //Si le panier n'existe pas déjà, on créer un array 
        userCart = [];
      }
      userCart.push(productString); //On ajoute notre objet dans l'array
      localStorage.setItem("product", JSON.stringify(userCart)); //On envoie vers le localstorage

          let htmlConfirm = `<div class="card-bottom__confirm"><p>Votre produit à bien été enregistrer sur votre panier, 
          voulez vous <a href="panier.html">voir votre panier?</a> ou <a href="index.html">Voir nos autres produits?</a></p>
          </div>`
          document.querySelector(".card").innerHTML =  htmlConfirm; //On remplace l'article par un message de confirmation
    })
}

/******************************************************************************/ 

async function failProduct(err) {
    let htmlError = `<div class="card-bottom__confirm"><p>Il semble y avoir eu une érreur, nous nous excusons du dérangement
    <a href="index.html">Souhaitez vous revenir à la boutique?</a></p>
    </div>`
    document.querySelector(".card").innerHTML = htmlError 
    console.log('Erreur:' + err)
}

/******************************************************************************/ 

async function productPage () {

    try {
        const queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id"); //On récupère l'ID du produit séléctioner sur la page index avec SearchParams
        console.log(id);

        const product = await apiCall("/" + id); //On appel l'API en ajoutant notre ID
        await productBuild(product); //On appel la fonction qui créer le HTML
        await choiceOptions(product); //On appel la fonction qui met en place les options du produit (en notre cas les couleurs)
        await cartBtnEvent(product); //On appel la fonction qui gêre le clic du bouton "ajouter au panier"
    }
    catch (err) {
        await failProduct(err); //En cas d'érreur on appel la fonction qui gêre l'érreur.
    }
}

productPage() //On appel la fonction principale