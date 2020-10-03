import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { post, get } from "axios";
import {authenticator} from "../App";
import {
    useHistory
} from "react-router-dom";

//Hace un GET a la API con el Email del usuario invocado. Si existe devuelve true
function checkUserExists(email) {
    let userExists = false;
    get("http://localhost:4000/user/email/" + email)
        .then(response => {
            if(response.email === email) {
                userExists = true;
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error API caida (check)!");
        });
    return userExists;
}


//Guarda el objeto usuario en la API mediante un POST. Si lo logra devuelve OK.
function saveUserToAPI(user) {
    post('http://localhost:4000/user', JSON.stringify(user, null, 2))
        .then( response => {
            if(response.statusText === "OK" ){

                return "OK";

            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error API caida (save)!");
        })
    return "NOT OK"
}

export function LoginSocial(props) {
    let history = useHistory();
    function handleResponse(response) {
        const userData = response.profileObj;
        const userToken = response.tokenId;
        let values = {
            name: userData.name,
            email: userData.email,
            display_pic_route: userData.imageUrl,
            tokenId: userToken
        }
        if(checkUserExists(values.email)) {
            if(saveUserToAPI(values) === "OK"){
                authenticator.authenticate(values.name);
                history.push("/",{auth:true});
            }
        } else {
            authenticator.authenticate(values.name);
            history.push("/",{auth:true});
        }
    }
    return(<GoogleLogin
        clientId="836483726590-4krmbdnkuoo60tlfl9kbk9mlof558sli.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleResponse}
        onFailure={handleResponse}
        cookiePolicy={'single_host_origin'}
    />);
}
