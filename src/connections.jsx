import axios from "axios";

// Localhost
const baseURL ='http://localhost:8080/'

// Server
// const baseURL ='https://vrnova-backend.herokuapp.com/';

export default axios.create({
  baseURL: baseURL,
  headers:{"Content-type": "application/json"} 
});