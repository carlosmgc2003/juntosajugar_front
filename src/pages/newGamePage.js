import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {GameCreation} from "../components/GameCreation";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));


export default function NewGame() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                    <GameCreation/>
                </MuiPickersUtilsProvider>
                <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
            </div>
    );
}
