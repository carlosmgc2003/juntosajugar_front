import React from "react";
import logo from '../img/juntosajugarlogo.png'
import Grid from "@material-ui/core/Grid";
import {Link as RouterLink} from "react-router-dom";
import {Button} from "@material-ui/core";



export default function NiceHeader() {
    return (
            <Grid container direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item>
                    <h1>¡Juntos a Jugar!</h1>
                    <p>La web donde jugamos y aprendemos <span role="img" aria-label="eyelid">😉</span></p>
                </Grid>
                <Grid item>
                    <Button variant="contained" component={RouterLink} to="/">
                        <img src={logo} alt={'logo'} width="100" height="100"/>
                    </Button>

                </Grid>
            </Grid>
    );
}
