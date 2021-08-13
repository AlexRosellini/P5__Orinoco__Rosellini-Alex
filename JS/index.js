/******************/

let pageHTML = ""; //On créer une variable PageHTML vide pour le moment

/*****************************************************************************/
//Fonction pour créer notre HTML

async function indexBuild (products) {  //product est le result de notre première fonction
    for (let i = 0; i < products.length; i++) { //Boucle for qui permet la création de notre page 
        let htmlOk = `<div class="card">
        <div class="card__name"><h3>${products[i].name}</h3></div>
        <div class="card__img"><img src="${products[i].imageUrl}"></div>
        <div class = "card__bottom">
        <div class="card__description"><p>${products[i].description}</p></div>
        <div class="card__price"><p>Price : ${products[i].price / 100} €</p></div>
        <div class="card__id"><a href="product.html?id=${products[i]._id}">Voir ce produit</a></div>
        </div>
        </div>`;
        pageHTML = pageHTML + htmlOk; //Pour chaque itération de notre loop, on ajoute un produit selectioner par [i]
       document.querySelector(".cards").innerHTML = pageHTML;  //On ajoute le pageHTML au DOM
    }
}
/*****************************************************************************/
//Fonction en cas d'érreur 

async function failIndex (err) { //err est indiquer par notre catch 
    let htmlFail = `<div class = "Fail"> <p> Oops! Il semble y avoir une érreur de notre côté, merci de réessayer plus tard</p>`
      pageHTML = pageHTML + htmlFail
      document.querySelector(".cards").innerHTML = pageHTML;
      console.log("Error: " + err) //On log l'érreur sur la console.log
}

/*****************************************************************************/
//Fonction principale de notre page

async function indexPage () {
    try {  //On utilise try catch en cas d'érreur
        const products = await apiCall(""); //On appel l'Api avec produitID vide (pas besoin pour le moment)
        await indexBuild(products); //On créer notre html 
    }
    catch(err) {
        await failIndex(err) //En cas d'érreur on appel notre fonction fail
    }
}

indexPage() //on appel notre fonction principale