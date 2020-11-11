import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {apiClient, authenticator} from "../App";
import {useHistory} from "react-router-dom";


export function LoginSocial() {
    let history = useHistory();

    function handleResponse(response) {
        const userData = response.profileObj;
        console.log(userData);
        const userToken = response.tokenId;
        let user = {
            name: userData.name,
            email: userData.email,
            display_pic_route: userData.imageUrl,
            tokenId: userToken,
            password: "default"
        }
        let email = user.email;
        apiClient.get("user/email/" + email)
            .then(response => {
                // El status 200 indica que el email existe en la API
                if (response.status === 200) {
                    authenticator.authenticate(user.name, user.email, user.display_pic_route);
                    history.push("/", {auth: true});
                }
            })
            .catch((error) => {
                // Es una cuestion de Chrome que un 404, que seria esperado, igual se registre como error
                // El error 404 indica que el usuario no existe para la API
                if (error.response.status === 404) {
                    console.log(user);
                    apiClient.post('user', JSON.stringify(user, null, 2))
                        .then(response => {
                            if (response.status === 200) {
                                authenticator.authenticate(user.name, user.email, user.display_pic_route);
                                history.push("/", {auth: true});
                            }
                        })
                        .catch((error) => {
                            if (!error.response.status === 409) {
                                console.log(error);
                                alert("Error API caida (post)!");
                            }
                        })
                } else {
                    console.log("Error API caida (get)")
                }
            });
    }

    return (<GoogleLogin
        clientId="836483726590-4krmbdnkuoo60tlfl9kbk9mlof558sli.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleResponse}
        onFailure={handleResponse}
        cookiePolicy={'single_host_origin'}
    />);
}
