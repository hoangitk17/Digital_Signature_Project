import api from "../services/api";
import apiv1 from "../services/api_v1_1";
const endPoint = "/Account";
const endPoint_Partner = "/Partner";
const endPoint_AccountInfo = "/Account/Info";
const endPoint_AccountInfoStaff = "/Account/InfoStaff";

export const login = (payload, deviceId) => {
  const data = payload;
  data.device_info = deviceId;
  let config = {
    headers: {
      "x-client-id": "1b88e978-a8ba-43d2-a950-50995a89c9cc"
    }
  };
  return api.post(
    `${endPoint}/Login?secret=4f396a1ee7ba84cc&language=vi&version=1.0`,
    data,
    config
  );
};
export const logout = (payload, deviceId) => {
  const data = payload;
  data.device_id = deviceId;
  console.log(data)
  let config = {
    headers: {
      "device_id": deviceId,
      "x-client-version": "ios-xxx"
    }
  };
  return apiv1.post(
    `${endPoint}/Logout?language=vi`,
    data,
    config
  );
};

export const getPartnerList = payload => {
  return api.get(`${endPoint_Partner}?language=vi`);
};

export const getAccountList = payload => {
  const { index } = payload;
  return api.get(
    `${endPoint}`,
    {
      params: {
        language: "vi",
        index,
        page_size: 10
      }
    }
  )
};

export const getFullAccountList = payload => {
  return api.get(`${endPoint}?language=vi&page_size=-1`);
};

export const getAccountInfo = payload => {
  return api.get(`${endPoint_AccountInfo}?language=vi`);
};

export const getAccountInfoStaff = payload => {
  const { id } = payload;
  return api.get(`${endPoint_AccountInfoStaff}?language=vi&user_id=${id}`);
};

export const createAccountStaff = payload => {
  const { data } = payload;
  return api.post(`${endPoint}/RegisterStaff?language=vi`, data);
};

export const updateAccountInfo = payload => {
  const { data } = payload;
  return api.put(`${endPoint}/UpdateStaff?language=vi`, data);
};

export const updateAvatar = payload => {
  const { data } = payload;
  return api.post(`${endPoint}/UpdateAvatar`, data);
};

export const changeStatusUser = payload => {
  const { data } = payload;
  console.log("user_id", data.user_id)
  return api.post(
    `${endPoint}/${data.user_id}/ChangeStatus?language=vi&status=${data.status}`
  );
};

export const changePassword = payload => {
  const { data } = payload;
  return api.post(
    `${endPoint}/SetPasswordStaff?language=vi`, data
  );
};

export const addGroupToUser = payload => {
  const { data } = payload;
  return api.put(`${endPoint}/${data.user_id}/GroupUser?language=vi`, data);
};

/**
 * Update info device
 * @param {*} payload
 */
export const updateDevice = (payload) => {
  const { data, device_id, user_id } = payload;
  return apiv1.put(`${endPoint}/${user_id}/Device?device_id=${device_id}&language=vi`, data);
}