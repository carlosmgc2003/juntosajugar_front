import React from 'react';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.retrieveUsersFromAPI = this.retrieveUsersFromAPI.bind(this)
        this.state = {
            isLoaded: false,
            userData: [],
        }
    }

    retrieveUsersFromAPI(){
        fetch('http://localhost:4000/user')
            .then(res => res.json())
            .then((data) => {
                this.setState({ userData: data, isLoaded: true })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.retrieveUsersFromAPI()
    }

    render() {
        const isLoaded = this.state.isLoaded;
        if(isLoaded) {
            return (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Creacion</th>
                            <th>Actualización</th>
                            <th>Archivo</th>
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