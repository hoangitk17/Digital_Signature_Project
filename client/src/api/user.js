import api from "../services/api";

export const getUserList = payload => {
    return api.get(`/user/listuser`);
};

export const getUserById = payload => {
    const { id } = payload;
    const data = { id: id };
    return api.get(`/user/${id}`, data);
};

export const signIn = payload => {
    const { data } = payload;
    return api.post(`/auth/signin`, data);
};

export const signUp = payload => {
    const { data } =  payload ;
    return api.post(`/user/signup`, data);
};

export const getPublicKeyServer = payload => {
    const id = "123";
    const data = { id: id };
    return api.get(`/auth/getPublicKeyServer`, data);
};

export const updateInfoUser = payload => {
    const { id, data } = payload;
    return api.put(`/user/image-sign/${id}`, data);
};

export const getUserInfoByPublicKey = payload => {
  const { data } = payload;
  return api.post(`/user/getUserInfoByPublicKey`, data);
};