import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {GameCreation} from "../components/GameCreation";
import NiceHeader from "../components/HeaderComp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function NewGame() {
    const classes = useStyles();
    return (
        <Container>
            <header>
                <NiceHeader />
            </header>
            <div className={classes.root}>
                <GameCreation></GameCreation>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
        </Container>
    );
}
