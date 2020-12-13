import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import UserData from "../components/UserData";
import UserBoardGames from "../components/UserBoardGames";
import {BoardGameCreation} from "../components/BoardGameCreation";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

export default function UserProfile() {
    const classes = useStyles();
    const [updateGameList, setUpdateGameList] = React.useState(false);
    return (
        <div className={classes.root}>
            <h2>Mis datos</h2>
            <UserData/>
            <h2>Mis juegos</h2>
            <UserBoardGames update={updateGameList}/>
            <h3>Agregar juego</h3>
            <BoardGameCreation callback={() => setUpdateGameList(!updateGameList)}/>
            <Button variant="contained" color="primary" component={RouterLink} to="/">Volver</Button>
        </div>
    );
}
