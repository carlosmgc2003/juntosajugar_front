import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { post } from "axios";
import {authenticator} from "../App";
import {Redirect} from "react-router-dom";

const responseGoogle = (response) => {
    console.log(response);
    const userData = response.profileObj;
    const userToken = response.tokenId;
    let values = {
        name: userData.name,
        email: userData.email,
        display_pic_route: userData.imageUrl,
        tokenId: userToken
        }
    post('http://localhost:4000/user', JSON.stringify(values, null, 2))
        .then( response => {
            if(response.statusText === "OK" ){
                authenticator.authenticate(response.data.name);
            } else {
                alert("No se pudo autenticar");
            }
        })
        .catch((error) => console.log(error));
    return (<Redirect push to="/" />);
}

export function LoginSocial(props) {
    return(<GoogleLogin
        clientId="836483726590-4krmbdnkuoo60tlfl9kbk9mlof558sli.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />);
}
