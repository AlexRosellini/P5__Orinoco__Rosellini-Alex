const queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

async function getProduit() {
  try {
    await fetch(apiURL + productGlobal + "/" + id)
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((response) => {
          let htmlProduit = `<div class="card">
                <div class="card-product__name"><h2>${response.name}</h2></div>
                <div class="card-product__img"><img src="${response.imageUrl}"></div>
                <div class="card-product__description"><p>${response.description}</p></div>  
                <div class = "card-product__bottom">
                <div class="card-product__price"><p>Prix: ${response.price / 100} €</p></div>
                <div class="card-product__personalize"><h3>Personalisez votre ours!</h3></div>
                <label for="color" class = card-product__label>Couleur:</label>
                <select class="card-product__colors" name="color"></select>
                <label class = "card-product__label"for="Quantity">Quantitée:</label>
                <input type="number" class="card-product__quantity" name="Quantity" min="1" max="99" value="1" oninput="this.value = 
                !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : null">
                <button class="card-product__button"><p>Ajouter au panier</p></button>
                </div>
                </div>`;
         
            document.querySelector(".card").innerHTML = htmlProduit
          
          let choice = document.querySelector(".card-product__colors");
          for (j = 0; j < response.colors.length; j++) {
            let option = document.createElement("option");
            option.className = ".card-product__color";
            option.id = ".card__color";
            option.textContent = response.colors[j];
            choice.appendChild(option);
          }
        
           
          const envoyerPanier = document.querySelector('.card-product__button')
              envoyerPanier.addEventListener('click', (event) =>{
                                          
                let colorChoice = document.querySelector('.card-product__colors')
                    colorChoice = colorChoice[colorChoice.selectedIndex].textContent;
                  
                let quantity = parseInt(document.querySelector('.card-product__quantity').value)   
                let productString = {
                    _id: response._id,
                    name: response.name,
                    price: response.price,
                    description: response.description,
                    imageUrl: response.imageUrl,
                    option: colorChoice,
                    quantity: quantity,
                  
                }
                  
                console.table(productString)
                  
                let userPanier = JSON.parse(localStorage.getItem("product"));
                if (userPanier) {
                    userPanier.push(productString)
                    localStorage.setItem("product", JSON.stringify(userPanier))
                  
                } else {
                    userPanier = [];
                    userPanier.push(productString)
                    localStorage.setItem("product", JSON.stringify(userPanier))
                }

                    let htmlConfirm = `<div class="card-bottom__confirm"><p>Votre produit à bien été enregistrer sur votre panier, voulez vous <a href="panier.html">voir votre panier?</a> ou 
                    <a href="index.html">Voir nos autres produits?</a></p>
                    </div>`
                    document.querySelector(".card").innerHTML =  htmlConfirm;

                      })
                  });
      }
    });
  } catch (err) {
      let htmlerror = `<div class="card-bottom__confirm"><p>Il semble y avoir eu une érreur, nous nous excusons du dérangement<a href="index.html">Souhaitez vous revenir à la boutique?</a></p>
      </div>`
      document.querySelector(".card").innerHTML = htmlerror 
      console.log('Erreur:' + err)

  }
}
getProduit();


