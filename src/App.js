import React from 'react';
import Home from "./pages/homePage";
import {
    Switch,
    Route
} from "react-router-dom";
import Login from "./pages/joinPage";
import GameList from "./pages/gameListPage";
import NewGame from "./pages/newGamePage";

function App() {
  return (
      <div>
          <Switch>
              <Route path="/newgame">
                  <NewGame />
              </Route>
              <Route path="/games">
                  <GameList />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path="/">
                  <Home />
              </Route>
          </Switch>
      </div>
  );
}

export default App;
