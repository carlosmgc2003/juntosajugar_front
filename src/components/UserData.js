import React from 'react';
import {authenticator} from "../App";

export default function UserData() {
    return (
        <React.Fragment>
            <h3>Nombre</h3>
            <ul>
                <li>{authenticator.name}</li>
            </ul>
            <h3>Email</h3>
            <ul>
                <li>{authenticator.email}</li>
            </ul>
            {authenticator.display_pic ?
            <div>
                <h3>Imagen de Perfil</h3>
                <ul>
                    <li>{authenticator.display_pic}</li>
                </ul>
            </div>:null
            }

        </React.Fragment>
    )

}