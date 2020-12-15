import React from 'react';
import {apiClient} from "./ApiHandler";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {authenticator} from "../App";
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import Grid from "@material-ui/core/Grid";


export function GamemeetingsBoard(){
    const [userGm, setUserGm] = React.useState([]);
    const [update, setUpdate] = React.useState(false);
    React.useEffect( () => {
        (async function () {
            let data = await apiClient.fetchGamemeetings();
            setUserGm(data);
        })();
    }, [update]);
    if(userGm.length === 0){
        return <p>Todavia no tienes reuniones que mostrar!</p>
    } else {
        return (
            <Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={()=>update? setUpdate(false): setUpdate(true)}>
                        <UpdateSharpIcon/>
                    </Button>
                </Grid>
                <Grid item xs={12}>
            <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nro</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Lugar</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Juego</TableCell>
                        <TableCell>Jugadores</TableCell>
                        <TableCell>Accion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userGm.map((gm, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {i}
                            </TableCell>
                            <TableCell align="left">{gm.ID}</TableCell>
                            <TableCell align="left">{gm.place}</TableCell>
                            <TableCell align="left">{gm.scheduled}</TableCell>
                            <TableCell align="left">{gm.Boardgame.name}</TableCell>
                            <TableCell align="left">{gm.Players.length}/{gm.max_players}</TableCell>
                            <TableCell align="left">
                                <Button variant="contained" color="primary" disabled={(()=> gm.OwnerID === parseInt(authenticator.id))()}>
                                    Unirme!
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>

            </Grid>)
    }
}