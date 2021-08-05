let userPanier = JSON.parse(localStorage.getItem("produit"));
console.log(userPanier);

/*SI le panier est vide*/



let fullCart = []

if (userPanier === null) {
    let emptyCart = `<div class="panier__empty"><p>Votre panier est vite, <a href="index.html">Parcourez nos produits</a>`
    document.querySelector('.panier').innerHTML = emptyCart
} else {
    for (let i = 0; i < userPanier.length; i++) {
        console.log(userPanier[i].option)
         fullCart += `<div class="cart-card">
         <div class="cart-card__nom"><p>${userPanier[i].name}</p></div>
         <div class="cart-card__option"><p>${userPanier[i].option}</p></div>
         <div class="cart-card__quantity"><p>${userPanier[i].quantity}</p></div>
         <div class="cart-card__price"><p>${userPanier[i].price/100*userPanier[i].quantity} €</p></div>
     </div> `
    } 

}

let calculPrice = ''
let iteratePrice = []
for (let l = 0; l < userPanier.length; l++) {
    let productsInCart = userPanier[l].price/100
    iteratePrice.push(productsInCart)
    console.log(iteratePrice)
}



const reducer = (accumulator, currentValue) => accumulator + currentValue; {
     calculPrice =  iteratePrice.reduce(reducer);
    console.log(calculPrice)
    
}

let finalPrice = `<div call = panier__finalPrice><p> ${calculPrice} €</p></div>`
document.querySelector('.panier').innerHTML = fullCart + finalPrice ;
