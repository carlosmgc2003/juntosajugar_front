import React from 'react';
import {apiClient} from "./ApiHandler";
import {authenticator} from "../App";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: '3px',
    },
    input: {
        margin: '3px',
    }
}));

export function BoardGameCreation(props) {
    const classes = useStyles();
    const [invalidOperation, setInvalidOperation] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const bgClasses = ["Ingenio", "Estrategia", "Clasico", "Dados", "Palabras", "Cartas"];
    const initialValues = {
        name: "",
        class: "",
    }
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
                        <h3>Agrega tu Juego de Mesa</h3>
                    </Grid>
                    <Formik
                        initialValues={initialValues}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Requerido';
                            }
                            if (!values.class) {
                                errors.class = 'Requerido';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            resetForm(initialValues);
                            if (await apiClient.saveAndAssignBoargameUser(authenticator.id, values)) {
                                props.callback();
                                setSuccess(true);
                                setInvalidOperation(false);
                            } else {
                                setSuccess(false);
                                setInvalidOperation(true);
                            }


                        }}>
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              isSubmitting,
                          }) => (
                            <Form>
                                <Grid item>
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='text' id='name' name='name'
                                           label={'Nombre del Juego'}
                                           className={classes.input}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl variant="outlined" fullWidth
                                                 error={touched.class && Boolean(errors.class)}
                                                 >
                                        <InputLabel id="classLabel">Clase</InputLabel>
                                        <Select

                                            fullWidth
                                            id="class"
                                            name="class"
                                            value={values.class}
                                            onChange={handleChange}
                                            label="Clase"
                                            error={touched.class && Boolean(errors.class)}
                                        >
                                            <MenuItem value="">
                                                <em>Seleccione una clase</em>
                                            </MenuItem>
                                            {bgClasses.map((clase, index) => {
                                                return <MenuItem key={index} value={clase}>{clase}</MenuItem>
                                            })}
                                        </Select>
                                        {touched.class && Boolean(errors.class) ?
                                            <FormHelperText>Requerido</FormHelperText> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button type='submit'
                                            variant={"contained"}
                                            disabled={isSubmitting}
                                            color={"primary"}>Agregar a mi Coleccion</Button>
                                    {invalidOperation ? <p>No se pudo guardar el juego!</p> : null}
                                    {success ? <p>Se guardo el juego con exito!</p> : null}
                                </Grid>
                            </Form>
                        )}

                    </Formik>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}