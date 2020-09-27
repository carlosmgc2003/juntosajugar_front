import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function GameList() {
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
                <h2>Aca irá la lista de juegos!</h2>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
        </Container>
    );
}