let apiURL = "http://localhost:3000/api/";
let productGlobal = "teddies";

/******************************************************************************/ 
//Fonction d'appel de l'API.

async function apiCall (productId) { //nous utiliserons le productId dans notre page produit.
    const response = await fetch(apiURL = apiURL + productGlobal + productId); //On attend la réponse du fetch, pour récuperer les données

    if (!response.ok) { //Au cas ou la réponse n'est pas 200, on envoie un  message d'érreur.
        const error = await response.text();
        throw new Error(error.message)
    }
    const result = await response.json(); //Si tout est bon, on créer notre constante result, et on met la réponse en JSON.
    return result
}
