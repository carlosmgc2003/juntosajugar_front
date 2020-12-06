import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {LoginSocial} from "../components/LoginSocial";
import {LoginPropio} from "../components/LoginPropio";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

// Componente de la pagina de login, donde se muestra el formulario
export default function Login() {

    const classes = useStyles();
    return (
            <div className={classes.root}>
                <h2>Cuenta JaJ</h2>
                <LoginPropio/>
                <h2>o si no...</h2>
                <LoginSocial/>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
    );
}
