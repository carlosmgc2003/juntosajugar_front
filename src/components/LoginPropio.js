import { Formik, Field, Form } from 'formik';
import React from "react";
import Grid from "@material-ui/core/Grid";
import {get, post} from "axios";
import {useHistory} from "react-router-dom";
import {authenticator} from "../App";


export function LoginPropio() {
    let history = useHistory();
    return (
      <React.Fragment>

          <Formik initialValues={{
              email: '',
              password: '',
          }} onSubmit={(values) => {
              post("http://localhost:4000/login", values)
                  .then(response => {
                      if (response.status === 200) {
                          get("http://localhost:4000/user/email/" + values.email, {responseType: 'json'})
                              .then(response => {
                                  // El status 200 indica que el email existe en la API
                                  if (response.status === 200) {
                                      const user = response.data;
                                      console.log(user);
                                      authenticator.authenticate(user.name, user.email, user.display_pic_route);
                                      history.push("/", {auth: true});
                                  }
                              }).catch(error => alert("API Caida"))
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                      if(error.response.status === 404) {
                          alert("El usuario no existe!");
                      }
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
                      <button type='submit'>Enviar</button>
                  </Form>
              </Grid>
          </Formik>
      </React.Fragment>
    );
}