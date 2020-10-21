import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {LoginSocial} from "../components/LoginSocial";
import {LoginPropio} from "../components/LoginPropio";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

// Componente de la pagina de login, donde se muestra el formulario
export default function Login() {

    const classes = useStyles();
    return (
        <Container>
            <header>
                <div>
                    <h1>¡Juntos a Jugar!</h1>
                    <p>La web donde jugamos y aprendemos :)</p>
                </div>
            </header>
            <div className={classes.root}>
                <h2>Cuenta JaJ</h2>
                <LoginPropio/>
                <h2>Si no tenes cuenta...</h2>
                <LoginSocial/>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
        </Container>
    );
}