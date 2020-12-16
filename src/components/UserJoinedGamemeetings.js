import React from 'react';
import {apiClient} from "./ApiHandler";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {authenticator} from "../App";


export function UserJoinedGamemeetings(props){
    const [userGm, setUserGm] = React.useState([]);
    const [update, setUpdate] = React.useState(false);
    React.useEffect( () => {
        (async function () {
            let data = await apiClient.fetchUserJoinedGamemeetings(authenticator.id);
            data? setUserGm(data): setUserGm([]);
        })();
    }, [props.update, update]);
    if(userGm.length === 0){
        return <p>Todavia no tienes reuniones que mostrar!</p>
    } else {
        return (<TableContainer component={Paper}>
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
                                <Button variant="contained" color="secondary" onClick={()=>{
                                    apiClient.disjoinToGamemeetings(gm.ID, authenticator.id);
                                    setUpdate(!update);
                                }}>
                                    Abandonar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
    }
}