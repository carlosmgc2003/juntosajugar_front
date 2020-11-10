import React from 'react';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.retrieveUsersFromAPI = this.retrieveUsersFromAPI.bind(this);
        this.deleteUserFromAPI = this.deleteUserFromAPI.bind(this);
        this.state = {
            isLoaded: false,
            userData: [],
        }
    }

    retrieveUsersFromAPI(){
        apiclient.get('user')
            .then((response) => {
                this.setState({ userData: response.data, isLoaded: true })
            })
            .catch(console.log);
    }

    deleteUserFromAPI(event, userID){
        fetch('http://localhost:4000/user/' + userID, {method:'DELETE'})
            .then(res => console.log(res))
            .finally(() => this.retrieveUsersFromAPI());
    }

    componentDidMount() {
        this.retrieveUsersFromAPI();
    }

    render() {
        const isLoaded = this.state.isLoaded;
        if(isLoaded) {
            return (
                <div>
                    <div>
                        <h2>Lista de Usuarios</h2>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Creacion</th>
                            <th>Actualización</th>
                            <th>Archivo</th>
                            <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.userData.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.ID}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.CreatedAt}</td>
                                        <td>{user.UpdatedAt}</td>
                                        <td>{user.display_pic_route}</td>
                                        <td><button onClick={(e) => this.deleteUserFromAPI(e, user.ID)}>Eliminar</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <button onClick={this.retrieveUsersFromAPI}>Actualizar</button>
                </div>
            );
        } else {
            return <p>Cargando!</p>
        }

    }
}

export default UserList;