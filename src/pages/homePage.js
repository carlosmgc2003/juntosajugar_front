import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {authenticator} from "../App";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {UserGamemeetings} from "../components/UserGameMeetings";
import {UserJoinedGamemeetings} from "../components/UserJoinedGamemeetings";
import UserList from "../components/UserList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: '3px',
    }
}));


// Componente boton que demuestra el estado de autenticacion del usuario.
function LoginButton(props) {
    let history = useHistory();
    const classes = useStyles();
    const [auth, setAuth] = useState(props.authenticated);
    if (auth) {
        return (
            <div>
                <div>
                    {authenticator.display_pic !== null ? <img src={authenticator.display_pic} alt={authenticator.name}/>
                            : <AccountCircleIcon />}
                </div>
                <div>
                    <Button className={classes.button} variant="contained"
                            color="primary"
                            onClick={() => {
                                authenticator.signout(history.push("/"));
                                setAuth(false);
                                props.callback(false);
                            }
                            }
                            to="/login">Salir {authenticator.name}</Button>
                    <Button className={classes.button}
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/user">Mi Perfil</Button>
                </div>
            </div>


        )
    } else {
        return (
            <Button variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/login">Unirse o Login</Button>
        )
    }
}

export default function Home() {
    const classes = useStyles();
    const [update, setUpdate] = useState(authenticator.isAuthenticated)
    return (
                <Grid container spacing={3} alignItems="stretch" className={classes.root}>
                    <Grid item xs={4}>
                        <h2>Para empezar a jugar</h2>
                        <p>Ingrese como usuario, es rápido!</p>
                        <Paper className={classes.paper}>
                            <LoginButton authenticated={authenticator.isAuthenticated} callback={setUpdate}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Hay jugadores esperandolo</h2>
                        <p>Vea la lista de partidas que esperan a que participes!</p>
                        <Paper className={classes.paper}>
                            <Button variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to="/games">Reuniones Disponibles</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <h2>No esperes más!</h2>
                        <p>Crea ya la reunion de tu juego favorito!</p>
                        <Paper className={classes.paper}>
                            <Button variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to="/newgame">Crear Reunion</Button>
                        </Paper>
                    </Grid>
                    {(authenticator.isAuthenticated && update? (<Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h2>Mis juegos Creados</h2>
                            <UserGamemeetings/>
                        </Paper>
                    </Grid>) : null)}
                    {(authenticator.isAuthenticated && update? (<Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h2>Juegos Pendientes</h2>
                            <UserJoinedGamemeetings/>
                        </Paper>
                    </Grid>) : null)}
                    {(authenticator.id === 1? (<Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h2>Espacio Admin</h2>
                            <UserList />
                        </Paper>
                    </Grid>) : null)}
                </Grid>
    );
}
