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
        display_pic_route: "",
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
                            if (!values.display_pic_route) {
                                errors.display_pic_route = 'Requerido';
                            } else if (values.display_pic_route.length < 10 || values.display_pic_route.length > 50){
                                errors.display_pic_route = 'Debe tener entre 10 y 50 caracteres.'
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
                                           label={'Nombre del Juego'}/>
                                </Grid>
                                <Grid item>
                                    <FormControl variant="outlined" fullWidth
                                                 error={touched.class && Boolean(errors.class)}>
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
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='text' id='display_pic_route' name='display_pic_route'
                                           label={'Foto del Juego'}/>
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