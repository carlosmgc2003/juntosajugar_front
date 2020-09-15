import React from 'react';
import UserList from "./UserList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserList url='http://localhost:4000/user'/>
      </header>
    </div>
  );
}

export default App;
