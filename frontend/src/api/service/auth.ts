import instance from "@/api/instance";
import type { AxiosTimeoutLockResponse } from "@/api/lock";
import type {
  ConfirmEmailVerification,
  ConfirmPhoneNumVerification,
  LoginAccessTokenBody,
  LoginAccessTokenParam,
  LoginSnsTokenBody,
  LoginSnsTokenParams,
  RequestEmailVerificationBody,
  RequestEmailVerificationParams,
  RequestFindEmail,
  RequestPhoneNumberVerification,
  RequestResetPassword,
  RequestTmpSession,
  SessionRefresh,
} from "@/api/schema/request";
import type {
  AuthTokenResponse,
  RefreshedSessionTimeResponse,
  SimpleResponse,
} from "@/api/schema/response";
import type { AxiosResponse } from "axios";
import {
  ACCESS_TOKEN_KEY_NAME,
  SERVICE_CODE_PATH_DR,
} from "@/assets/javascripts/common";
import { GlobalCookies } from "@/assets/javascripts/cookie";

export default {
  requestEmailVerification: (
    params: RequestEmailVerificationParams,
    body: RequestEmailVerificationBody
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/auth/request-email-verification", body, {
      params: params,
    }),
  requestPhoneNumberVerification: (
    body: RequestPhoneNumberVerification
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/auth/request-phone-number-verification", body),
  confirmEmailVerification: (
    body: ConfirmEmailVerification
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/auth/confirm-email-verification", body),
  confirmPhoneNumVerification: (
    body: ConfirmPhoneNumVerification
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/auth/confirm-phone-num-verification", body),
  loginAccessToken: function loginAccessToken(
    body: LoginAccessTokenBody,
    params: LoginAccessTokenParam = {
      forced: false,
      service_code_path: SERVICE_CODE_PATH_DR,
    }
  ): Promise<AxiosTimeoutLockResponse<AuthTokenResponse>> {
    const urlBody = new URLSearchParams();
    urlBody.append("grant_type", "");
    urlBody.append("username", body.username);
    urlBody.append("password", body.password);
    urlBody.append("scope", "");
    urlBody.append("client_id", "");
    urlBody.append("client_secret", "");

    return instance.postWithLock("service/auth/login/access-token", urlBody, {
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  loginSnsToken: (
    body: LoginSnsTokenBody,
    params: LoginSnsTokenParams = {
      forced: false,
      service_code_path: SERVICE_CODE_PATH_DR,
    }
  ): Promise<AxiosTimeoutLockResponse<AuthTokenResponse>> =>
    instance.postWithLock("service/auth/login/sns-token", body, {
      params: params,
    }),
  logout: (): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.delete("service/auth/logout", {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),
  sessionRefresh: (
    body: SessionRefresh
  ): Promise<AxiosTimeoutLockResponse<RefreshedSessionTimeResponse>> =>
    instance.postWithLock("service/auth/session/refresh", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  requestFindEmail: (
    body: RequestFindEmail
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/auth/request-find-email", body, {}),
  requestTmpSession: (
    body: RequestTmpSession
  ): Promise<AxiosResponse<AuthTokenResponse, object>> =>
    instance.post("service/auth/request-tmp-session", body, {}),
  requestResetPassword: (
    body: RequestResetPassword
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.put("service/auth/request-reset-password", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),
};
