
const axios = require('axios');

const client = axios.create({
    baseURL : "http://localhost:4000/",
    withCredentials: true
});

export const apiClient = {
    login: async function (email, password) {
        return await client.post("login", {email: email, password: password})
            .then(() => true)
            .catch(() => false);
    },
    checkUserExists: async function (email) {
        return await client.get("user/email/" + email)
            .then(() => true)
            .catch(() => false);
    },
    fetchUserData: async function (email, password) {
        try {
            if (this.login(email, password)) {
                var response = await client.get("user/email/" + email, {responseType: 'json'});
                return response.data;
            }
        } catch (e) {
            return null;
        }
    },
    saveUserData: async function (user) {
        return await client.post('user', JSON.stringify(user, null, 2))
            .then(() => true)
            .catch(() => false);
    },
    saveGameMeeting: async function (gamemeeting) {
        return await client.post('gamemeeting', JSON.stringify(gamemeeting, null, 2))
            .then(() => true)
            .catch(() => false);
    },
    fetchUserBoardgames: async function (user_id) {
        try {
            let response = await client.get('user/' + user_id + '/boardgames', {responseType: 'json'});
            return response.data;
        }
        catch(e) {
            return null;
        }
    },
    saveBoardgame: async function (boardgame) {
        return await client.post('boardgame', JSON.stringify(boardgame, null, 2))
            .then((r) => {
                return r.data.ID;
            })
            .catch(() => null)
    },
    assingBoardgameUser: async function (userID, bgID) {
        return await client.post('user/' + userID + '/boardgames',JSON.stringify({boardgame_id: bgID}, null, 2))
            .then(() => true)
            .catch(() =>false);
    },
    findBoardgameByName: async function(bgName) {
        try{
            let response = await client.get('boardgame/name/' + bgName);
            return response.data;
        } catch (e) {
            return null;
        }
    },
    saveAndAssignBoargameUser: async function(userID, boardgame) {
        try{
            let savedBoardgame = await this.findBoardgameByName(boardgame.name);
            if(!savedBoardgame){
                let bgID = await this.saveBoardgame(boardgame);
                if(bgID){
                    return await this.assingBoardgameUser(userID, bgID);
                } else {
                    console.log("No se puede guardar este juego en la BD");
                    return null;
                }
            } else {
                return await this.assingBoardgameUser(userID, savedBoardgame.ID)
            }

        } catch (e) {
            console.log(e);
        }
    },
    fetchGamemeetings: async function(){
        try{
            let response = await client.get('gamemeeting',{responseType: 'json'});
            return response.data;
        } catch (e) {
            return null;
        }
    },
    fetchUserGamemeetings: async function(user_id){
        try{
            const response = await client.get('gamemeeting',{responseType: 'json'});
            const gamemeetings = response.data;
            return gamemeetings.filter(gm => gm.Owner.ID === parseInt(user_id))
        } catch (e) {
            return null;
        }
    },
    fetchUserJoinedGamemeetings: async function(user_id){
        try{
            const response = await client.get('gamemeeting/user/'+ user_id,{responseType: 'json'});
            return  response.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    },
    deleteUserCreatedGamemeeting: async function(game_id, user_id){
        try{
            const response = await client.delete('gamemeeting/'+ game_id, {
             headers:{'Authorization':user_id}});
            console.log(response.data);
            return  response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    joinToGamemeetings: async function(game_id, user_id){
        try{
            await client.get("/gamemeeting/"+ game_id + "/join/" + user_id);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },
    disjoinToGamemeetings: async function(game_id, user_id){
        try{
            await client.get("/gamemeeting/"+ game_id + "/disjoin/" + user_id);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}