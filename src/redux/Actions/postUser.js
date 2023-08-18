import axios from "axios";

export const POST_USER = 'POST_USER';

export const postUser = (user) => {
    return async function () {
      const response = await axios.post(
          // "http://localhost:3001/users", user);
          "https://server-greydive-production.up.railway.app/users", user);
    
      return response;
    };
};