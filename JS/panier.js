/*****************************************************************************/

 let cartHTML = ""; //On créer une variable PageHTML vide pour le moment

/******************************************************************************/ 
//fonction pour créer notre panier

async function cartBuild(userCart) {
    
    if (userCart === null || userCart === 0) {
        let emptyCart = `<div class="panier__empty"><p>Votre panier est vide, <br><a href="index.html">Souhaitez vous découvrir 
        nos produits?</a>`;
        document.querySelector(".cart").innerHTML = emptyCart;
    }
    for (i = 0; i < userCart.length; i++) {
        let fullCart = `</div><div class="cart-card">
        <div class="cart-card__nom"><p>${userCart[i].name}</p></div>
        <div class="cart-card__quantity"><p>${userCart[i].quantity}</p></div>
        <div class="cart-card__price"><p>${(userCart[i].price)} €</p></div>
        <button class="cart-card__delete">Supprimer l'article</button>
        </div>`;
        cartHTML += fullCart
        document.querySelector(".cart").innerHTML = cartHTML;
    }
}

/******************************************************************************/
//Fonction pour créer notre Html 

async function htmlCartBuild(finalPrice) {
    let price = `<div class = cart__finalPrice><p>Prix total: ${finalPrice} €</p></div>`

    let htmlHeader = `<div class="product-header">
    <div class="product-header__name"><p>Noms</p></div>
    <div class="product-header__quantity"><p>Quantité</p></div>
    <div class="product-header__price"><p>Prix</p></div>
    <div class="product-header__supr"><p>Supprimer article</p></div>
    </div>`

    let deleteAll = `<div class = "delete"><button class = delete-all>Supprimer tout le panier</button></div>`

    let form = `<h3>Merci de remplir le formulaire ci-dessous pour completer votre commande</h3>
    <div class="contact">
        <div class="contact__info">
            <label for="firstName">Prénom</label>
            <input type="text" name="firstName" class="firstName" placeholder="Votre prénom" required>
        </div>
        <div class="contact__info">
            <label for="lastName">Nom de famille</label>
            <input type="text" name="lastName" class="lastName" placeholder="Votre nom de famille" required>
        </div>
        <div class="contact__info">
            <label for="adress">Adresse</label>
            <input type="text" name="address" class="address" placeholder="Votre addresse" required>
        </div>
        <div class="contact__info">
            <label for="city">ville</label>
            <input type="text" name="city" class="city" placeholder="Votre ville" required>
        </div>
        <div class="contact__info">
            <label for="email">Adresse Email</label>
            <input type="text" name="email" class="email" placeholder="Votre email" required>
        </div>
        <button class="sendForm">Valider la commande</button>
    </div>`;

    let card = document.querySelector(".cart")
    card.insertAdjacentHTML("afterbegin", htmlHeader);
    card.insertAdjacentHTML("afterend", form);    
    card.insertAdjacentHTML("afterend", deleteAll);
    card.insertAdjacentHTML("afterend", price);
}

/******************************************************************************/ 
//fonction pour enlever des éléments du panier 

async function deleteCart(userCart) {
    let btnDelete = document.querySelectorAll(".cart-card__delete");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", (e) =>{
            e.preventDefault();
            userCart.splice(i, 1)
            localStorage.setItem("product", JSON.stringify(userCart))
            window.location.reload()
        })
    }
    let btnDeleteAll = document.querySelector(".delete-all")
    btnDeleteAll.addEventListener("click", (err) =>{
        localStorage.clear()
        window.location.reload()
    })
}

/******************************************************************************/ 
//Fonctions qui gêre le formulaire et l'envoie sur l'Api

async function form(userCart) {
    
    let sendform = document.querySelector(".sendForm");   
    sendform.addEventListener("click", (event) => {

        let contact = {
          firstName: document.querySelector(".firstName").value,
          lastName: document.querySelector(".lastName").value,
          address: document.querySelector(".address").value,
          city: document.querySelector(".city").value,
          email: document.querySelector(".email").value,
        };

        function formcheck() {
            const formvalueP = contact.firstName;
            const formvalueL = contact.lastName;
            const formvalueA = contact.address;
            const formvalueC = contact.city;
            const formvalueE = contact.email;
            if (
                /^[A-Za-z]{2,24}$/.test(formvalueP) 
                && /^[A-Za-z]{2,24}$/.test(formvalueL) 
                && /^[A-Za-z]{2,24}$/.test(formvalueC)
                && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalueE)
                && /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(formvalueA)) {
                return true;
            } 
            return false
        }

        const formCheck =  formcheck()
        
        if (formCheck == true) {
            
            let products = [];
            for (let i = 0; i < userCart.length; i++) {
              products.push(userCart[i]._id);
            } 
            let contactProducts = JSON.stringify( {contact,products} );
           
            fetch("http://localhost:3000/api/teddies/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: contactProducts
            })  
            .then(response => response.json())
            .then(response => {
                let OrderId = response.orderId;
                sessionStorage.setItem('orderId', JSON.stringify(OrderId));
                window.location.replace("./confirmation.html");
            }) 
        } 
        else {
            alert("formulaire incorrect, merci de vérifier vos informations")
            return
        }      
   }) 
}

/******************************************************************************/
//fonction en cas d'érreur
async function failCart(err) {
    let htmlFailCart = `<div class = "Fail"> <p>Nous avons rencontrer un problème lors de la validation de votre commande, merci de réessayer plus tard</p>`
    document.querySelector(".cart").innerHTML = htmlFailCart;
    console.log("Error: " + err) //On log l'érreur sur la console.log

}

/******************************************************************************/
async function cartPage () {
    try {
        const userCart = JSON.parse(localStorage.getItem("product"));
        await cartBuild(userCart); 
        const finalPrice = await totalPrice(userCart);
        await htmlCartBuild(finalPrice);
        await deleteCart(userCart);
        await form(userCart);
    }
    catch (err) {
        console.log(err);
    }
}
cartPage()
