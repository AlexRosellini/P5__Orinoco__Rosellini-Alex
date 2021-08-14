async function confirmPage(){
    try {
        const userCart = JSON.parse(localStorage.getItem("product"));
        const finalPrice = await totalPrice(userCart);
        let orderConfirm = JSON.parse(sessionStorage.getItem('orderId'));
        document.querySelector(".article__confirm").innerHTML = `<div class="article__id>"<p>l'ID de votre commande est le : <span>${orderConfirm}</span></p></div>
        <div class="article__price"><p>Le prix total est de <span>${finalPrice}</span> €</p></div>`;
    }
    catch (err) {
        console.log(err)
    }
}

confirmPage()