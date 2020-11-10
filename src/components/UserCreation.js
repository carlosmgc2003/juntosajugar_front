import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {apiClient} from "../App";


const UserCreation = () => (
    <div>
        <h2>Creación de Usuario</h2>
        <Formik
            initialValues={{ email: '', name: '', display_pic_route:'' }}
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
                    !/^(?:[a-zA-Z0-9]+[._]?[a-zA-Z0-9]+)+$/i.test(values.name)
                ) {
                    errors.name = 'Nombre de usuario inválido.'
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
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    apiClient.post('user', JSON.stringify(values, null, 2))
                        .then((response)=> console.log(response))
                        .catch((error) => console.log(error))
                        .finally(() => alert("Sus datos se han enviado correctamente"))
                    setSubmitting(true);
                }, 400);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <Form>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="name">Nombre de Usuario</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                   <div>
                       <label htmlFor="display_pic_route">Avatar</label>
                       <Field type="file" name="display_pic_route" />
                       <ErrorMessage name="display_pic_route" component="div" />
                   </div>
                    <button type="submit" disabled={isSubmitting}>
                        Guardar
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default UserCreation;