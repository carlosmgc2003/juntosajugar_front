import { Formik, Field, Form } from 'formik';
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import {apiClient, authenticator} from "../App";


export function LoginPropio() {
    let history = useHistory();
    const [invalidCred, setInvalidCred] = useState(false);
    return (
      <React.Fragment>
          {/*Formulario de formik para login de JaJ*/}
          <Formik initialValues={{
              email: '',
              password: '',
          }}
                  onSubmit={(values) => {
              /*Post con las credenciales a la API*/
              apiClient.post("login", values)
                  .then(response => {
                      /*Si la respuesta es 200 pedimos el resto de los datos*/
                      if (response.status === 200) {
                          apiClient.get("user/email/" + values.email, {responseType: 'json'})
                              .then(response => {
                                  // El status 200 indica que el email existe en la API
                                  if (response.status === 200) {
                                      const user = response.data;
                                      /* Guardo los datos en el singleton de sesion */
                                      authenticator.authenticate(user.name, user.email, null);
                                      history.push("/", {auth: true});
                                  }
                              }).catch(error => alert("API Caida"))
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                      setInvalidCred(true);
                  })
          }
          }
          >
              <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
              >
                  <Form>
                      <Grid item xs={12}>
                          <label htmlFor="email">Email: </label>
                          <Field type='email' id='email' name='email' placeholder="carlos@juntosajugar.com" />
                      </Grid>
                      <Grid item xs={12}>
                          <label htmlFor="password">Contraseña: </label>
                          <Field type='password' id='password' name='password' />
                      </Grid>
                      {invalidCred? <p>Nombre de usuario o contraseña inválido</p> : null}
                      <button type='submit'>Enviar</button>
                  </Form>
              </Grid>
          </Formik>
      </React.Fragment>
    );
}
