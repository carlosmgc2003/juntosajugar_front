import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {LoginSocial} from "../components/LoginSocial";
import {LoginPropio} from "../components/LoginPropio";
import UserCreation from "../components/UserCreation";
import Grid from "@material-ui/core/Grid";


// Componente de la pagina de login, donde se muestra el formulario
export default function JoinOrLogin() {
    const [newUser, setNewUser] = useState(false);
    if(newUser === false){
        return (
            <Grid
                container
                direction={"column"}
                justify="flex-start"
                alignItems="baseline"
                spacing={3}
            >
                <Grid item>
                    <h2>Cuenta JaJ</h2>
                </Grid>
                <Grid item>
                    <LoginPropio/>
                </Grid>
                <Grid item>
                    <h2>o si no...</h2>
                    <LoginSocial/>
                </Grid>
                <Grid item>
                    <Button onClick={() => setNewUser(true)}>nuevo usuario?</Button>
                </Grid>

            </Grid>
        );
    } else {
        return (
            <Grid
                container
                direction={"column"}
                justify="flex-start"
                alignItems="baseline"
                spacing={3}
            >
                <Grid item>
                    <h2>Cuenta JaJ</h2>
                </Grid>
                <Grid item>
                    <UserCreation/>
                </Grid>
                <Grid item>
                    <Button onClick={() => setNewUser(false)}>Ya tengo cuenta...</Button>
                </Grid>
            </Grid>
        );
    }


}
