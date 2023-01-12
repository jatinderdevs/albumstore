
import Axios from "axios";
import Config from "../config.json";

export function createalbum(album) {
    return Axios.post(`${Config.Api}/create`, album);
}

export function removealbum(albumId) {
    return Axios.delete(`${Config.Api}/remove/${albumId}`);
}

export function getalbumdata(albumId) {
    return Axios.get(`${Config.Api}/edit/${albumId}`);
}

export function updateAlbum(albumId, album) {
    return Axios.post(`${Config.Api}/edit/${albumId}`, album);
}