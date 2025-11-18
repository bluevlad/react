import axios from "axios";
import headersConfig from "../config/headersConfig";
import { isMobileDevice } from "./commonUtils";
import { Storage } from "./storage";
import { useRefreshToken } from "../hooks/query/config";
import qs from "qs";
import moment from "moment-timezone";

//console.log("Accept-Language:", navigator.language);
const timeZoneOffset = moment().format("Z");
//console.log("timeZoneOffset:", timeZoneOffset);
const userCompanyCode = Storage.local.get("x-company-code");

// 요청 중복 방지를 위한 변수
let isRefreshing = false;
// 콜백 큐
let refreshSubscribers = [];

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const instance = axios.create({
  // 테스트
  baseURL: isMobileDevice() ? process.env.REACT_APP_MOBILE_URL : process.env.REACT_APP_URL,
  timeout: userCompanyCode === "H501" ? 0 : 60 * 1000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true, // 크로스 사이트 접근 제어(cross-site Access-Control) 요청이 필요한 경우 설정.
});

// X-Current-URL, X-Current-Menu-id 모두 정확한 명칭으로 바꿔야 함
instance.interceptors.request.use(
  (config) => {
    //console.log("instance.interceptors.request.use:", config);
    if (config.url.includes("/bulk-approval") && config.timeout === 60 * 1000) {
      config.timeout = 120 * 1000; // 타임아웃을 120초로 설정
    }
    console.log("Request Timeout:", config.timeout);
    return headersConfig(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log(response, "res")
    const { status, data } = response;
    if ((status === 401 || data.code === 401) && !response.config._retry) {
      // 재시도 루프 방지
      response.config._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          //const newToken = useRefreshToken({userId: Storage.local.get("x-user-id") || ""})
          //refetchRefreshToken();
        } catch (refreshErr) {
          isRefreshing = false;
          return Promise.reject(refreshErr);
        }
      }

      // 새로운 토큰 적용 후 맨 처음 401 났던 요청을 재실행
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((token) => {
          // 여기서 헤더에 직접 재발급 받은 토큰을 주입) 아마 LocalStorage에만 등록해주면 자동으로 주입되긴 할 듯
          response.config.headers = response.config.headers || {};
          response.config.headers["Authorization"] = token;
          resolve(instance(response.config));
        });
      });

      //return Promise.reject(response);
    }

    if (status >= 400) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    // console.log("err:", error);
    return Promise.reject(error);
  }
);

const get = (url, config) => {
  const res = instance.get(url, config);
  return res;
};

const put = (url, data, config) => {
  return instance.put(url, data, config);
};

const patch = (url, data, config) => {
  return instance.patch(url, data, config);
};

const post = (url, data, config) => {
  return instance.post(url, data, config);
};

const postMultiPart = (url, data, config) => {
  config = {
    ...config,
    isMultiPart: "1",
  };
  return instance.post(url, data, config);
};

const request = {
  get,
  put,
  patch,
  post,
  postMultiPart,
  // delete
};

export default request;
