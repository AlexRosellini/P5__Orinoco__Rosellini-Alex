
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

let form = `<h2>Merci de remplir le formulaire ci-dessous pour completer votre commande</h2>
<div class="contact">
    <div class="contact__info">
        <label for="firstName">Prénom</label>
        <input type="text" name="firstName" class="firstName" placeholder="Nero" required>
    </div>
    <div class="contact__info">
        <label for="lastName">Nom de famille</label>
        <input type="text" name="lastName" class="lastName" placeholder="Claudius" required>
    </div>
    <div class="contact__info">
        <label for="adress">Adresse</label>
        <input type="text" name="address" class="address" placeholder="Via della Domus Aurea, 1, 00184" required>
    </div>
    <div class="contact__info">
        <label for="city">ville</label>
        <input type="text" name="city" class="city" placeholder="Rome" required>
    </div>
    <div class="contact__info">
        <label for="email">Adresse Email</label>
        <input type="text" name="email" class="email" placeholder="UmuEmpresspadoru@roma.rome" required>
    </div>
    <button class="sendForm">Valider la commande</button>
</div>
`

const reducer = (accumulator, currentValue) => accumulator + currentValue; {
     calculPrice =  iteratePrice.reduce(reducer);
    console.log(calculPrice)
    
}

let finalPrice = `<div call = panier__finalPrice><p> ${calculPrice} €</p></div>`
document.querySelector('.panier').innerHTML = fullCart + finalPrice + form ;

let sendform = document.querySelector('.sendForm')
sendform.addEventListener('click', (event) => {

let contact = {
    firstName: document.querySelector(".firstName").value,
    lastName: document.querySelector(".lastName").value,
    address: document.querySelector(".address").value,
    city: document.querySelector(".city").value,
    email: document.querySelector(".email").value,
}


const formvalueP = contact.firstName;
const formvalueL = contact.lastName;
const formvalueA = contact.address;
const formvalueC = contact.city;
const formvalueE = contact.email;

function namecheck(){
 
    if (/^[A-Za-z]{2,24}$/.test(formvalueP) && (/^[A-Za-z]{2,24}$/.test(formvalueL))) { 
            return true  
    } 
}

function citycheck(){
    if (/^[A-Za-z]{2,24}$/.test(formvalueC)) {
        return true
    }
}

function emailcheck(){
 
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalueE)) { 
            return true  
    } 
}

function addresscheck(){
 
    if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(formvalueA)) { 
            return true  
    } else { 
        console.log("no")
    }
}

if (namecheck() == true && emailcheck() == true && addresscheck() == true && citycheck() == true) {
    console.log(contact)
} else {
    console.log('formulaire invalide')    
}
})