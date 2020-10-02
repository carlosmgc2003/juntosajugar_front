import React from 'react';
import Home from "./pages/homePage";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from "./pages/joinPage";
import GameList from "./pages/gameListPage";
import NewGame from "./pages/newGamePage";


// Objeto singleton que manejará el estado de login del usuario.
export const authenticator = {
    isAuthenticated: false,
    name: null,
    authenticate : function(name) {
        authenticator.isAuthenticated = true;
        authenticator.name = name;
    },
    signout: function(callback) {
        authenticator.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

// Componente principal que tiene las rutas necesarias para diferenciar el contenido
function App() {
    return (
        <div>
            <Switch>
                <PrivateRoute path="/newgame">
                    <NewGame/>
                </PrivateRoute>
                <PrivateRoute path="/games">
                    <GameList/>
                </PrivateRoute>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
}


// Wrapper alrededor de route para verificar si esta autenticado el usuario.
function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                authenticator.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;
