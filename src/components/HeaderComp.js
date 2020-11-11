import React from "react";
import logo from '../img/juntosajugarlogo.png'
import Grid from "@material-ui/core/Grid";



export default function NiceHeader() {
    return (
            <Grid container direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item>
                    <h1>¡Juntos a Jugar!</h1>
                    <p>La web donde jugamos y aprendemos :)</p>
                </Grid>
                <Grid item>
                    <img src={logo} alt={'logo'} width="100" height="100"/>
                </Grid>
            </Grid>
    );
}
