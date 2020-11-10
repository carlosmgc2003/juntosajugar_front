import React, {useEffect, useState} from "react";
import {apiClient} from "../App";
import { Formik, Field, Form } from 'formik';



export function GameCreation() {
    const [gamesLoaded, setGamesLoaded] = useState(false);
    const [games, setGames] = useState([]);
    useEffect(() => {
        apiClient.get("boardgame")
            .then(response => setGames(response.data))
            .then(setGamesLoaded(true))
    }, []);
    console.log(games);
    if(gamesLoaded) {
        return(
            <div>
                <h1> Componente de Creacion de Juego</h1>
                <Formik initialValues={null} onSubmit={(values, { setSubmitting }) => {
                    apiClient.post('user', JSON.stringify(values, null, 2))
                        .then((response)=> console.log(response))
                        .catch((error) => console.log(error))
                        .finally(() => alert("Sus datos se han enviado correctamente"))
                    setSubmitting(true);
                }}>
                    <Form>
                        <ol>
                            <li>Seleccionar juego</li>
                            <Field as="select" name="color">
                                {games.map((g)=> (<option value={g.name}>{g.name}</option>))}
                            </Field>
                            <li>Seleccionar lugar</li>
                            <li>Seleccionar Cantidad de Jugadores</li>
                        </ol>
                    </Form>
                </Formik>
            </div>
        );
    } else {
        return(<p>Cargando...</p>);
    }
}
