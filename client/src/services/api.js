import axios from "axios";
import { get, save, clearAll } from "./localStorage";
import { history } from "../App";

const baseURL = "http://localhost:5000/";

const instance = axios.create({
  baseURL: baseURL
});

instance.interceptors.request.use(
  config => {
    const token = get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  err => err
);

const getNewTokenAndReattemptRequest = async (config, refToken) => {
  try {
    const getNewToken = await axios.post(
      "Account/RefreshToken?secret=4f396a1ee7ba84cc&language=vi",
      {
        refresh_token: refToken
      },
      {
        headers: {
          "x-client-id": "1b88e978-a8ba-43d2-a950-50995a89c9cc",
          "device_id": get("deviceId"),
          "x-client-version": "web-browser"
        }
      }
    );
    const { token, refreshToken } = getNewToken.data.data;
    save("accessToken", token);
    save("refreshToken", refreshToken);
    config.headers["Authorization"] = `Bearer ${token}`;
    return await axios(config);
  } catch (err) {
    console.log(err);
    clearAll();
    history.push("/login");
    return Promise.reject(err);
  }
};

instance.interceptors.response.use(
  res => res,
  error => {
    const {
      config,
      config: { validateStatus },
      response: { status },
      message,
    } = error;
    console.log(error.response)
    if (validateStatus()) return Promise.reject(error.response);
    if ((status ? status : -1) === 401) {
      const refreshToken = get("refreshToken");
      if (refreshToken)
        return getNewTokenAndReattemptRequest(config, refreshToken);
      else {
        history.push("/login");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error.response);
  }
);

export default instance;
