import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import {authenticator} from "../App";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NiceHeader from "../components/HeaderComp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


// Componente boton que demuestra el estado de autenticacion del usuario.
function LoginButton(props) {
    const [auth, setAuth] = useState(props.authenticated);
    if (auth) {
        return (
            <div>
                <div>
                    {authenticator.display_pic !== null ? <img src={authenticator.display_pic} alt={authenticator.name}/>
                            : <AccountCircleIcon />}
                </div>
                <div>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => {
                                authenticator.signout();
                                setAuth(false);
                            }
                            }
                            to="/login">Salir {authenticator.name}</Button>
                    {/*<Button variant="contained" color="primary">Mi Perfil</Button>*/}
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

export default function Home(props) {
    const classes = useStyles();

    return (
        <Container>
            <header>
                <NiceHeader />
            </header>
            <div className={classes.root}>
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={4}>
                        <h2>Para empezar a jugar</h2>
                        <p>Ingrese como usuario, es rápido!</p>
                        <Paper className={classes.paper}>
                            <LoginButton authenticated={authenticator.isAuthenticated}/>
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
                </Grid>
            </div>
        </Container>
    );
}
