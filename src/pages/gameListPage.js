import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {GamemeetingsBoard} from "../components/GamemeetingsBoard";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

export default function GameList() {
    const classes = useStyles();
    return (
              <div className={classes.root}>
                <h2>Elegi una partida y preparate para jugar!</h2>
                  <GamemeetingsBoard />
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
    );
}
