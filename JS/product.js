/*On commence par Fetch notre Api*/
  
  fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())           
  .then(response => {
    
    /*Maintenant, nous devons injecter notre API dans le Html, on commence par créer une variable qui va prendre en compte les données à injecter
    dans le dit HTML.*/
    let ourHtml = "";

    /*Ensuite, nous créeons une boucle 'For' avec en paramètre i, celui ci va parcourir notre database, et permettre l'injection dans le HTML*/
    for (i = 0; i < response.length; i++) {
      console.log(response[i].name);  //On test i, on trouve dans la console le nom de nos peluches.
    
    ourHtml += `<div class="card">
    <div class="card__name"><h3>${response[i].name}</h3></div>
    <div class="card__img"><img src="${response[i].imageUrl}"></div>
    <div class="card__description"><p>${response[i].description}</p></div>
    <div class = "card__bottom">
    <div class="card__price"><p>Price : ${response[i].price/100} €</p></div>
    <div class="card__id"><a href="product.html?${response[i]._id}">Voir ce produit</a></div>
    </div>
    </div>`

    /*Ensuite, il nous reste à injecter notre HTML dans notre page*/
    document.querySelector(".cards").innerHTML = ourHtml
    }
  })