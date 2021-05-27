import api from "../services/api";

export const createLog = payload => {
    const { data } = payload;
    return api.post(`/log/create`, data);
};