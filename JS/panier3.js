//let userPanier = JSON.parse(localStorage.getItem("product"));
//console.log(userPanier);
//
///*SI le panier est vide*/
//
//let fullCart = [];
//
//
//if (userPanier === null || userPanier == 0) {
//  let emptyCart = `<div class="panier__empty"><p>Votre panier est vite, <a href="index.html">Parcourez nos produits</a>`;
//  document.querySelector(".cart").innerHTML = emptyCart;
//} else {
//  for (let i = 0; i < userPanier.length; i++) {
//    console.log(userPanier[i].option);
//    fullCart += `<div class="cart-card">
//         <div class="cart-card__nom"><p>${userPanier[i].name}</p></div>
//         <div class="cart-card__option"><p>${userPanier[i].option}</p></div>
//         <div class="cart-card__quantity"><p>${userPanier[i].quantity}</p></div>
//         <div class="cart-card__price"><p>${(userPanier[i].price / 100) * userPanier[i].quantity} €</p></div>
//         <button class="cart-card__delete">Supprimer l'article</button>
//         </div> `;
//  }
//}


//let calculPrice = "";
//let iteratePrice = [];
//for (let l = 0; l < userPanier.length; l++) {
//  let productsInCart = userPanier[l].price / 100;
//  iteratePrice.push(productsInCart);
//;
//}

//let htmlHeader = `<div class="header">
//<div class="header__name"><p>Noms</p></div>
//<div class="header__option"><p>Option</p></div>
//<div class="header__quantity"><p>Quantitée</p></div>
//<div class="header__price"><p>Prix</p></div>
//<div class="header__supr"><p>Supprimer article</p></div>
//</div>`
//
//
//let form = `<h3>Merci de remplir le formulaire ci-dessous pour completer votre commande</h3>
//<div class="contact">
//    <div class="contact__info">
//        <label for="firstName">Prénom</label>
//        <input type="text" name="firstName" class="firstName" placeholder="Nero" required>
//    </div>
//    <div class="contact__info">
//        <label for="lastName">Nom de famille</label>
//        <input type="text" name="lastName" class="lastName" placeholder="Claudius" required>
//    </div>
//    <div class="contact__info">
//        <label for="adress">Adresse</label>
//        <input type="text" name="address" class="address" placeholder="Via della Domus Aurea, 1, 00184" required>
//    </div>
//    <div class="contact__info">
//        <label for="city">ville</label>
//        <input type="text" name="city" class="city" placeholder="Rome" required>
//    </div>
//    <div class="contact__info">
//        <label for="email">Adresse Email</label>
//        <input type="text" name="email" class="email" placeholder="UmuEmpresspadoru@roma.rome" required>
//    </div>
//    <button class="sendForm">Valider la commande</button>
//</div>
//`;

//const reducer = (accumulator, currentValue) => accumulator + currentValue;
//{
//  calculPrice = iteratePrice.reduce(reducer);
//
//}

//let finalPrice = `<div class = panier__finalPrice><p>Prix total: ${calculPrice} €</p></div>`;

//document.querySelector(".cart").innerHTML = htmlHeader + fullCart + finalPrice + form;

//let sendform = document.querySelector(".sendForm");
//sendform.addEventListener("click", (event) => {
//  let contact = {
//    firstName: document.querySelector(".firstName").value,
//    lastName: document.querySelector(".lastName").value,
//    address: document.querySelector(".address").value,
//    city: document.querySelector(".city").value,
//    email: document.querySelector(".email").value,
//  };

  const formvalueP = contact.firstName;
  const formvalueL = contact.lastName;
  const formvalueA = contact.address;
  const formvalueC = contact.city;
  const formvalueE = contact.email;

  function namecheck() {
    if (
      /^[A-Za-z]{2,24}$/.test(formvalueP) &&
      /^[A-Za-z]{2,24}$/.test(formvalueL)
    ) {
      return true;
    }
  }

  //function citycheck() {
  //  if (/^[A-Za-z]{2,24}$/.test(formvalueC)) {
  //    return true;
  //  }
  //}
//
  //function emailcheck() {
  //  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalueE)) {
  //    return true;
  //  }
  //}
//
  //function addresscheck() {
  //  if (
  //    /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(formvalueA)
  //  ) {
  //    return true;
  //  } else {
  //    console.log("no");
  //  }
  //}
//
//  if (
//    namecheck() == true &&
//    emailcheck() == true &&
//    addresscheck() == true &&
//    citycheck() == true
//  ) {
//    console.log(contact);
//  } else {
//    alert("formulaire invalide");
//  }
//
//  let products = [];
//  for (let i = 0; i < userPanier.length; i++) {
//    products.push(userPanier[i]._id);
//  }
//
//  let contactProduct = JSON.stringify( {contact,products} );
//  console.log(contactProduct);
//
  fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: contactProduct
    })  
    .then(response => response.json())
    .then(response => {
        let OrderId = response.orderId;
        sessionStorage.setItem('orderId', JSON.stringify(OrderId));
        window.location.replace("./confirmation.html");
    }) 
//});
//
//
//let btnDelete = document.querySelectorAll(".cart-card__delete");
//console.log(btnDelete)
//for (let i = 0; i < btnDelete.length; i++) {
//    btnDelete[i].addEventListener("click", (e) =>{
//        e.preventDefault();
//        userPanier.splice(i, 1)
//        localStorage.setItem("produit", JSON.stringify(userPanier))
//        window.location.reload()
//    })
//}
//