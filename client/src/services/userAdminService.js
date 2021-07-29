import axios from "axios";
const loginPath = "/api/login";
const signupPath = "/api/users";

const services = {
  login: async (credentials) => {
    const res = await axios.post(loginPath, credentials);
    return res.data;
  },
  signup: async (credentials) => {
    const res = await axios.post(signupPath, credentials);
    return res.data;
  },
};

export default services;
