// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.BACKEND_API_ENDPOINT || (process.env.NODE_ENV === "development" ? "http://localhost:4040/" : "https://skylaundryp7.herokuapp.com/"),
});
export default instance;