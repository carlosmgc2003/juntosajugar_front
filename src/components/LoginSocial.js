import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {authenticator} from "../App";
import {useHistory} from "react-router-dom";
import {apiClient} from "./ApiHandler";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    button: {
        margin: '3px',
    }
}));

export function LoginSocial() {
    const classes = useStyles();
    let history = useHistory();
    const [failure, setFailure] = React.useState(false);

    async function handleResponse(response) {
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
        if (await apiClient.checkUserExists(email)) {
            authenticator.authenticate(user.name, user.email, user.display_pic_route);
            history.push("/", {auth: true});
        } else {
            if (await apiClient.saveUserData(user)) {
                authenticator.authenticate(user.name, user.email, user.display_pic_route);
                history.push("/", {auth: true});
            } else {
                console.log("Error API caida");
            }
        }
    }
    return (
        <Grid container justify="flex-start"
              alignItems="center" spacing={3}>
            <Grid item>
                <GoogleLogin
                    className={classes.button}
                    clientId="836483726590-4krmbdnkuoo60tlfl9kbk9mlof558sli.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleResponse}
                    onFailure={() => setFailure(true)}
                    cookiePolicy={'single_host_origin'}
                />
            </Grid>
            {failure? <Grid item>
                <p>Fallo el login de Google, intentalo de nuevo.</p>
            </Grid>: null}
        </Grid>
        );
}
