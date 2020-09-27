import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {post} from "axios";

const responseGoogle = (response) => {
    console.log(response);
    const userData = response.profileObj;
    let values = {
        name: userData.givenName,
        email: userData.email,
        }
    post('http://localhost:4000/user', JSON.stringify(values, null, 2))
        .then((response)=> console.log(response))
        .catch((error) => console.log(error))
        .finally(() => alert("Sus datos se han enviado correctamente"))
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
