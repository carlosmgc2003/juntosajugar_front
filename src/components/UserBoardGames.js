import React from 'react';
import {apiClient} from "./ApiHandler";
import {authenticator} from "../App";

export default function UserBoardGames(props) {
    const [userBg, setUserBg] = React.useState([]);
    React.useEffect( () => {
        (async function () {
            let data = await apiClient.fetchUserBoardgames(authenticator.id);
            setUserBg(data);
        })();
        }, [props.update]);
    if(userBg.length === 0){
        return <p>Todavia no tienes juegos que mostrar!</p>
    } else {
        return (<ul>
            {userBg.map((juego, index)=>{
                    return <li key={index}>{juego.name} - {juego.class}</li>
                })}
        </ul>)
    }
}