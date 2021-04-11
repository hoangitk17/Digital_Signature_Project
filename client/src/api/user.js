import api from "../services/api";

export const getUserList = payload => {
    return api.get(`/user/listuser`);
};

export const getUserById = payload => {
    const { id } = payload;
    return api.get(`/user/${id}`);
};

export const signIn = payload => {
    const { data } = payload;
    console.log("data login api", data)
    return api.post(`/auth/signin`, data);
};

export const signUp = payload => {
    const { data } =  payload ;
    return api.post(`/user/signup`, data);
};

export const getPublicKeyServer = payload => {
  return api.get(`/auth/getPublicKeyServer`);
};

export const updateInfoUser = payload => {
    const { id, data } = payload;
    console.log("data api", id, data, payload)
    return api.put(`/user/image-sign/${id}`, data);
};

export const getUserInfoByPublicKey = payload => {
  const { data } = payload;
  return api.post(`/user/getUserInfoByPublicKey`, data);
};