import React from 'react';
import UserList from "./UserList";
import UserCreation from "./UserCreation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserList url='http://localhost:4000/user'/>
          <UserCreation></UserCreation>
      </header>

    </div>
  );
}

export default App;
