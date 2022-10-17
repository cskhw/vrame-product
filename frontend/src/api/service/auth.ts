import instance from "@/api/instance";
import type { LoginRequest, RegisterRequest } from "@/api/schema/request";
import type {
  AuthTokenResponse,
  RefreshedSessionTimeResponse,
  SimpleResponse,
} from "@/api/schema/response";
import type { AxiosResponse } from "axios";
import { ACCESS_TOKEN_KEY_NAME } from "@/utils/common";
import { GlobalCookies } from "@/utils/cookie";

export default {
  register: (params: RegisterRequest): Promise<AxiosResponse<SimpleResponse>> =>
    instance.post("/auth/registor", params),
  login: (params: LoginRequest): Promise<AxiosResponse<SimpleResponse>> =>
    instance.post("/auth/login", params),
};
