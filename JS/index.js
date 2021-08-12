/*On commence par Fetch notre Api*/

     let pageHTML = "";

async function Showproducts() {
  try {
    await fetch(apiURL = apiURL + productGlobal)
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((response) => {
          for (let i = 0; i < response.length; i++) {
            console.log(response[i].name);
            let htmlOk = `<div class="card">
            <div class="card__name"><h3>${response[i].name}</h3></div>
            <div class="card__img"><img src="${response[i].imageUrl}"></div>
            <div class = "card__bottom">
            <div class="card__description"><p>${response[i].description}</p></div>
            <div class="card__price"><p>Price : ${response[i].price / 100} €</p></div>
            <div class="card__id"><a href="product.html?id=${response[i]._id}">Voir ce produit</a></div>
            </div>
            </div>`;
            pageHTML = pageHTML + htmlOk;
           document.querySelector(".cards").innerHTML = pageHTML;
        }
        });
      }
    });
  } catch (err) {
    const htmlFail = `<div class = "Fail"> <p> Oops! Il semble y avoir une érreur de notre côté, merci de réessayer plus tard</p>`
      pageHTML = pageHTML + htmlFail
      document.querySelector(".cards").innerHTML = pageHTML;
    console.log("Error: " + err)
  }
}
Showproducts()

