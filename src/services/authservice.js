import Axios from "axios";
import Config from "../config.json";
import jwtDecode from 'jwt-decode';
const tokenKey = "token";

const token = localStorage.getItem(tokenKey);

if (token) {
    Axios.defaults.headers.common['x-auth-token'] = token;
}



export function signUp(user) {
    return Axios.post(`${Config.Api}/register`, user);
}


export async function signIn(username, password) {
    const { data: jwt } = await Axios.post(`${Config.Api}/signin`, {
        username: username,
        password: password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
    window.location = "/";
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem(tokenKey);
        return jwtDecode(token);

    } catch (ex) {
        return null;
    }

}