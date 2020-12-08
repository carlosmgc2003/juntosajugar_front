const axios = require('axios');

const client = axios.create({
    baseURL : "http://localhost:4000/",
    withCredentials: true
});

export const apiClient = {
    login : async function(email, password) {
        return await client.post("login",{email:email, password:password})
            .then(() => true)
            .catch(() => false);
    },
    checkUserExists : async function(email) {
        return await client.get("user/email/" + email)
            .then(() => true)
            .catch(() => false);
    },
    fetchUserData : async function(email, password) {
        try{
            if(this.login(email, password)){
                var response = await client.get("user/email/" + email, {responseType: 'json'});
                return response.data;
            }
        }
        catch(e) {
            return null;
        }
    },
    saveUserData : async function(user) {
        return await client.post('user', JSON.stringify(user, null, 2))
            .then(() => true)
            .catch(() => false);
    },
    saveGameMeeting : async function(gamemeeting) {
        return await client.post('gamemeeting', JSON.stringify(gamemeeting, null, 2))
            .then(() => true)
            .catch(() => false);
    }
}