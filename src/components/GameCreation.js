import React, {useState} from "react";
import {Field, Form, Formik} from 'formik';
import {TextField} from "formik-material-ui";
import {Button} from "@material-ui/core";
import {DateTimePicker} from 'formik-material-ui-pickers';
import {apiClient} from "./ApiHandler";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {authenticator} from "../App";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: '3px',
    }
}));

// Componente de creacion de reunion nueva.
// TODO: Tener la lista de juegos del usuario.
// TODO: Agregar el mapa para seleccionar el lugar.
// TODO: Convertir la Fecha y hora a formato de la API (RFC3339).
export function GameCreation() {
    let history = useHistory();
    const classes = useStyles();
    const [invalidOperation, setInvalidOperation] = useState(false);
    return (
        <React.Fragment>
            <Grid
                container
                direction={"row"}
                justify="flex-start"
                alignItems="baseline"
                spacing={3}
            >
                <Paper className={classes.paper}>
                    <Grid item>
                        <h1>Creacion de Juego</h1>
                    </Grid>

                    <Formik
                        initialValues={
                            {
                                game: "",
                                place: "",
                                scheduled: new Date(),
                                max_players: 1,
                                owner: parseInt(authenticator.id)
                            }
                        }
                        validate={values => {
                            const errors = {};
                            if (!values.game) {
                                errors.game = 'Requerido';
                            }
                            if (!values.place) {
                                errors.place = 'Requerido';
                            }
                            if (values.max_players > 10) {
                                errors.max_players = 'Hasta 10 jugadores permitidos';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, {setSubmitting}) => {
                            setSubmitting(true);
                            console.log(values);
                            await apiClient.saveGameMeeting(values);
                            history.push("/");
                            setInvalidOperation(false);
                        }}>
                        {({
                              isSubmitting
                          }) => (
                            <Form>
                                <Grid item>
                                    <h2>Ingresar juego</h2>
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='text' id='game' name='game'
                                           label={'A que Jugaremos?'}/>
                                </Grid>
                                <Grid item>
                                    <h2>Ingresar lugar</h2>
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='text' id='place' name='place'
                                           label={'Donde Jugaremos?'}/>
                                </Grid>
                                <Grid item>
                                    <h2>Ingresar fecha</h2>
                                    <Field component={DateTimePicker}
                                           inputVariant={'outlined'}
                                           label='Cuando Jugaremos?'
                                           name='scheduled'
                                           disablePast
                                           cancelLabel={'Cancelar'}
                                           clearLabel={'Limpiar'}
                                    />
                                </Grid>
                                <Grid item>
                                    <h2>Ingresar la cantidad maxima de jugadores</h2>
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='number' id='max_players' name='max_players'
                                           label={'Cantidad de Jugadores'}/>
                                </Grid>
                                <Grid item>
                                    <Button type='submit'
                                            variant={"contained"}
                                            disabled={isSubmitting}
                                            color={"primary"}>Crear</Button>
                                    {invalidOperation ? <p>No se pudo guardar la reunion</p> : null}
                                </Grid>
                            </Form>
                        )}

                    </Formik>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}
