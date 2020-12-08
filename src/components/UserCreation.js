import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {apiClient} from "./ApiHandler";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TextField } from 'formik-material-ui';
import {Button} from "@material-ui/core";
//import { SimpleFileUpload } from 'formik-material-ui';

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



export default function UserCreation(){
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
                    <h2>Creación de Usuario</h2>
                </Grid>
        <Formik
            initialValues={{ email: '', name: '',password: '', display_pic_route:'', rep_password:'' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Requerido';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Email Inválido';
                }
                if (!values.name) {
                    errors.name = 'Requerido';
                } else if (
                    values.name.length <= 6
                ) {
                    errors.name = 'Nombre demasiado corto'
                }
                else if (
                    values.name.length >= 30
                ) {
                    errors.name = 'Nombre demasiado largo'
                }
                if(
                    values.display_pic_route.length >= 50
                ) {
                    errors.display_pic_route = 'Nombre de archivo demasiado largo'
                }
                if(!values.rep_password) {
                    errors.rep_password = 'Debe repetir el password';
                }
                if(!values.password) {
                    errors.password = 'Requerido';
                }
                else if(values.password.length < 6) {
                    errors.password = 'Debe ser de 6 o mas caracteres';
                } else if(values.password !== values.rep_password) {
                    errors.rep_password = 'No coinciden las contrasenias';
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if(await apiClient.saveUserData(values)) {
                    history.push("/");
                } else {
                    setInvalidOperation(true);
                }

            }}
        >
            {({
                  isSubmitting,
              }) => (
                <Form>
                    <Grid item>
                        <Field component={TextField} type="email" name="email" label={'E-Mail'}/>
                    </Grid>
                    <Grid item>
                        <Field component={TextField} type="text" name="name" label={'Nombre completo'}/>
                    </Grid>
                    {/*
                    <Grid item>
                        <Field component={SimpleFileUpload} name="display_pic_route" label={'Archivo de Imagen'}/>
                    </Grid>
                    */}
                    <Grid item>
                        <Field component={TextField} type="password" name="password" label={'Contraseña'}/>
                    </Grid>
                    <Grid item>
                        <Field component={TextField} type="password" name="rep_password" label={'Repetir Contraseña'}/>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button}
                                type='submit'
                                variant={"contained"}
                                disabled={isSubmitting}
                                color={"primary"}>Crear Usuario</Button>
                    </Grid>
                    {invalidOperation? <Grid item>
                        <p>No se pudo crear el usuario, intenta mas tarde...</p>
                    </Grid> : null}
                </Form>
            )}
        </Formik>
            </Paper>
        </Grid>
    </React.Fragment>
);
}