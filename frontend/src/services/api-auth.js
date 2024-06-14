import instance from "../config/axios";


async function login(userData) {
  let data = await instance.post("/api/authenticator/signin", userData);
  return data;
}

async function signup(userData) {
  let data = await instance.post("/api/authenticator/signup", userData);
  return data;
}

async function getUserId(token) {
  let data = await instance.get(`/api/authenticator/get-userInfor?token=${token}`);
  return data;
}

export { login, signup, getUserId }