import {Field, Form, Formik} from 'formik';
import {TextField} from 'formik-material-ui';
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import {authenticator} from "../App";
import {apiClient} from "./ApiHandler";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Button} from "@material-ui/core";

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

export function LoginPropio() {
    let history = useHistory();
    const classes = useStyles();
    const [invalidCred, setInvalidCred] = useState(false);
    return (
        <React.Fragment>
            {/*Formulario de formik para login de JaJ*/}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Requerido';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Email Inválido';
                    }
                    if (!values.password) {
                        errors.password = 'Requerido';
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    /*Post con las credenciales a la API*/
                    let user = await apiClient.fetchUserData(values.email, values.password)
                    if (user) {
                        authenticator.authenticate(user.ID, user.name, user.email, null);
                        history.push("/", {auth: true});
                    } else {
                        setInvalidCred(true);
                    }
                }
                }
            >
                {({isSubmitting}) => (
                    <Grid
                        container
                        direction={"row"}
                        justify="flex-start"
                        alignItems="baseline"
                        spacing={3}
                    >
                        <Form>
                            <Paper className={classes.paper}>
                                <Grid item>
                                    <label htmlFor="email">Email: </label>
                                </Grid>
                                <Grid item>
                                    <Field component={TextField}
                                           variant="outlined"
                                           type='email' id='email' name='email'
                                           placeholder="carlos@juntosajugar.com"/>
                                </Grid>
                                <Grid item>
                                    <label htmlFor="password">Contraseña: </label>
                                </Grid>
                                <Grid item>
                                    <Field component={TextField} variant="outlined" type='password' id='password'
                                           name='password'/>
                                </Grid>
                                {invalidCred ?
                                    <Grid item xs={12}><p>Nombre de usuario o contraseña inválido</p></Grid> : null}
                                <Grid item>
                                    <Button className={classes.button}
                                            type='submit'
                                            variant={"contained"}
                                            color={"primary"}
                                            disabled={isSubmitting}>Ingresar</Button>
                                </Grid>
                            </Paper>
                        </Form>
                    </Grid>
                )}
            </Formik>
        </React.Fragment>
    );
}
