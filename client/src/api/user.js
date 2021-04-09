import api from "../services/api";

export const getUserList = payload => {
    return api.get(`/user/listuser`);
};

export const getUserListById = payload => {
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