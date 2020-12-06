import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
//import {GameCreation} from "../components/GameCreation";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

export default function NewGame() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                {/*<GameCreation/>*/}
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
    );
}
