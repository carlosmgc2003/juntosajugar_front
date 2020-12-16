import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {GameCreation} from "../components/GameCreation";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));


export default function NewGame() {
    const classes = useStyles();
    return (
            <Grid container alignItems={'center'} className={classes.root}>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        <GameCreation/>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
    );
}
