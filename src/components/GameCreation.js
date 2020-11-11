import React, {useEffect, useState} from "react";
import {apiClient} from "../App";
import {Field, Form, Formik} from 'formik';
import {Button} from "@material-ui/core";
import MapContainer from "./MapComp";


function AgregarNuevoJuego() {
    return (<Button>Agregar nuevo juego</Button>);
}


export function GameCreation() {
    const [gamesLoaded, setGamesLoaded] = useState(false);
    const [games, setGames] = useState([]);
    useEffect(() => {
        apiClient.get("boardgame")
            .then(response => setGames(response.data))
            .then(setGamesLoaded(true))
    }, []);
    if (gamesLoaded) {
        return (
            <div>
                <h1> Componente de Creacion de Juego</h1>
                <Formik initialValues={null} onSubmit={(values, {setSubmitting}) => {
                    apiClient.post('user', JSON.stringify(values, null, 2))
                        .then((response) => console.log(response))
                        .catch((error) => console.log(error))
                        .finally(() => alert("Sus datos se han enviado correctamente"))
                    setSubmitting(true);
                }}>
                    <Form>
                        <h2>Seleccionar Juego</h2>
                        {games.length > 0 ?
                            (<div>
                                <Field as="select" name="color">
                                    {games.map((g) => (<option value={g.name}>{g.name}</option>))}
                                </Field>
                            </div>) : (<AgregarNuevoJuego/>)}
                        <h2>Seleccionar lugar</h2>
                        <div>
                            <MapContainer/>
                        </div>
                        <h2>Seleccionar Cantidad de Jugadores</h2>
                    </Form>
                </Formik>
            </div>
        );
    } else {
        return (<p>Cargando...</p>);
    }
}
