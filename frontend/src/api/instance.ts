import axios, { type AxiosResponse } from "axios";
import { GlobalCookies } from "@/assets/javascripts/cookie";

import { HTTP_REQUEST_TIMEOUT } from "@/assets/javascripts/common";
import { axiosTimeoutLock } from "@/api/lock";
import type {
  AxiosTimoutLockConfig,
  AxiosTimeoutLockResponse,
} from "@/api/lock";
import { ACCESS_TOKEN_KEY_NAME } from "@/assets/javascripts/common";
import { getBaseUrl } from "@/api/utils";
import { responseStatus } from "@/api/error";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: HTTP_REQUEST_TIMEOUT,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async function (config: AxiosTimoutLockConfig) {
    if (axiosTimeoutLock.isLocked(config.lockId)) {
      await axiosTimeoutLock.waitUntilReleased(config.lockId);

      // 락 해제 이후, 세션 동기화
      // 현재 락은 세션에만 관여, 락 해제 이후 반드시 세션이 변경되야 함
      const authSync = GlobalCookies.get(ACCESS_TOKEN_KEY_NAME);
      if (config?.headers?.Authorization && authSync) {
        config.headers.Authorization = authSync;
      }
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const url = error.response.config.url;
    const status = error.response.status;

    if (
      status === responseStatus.invalidAuthenticationRequestError ||
      status === responseStatus.invalidUserSessionRequestError ||
      status === responseStatus.invalidUserSessionExpiredError
    ) {
      if (
        url === "service/auth/login/access-token" ||
        url === "service/auth/login/sns-token"
      ) {
        throw error;
      }

      // 리다이렉트
      console.log("axiosInstance.interceptors.response redirect to...");
      router.push("/timeout");
    }

    return Promise.reject(error);
  }
);

const filterConfigParams = (config: AxiosTimoutLockConfig | undefined) => {
  if (config?.params) {
    const filtered = Object.entries(config.params).filter(([_, value]) => {
      return Array.isArray(value)
        ? value.length > 0
        : value !== null && value !== undefined && value !== "";
    });
    config.params = Object.fromEntries(filtered);
    return config;
  }

  return config;
};

const instance = {
  ...axiosInstance,

  _setLockIdToConfig: function (
    lockId: string,
    config: AxiosTimoutLockConfig | undefined
  ) {
    config = filterConfigParams(config);
    if (config === undefined) {
      config = {
        lockId,
      };
    } else {
      config.lockId = lockId;
    }

    return config;
  },

  waitUntilReleased: async function () {
    if (axiosTimeoutLock.isLocked(undefined)) {
      await axiosTimeoutLock.waitUntilReleased(undefined);
    }

    return this;
  },

  get: async function (
    url: string,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosResponse<any, any>> {
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    return axiosInstance.get(url, config);
  },

  getNaiveUrl: async function (
    url: string,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosResponse<any, any>> {
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    config.baseURL = "";
    return axiosInstance.get(url, config);
  },

  getWithLock: async function (
    url: string,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosTimeoutLockResponse<any>> {
    // 락 설정
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    await axiosTimeoutLock.lock(lockId);

    // axios 호출
    return axiosInstance
      .get(url, config)
      .then((response) => {
        return {
          response: response,
          release: axiosTimeoutLock.release,
          lockId: lockId,
        };
      })
      .catch((err) => {
        axiosTimeoutLock.release(lockId);
        throw err;
      });
  },

  post: async function (
    url: string,
    data?: any,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosResponse<any, any>> {
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    return axiosInstance.post(url, data, config);
  },

  postWithLock: async function (
    url: string,
    data?: any,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosTimeoutLockResponse<any>> {
    // 락 설정
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    await axiosTimeoutLock.lock(lockId);

    // axios 호출
    return axiosInstance
      .post(url, data, config)
      .then((response) => {
        return {
          response: response,
          release: axiosTimeoutLock.release,
          lockId: lockId,
        };
      })
      .catch((err) => {
        axiosTimeoutLock.release(lockId);
        throw err;
      });
  },

  put: async function (
    url: string,
    data?: any,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosResponse<any, any>> {
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    return axiosInstance.put(url, data, config);
  },

  putWithLock: async function (
    url: string,
    data?: any,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosTimeoutLockResponse<any>> {
    // 락 설정
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    await axiosTimeoutLock.lock(lockId);

    // axios 호출
    return axiosInstance
      .put(url, data, config)
      .then((response) => {
        return {
          response: response,
          release: axiosTimeoutLock.release,
          lockId: lockId,
        };
      })
      .catch((err) => {
        axiosTimeoutLock.release(lockId);
        throw err;
      });
  },

  delete: async function (
    url: string,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosResponse<any, any>> {
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    return axiosInstance.delete(url, config);
  },

  deleteWithLock: async function (
    url: string,
    config?: AxiosTimoutLockConfig | undefined
  ): Promise<AxiosTimeoutLockResponse<any>> {
    // 락 설정
    const lockId = axiosTimeoutLock.getId(url);
    config = this._setLockIdToConfig(lockId, config);
    await axiosTimeoutLock.lock(lockId);

    // axios 호출
    return axiosInstance
      .delete(url, config)
      .then((response) => {
        return {
          response: response,
          release: axiosTimeoutLock.release,
          lockId: lockId,
        };
      })
      .catch((err) => {
        axiosTimeoutLock.release(lockId);
        throw err;
      });
  },
};

instance.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (Array.isArray(paramObj[key])) {
      for (const value of paramObj[key]) {
        params.append(key, value);
      }
    } else {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
};

export default instance;
