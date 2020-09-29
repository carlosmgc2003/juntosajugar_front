import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink, useHistory, useLocation} from "react-router-dom";
import {authenticator} from "../App"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

// Componente de la pagina de login, donde se muestra el formulario
export default function Login() {
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/"}};
    let login = () => {
        authenticator.authenticate(() => {
            history.replace(from);
        });
    };
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
                <h2>Click para loguearse!</h2>
                <Button variant="contained" color="secondary" onClick={login}>Loguearse</Button>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
        </Container>
    );
}