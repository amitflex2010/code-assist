import axios from "axios";
export const APIClient = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  }
});