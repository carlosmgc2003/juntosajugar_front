import React from 'react';
import Home from "./pages/homePage";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import JoinOrLogin from "./pages/joinPage";
import GameList from "./pages/gameListPage";
import NewGame from "./pages/newGamePage";
import NiceHeader from "./components/HeaderComp";
import {Container} from "@material-ui/core";

// Objeto singleton que manejará el estado de login del usuario.
export const authenticator = {
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
    display_pic: null,
    sessionCookie: null,
    authenticate : function(id, name, email, display_pic) {
        authenticator.isAuthenticated = true;
        authenticator.id = id;
        authenticator.name = name;
        authenticator.email = email;
        authenticator.display_pic = display_pic;
        //authenticator.sessionCookie = session_cookie;
        sessionStorage.setItem("id", this.id);
        sessionStorage.setItem("name", this.name);
        sessionStorage.setItem("email", this.email);
        sessionStorage.setItem("display_pic", this.display_pic);
        //sessionStorage.setItem("sessionCookie", this.sessionCookie);
    },
    signout: function(callback) {
        authenticator.isAuthenticated = false;
        sessionStorage.clear();
        setTimeout(callback, 100);
    },
    init: function() {
        if(sessionStorage.getItem("email") !== null) {
            let id = sessionStorage.getItem("id");
            let name = sessionStorage.getItem("name");
            let email = sessionStorage.getItem("email");
            let display_pic = sessionStorage.getItem("display_pic");
            this.authenticate(id, name, email, display_pic);
        }
    }
};

authenticator.init();
// Componente principal que tiene las rutas necesarias para diferenciar el contenido
function App() {
    return (
        <Container>
            <header>
                <NiceHeader/>
            </header>
            <div>
                <Switch>
                    <PrivateRoute path="/newgame">
                            <NewGame/>
                    </PrivateRoute>
                    <PrivateRoute path="/games">
                        <GameList/>
                    </PrivateRoute>
                    <Route path="/login">
                        <JoinOrLogin/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Container>

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
