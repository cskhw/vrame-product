import instance from "@/api/instance";
import type {
  DraftCaseChangeSlot,
  DraftCaseLoadSlot,
  DraftReviewCasePresignedUrlReadAllRequest,
  DraftCasePresignedUrlsPublish,
  DraftCasePresignedUrlReadAllRequest,
  DraftCaseRefreshUpdateTime,
  DraftReviewCasePresignedUrlReadRequest,
  DraftReviewCasePresignedUrlPublish,
  DraftCaseCreateRequest,
  DraftCasePresignedUrlPublish,
  DraftCasePresignedUrlReadRequest,
  DraftCaseReadGroupByClientRequest,
  DraftCaseReadPageRequest,
  DraftCaseReadRequest,
  DraftCaseDeleteRequest,
  DraftCaseReadSecretKeyRequest,
  DraftCaseUpdateRequest,
  DraftCaseCacheCreateOrUpdateRequest,
  DraftIdiomsReadRequest,
  DraftIdiomsUpdateRequest,
  DraftIdiomsCreateRequest,
  DraftIdiomsDeleteRequest,
  DraftCaseReviewValidateReviewerRequest,
  DraftCaseReviewCreateRequest,
  DraftCaseReviewSendReadPageRequest,
  DraftCaseReviewReceivedReadPageRequest,
  DraftCaseReviewStartRequest,
  DraftCaseReviewCompleteRequest,
  DraftCaseReviewCancelRequest,
  DraftCaseReviewDeleteRequest,
  DraftCaseReadAllRequest,
  DraftCaseSlotReadRequest,
  DraftCaseSlotReadAllRequest,
  DraftCaseReviewReadRequest,
} from "@/api/schema/request";
import type {
  PresignedURL,
  PresignedURLs,
  PostResponsePresignedURLs,
  PostResponsePresignedURL,
  DraftCaseSlotsResponse,
  DraftCaseCreateResponse,
  DraftCaseReadGroupByClientResponse,
  DraftCaseReadPageResponse,
  DraftCaseReadResponse,
  DraftCaseSecretKeyPayload,
  DraftCaseUpdateResponse,
  DraftIdiomsReadResponse,
  SimpleResponse,
  DraftCaseCacheCreateOrUpdateResponse,
  DraftCaseCacheReadResponse,
  DraftIdiomsUpdateResponse,
  DraftIdiomsCreateResponse,
  DraftCaseDeleteResponse,
  DraftCaseReviewCountsResponse,
  DraftCaseReviewListAllAvailableCasesResponse,
  DraftCaseReviewSendReadPageResponse,
  DraftCaseReviewReceivedReadPageResponse,
  DraftCaseReadAllResponse,
  DraftCaseSlotResponse,
} from "@/api/schema/response";
import type { AxiosResponse } from "axios";
import { ACCESS_TOKEN_KEY_NAME } from "@/assets/javascripts/common";
import { GlobalCookies } from "@/assets/javascripts/cookie";

export default {
  downloadFromPresignedUrl: (
    url: string
  ): Promise<AxiosResponse<any, object>> =>
    instance.getNaiveUrl(url, { responseType: "blob" }),

  draftIdiomsCreate: (
    body: DraftIdiomsCreateRequest
  ): Promise<AxiosResponse<DraftIdiomsCreateResponse, object>> =>
    instance.post("service/draft/idiom/create", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),
  draftIdiomsRead: (
    params: DraftIdiomsReadRequest
  ): Promise<AxiosResponse<DraftIdiomsReadResponse, object>> =>
    instance.get("service/draft/idiom/read/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  draftIdiomsUpdate: (
    body: DraftIdiomsUpdateRequest
  ): Promise<AxiosResponse<DraftIdiomsUpdateResponse, object>> =>
    instance.put("service/draft/idiom/update", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  draftIdiomsDelete: (
    params: DraftIdiomsDeleteRequest
  ): Promise<AxiosResponse<DraftCaseDeleteResponse, object>> =>
    instance.delete("service/draft/idiom/delete", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseCreate: (
    body: DraftCaseCreateRequest
  ): Promise<AxiosResponse<DraftCaseCreateResponse, object>> =>
    instance.post("service/draft/case/create", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseUpdate: (
    body: DraftCaseUpdateRequest
  ): Promise<AxiosResponse<DraftCaseUpdateResponse, object>> =>
    instance.put("service/draft/case/update", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseDelete: (
    params: DraftCaseDeleteRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.delete("service/draft/case/delete", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReadPage: (
    params: DraftCaseReadPageRequest
  ): Promise<AxiosResponse<DraftCaseReadPageResponse, object>> =>
    instance.get("service/draft/case/read/page", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReadAll: (
    params: DraftCaseReadAllRequest
  ): Promise<AxiosResponse<DraftCaseReadAllResponse, object>> =>
    instance.get("service/draft/case/read/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readSlotsOfCase: (
    params: DraftCaseSlotReadAllRequest
  ): Promise<AxiosResponse<DraftCaseSlotsResponse, object>> =>
    instance.get("service/draft/case/slot/read/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseSlotRead: (
    params: DraftCaseSlotReadRequest
  ): Promise<AxiosResponse<DraftCaseSlotResponse, object>> =>
    instance.get("service/draft/case/slot/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseRead: (
    params: DraftCaseReadRequest
  ): Promise<AxiosResponse<DraftCaseReadResponse, object>> =>
    instance.get("service/draft/case/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readCaseSecretKey: (
    params: DraftCaseReadSecretKeyRequest
  ): Promise<AxiosResponse<DraftCaseSecretKeyPayload, object>> =>
    instance.get("service/draft/case/secret-key/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReadGroupByClient: (
    params: DraftCaseReadGroupByClientRequest
  ): Promise<AxiosResponse<DraftCaseReadGroupByClientResponse, object>> =>
    instance.get("service/draft/case/read/group-by-client", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  publishPresignedUrlOfCase: (
    params: DraftCasePresignedUrlPublish
  ): Promise<AxiosResponse<PostResponsePresignedURL, object>> =>
    instance.get("service/draft/case/presigned-url/publish", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  publishPresignedUrlOfCaseAll: (
    params: DraftCasePresignedUrlsPublish
  ): Promise<AxiosResponse<PostResponsePresignedURLs, object>> =>
    instance.get("service/draft/case/presigned-url/publish/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readPresignedUrlOfCase: (
    params: DraftCasePresignedUrlReadRequest
  ): Promise<AxiosResponse<PresignedURL, object>> =>
    instance.get("service/draft/case/presigned-url/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readPresignedUrlOfCaseAll: (
    params: DraftCasePresignedUrlReadAllRequest
  ): Promise<AxiosResponse<PresignedURLs, object>> =>
    instance.get("service/draft/case/presigned-url/read/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  createOrUpdateCacheOfCase: (
    body: DraftCaseCacheCreateOrUpdateRequest
  ): Promise<AxiosResponse<DraftCaseCacheCreateOrUpdateResponse, object>> =>
    instance.put("service/draft/case/cache/create_or_update", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  changeSlotOfCase: (
    params: DraftCaseChangeSlot
  ): Promise<AxiosResponse<PresignedURLs, object>> =>
    instance.put("service/draft/case/change-slot", null, {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  loadSlotOfCase: (
    params: DraftCaseLoadSlot
  ): Promise<AxiosResponse<PresignedURLs, object>> =>
    instance.put("service/draft/case/load-slot", null, {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readCacheOfCase: (): Promise<
    AxiosResponse<DraftCaseCacheReadResponse, object>
  > =>
    instance.get("service/draft/case/cache/read", {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),
  /**케이스 리뷰 부분 */
  caseReviewCounts: (): Promise<
    AxiosResponse<DraftCaseReviewCountsResponse, object>
  > =>
    instance.get("service/draft/case/review/counts", {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewListAllAvailableCases: (): Promise<
    AxiosResponse<DraftCaseReviewListAllAvailableCasesResponse, object>
  > =>
    instance.get("service/draft/case/review/list-all-available-cases", {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewValidateReviewer: (
    params: DraftCaseReviewValidateReviewerRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.get("service/draft/case/review/validate-reviewer", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewCreate: (
    body: DraftCaseReviewCreateRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.post("service/draft/case/review/create", body, {
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readCaseOfRewview: (
    params: DraftCaseReviewReadRequest
  ): Promise<AxiosResponse<DraftCaseReadResponse, object>> =>
    instance.get("service/draft/case/review/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewSendReadPage: (
    params: DraftCaseReviewSendReadPageRequest
  ): Promise<AxiosResponse<DraftCaseReviewSendReadPageResponse, object>> =>
    instance.get("service/draft/case/review/send/read/page", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewReceivedReadPage: (
    params: DraftCaseReviewReceivedReadPageRequest
  ): Promise<AxiosResponse<DraftCaseReviewReceivedReadPageResponse, object>> =>
    instance.get("service/draft/case/review/received/read/page", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  publishPresignedUrlOfReviewCase: (
    params: DraftReviewCasePresignedUrlPublish
  ): Promise<AxiosResponse<PostResponsePresignedURL, object>> =>
    instance.get("service/draft/case/review/presigned-url/publish", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readPresignedUrlsOfReviewCase: (
    params: DraftReviewCasePresignedUrlReadRequest
  ): Promise<AxiosResponse<PresignedURL, object>> =>
    instance.get("service/draft/case/review/presigned-url/read", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  readPresignedUrlsOfReviewCaseAll: (
    params: DraftReviewCasePresignedUrlReadAllRequest
  ): Promise<AxiosResponse<PresignedURLs, object>> =>
    instance.get("service/draft/case/review/presigned-url/read/all", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewStart: (
    params: DraftCaseReviewStartRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.put("service/draft/case/review/start", null, {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewComplete: (
    params: DraftCaseReviewCompleteRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.put("service/draft/case/review/complete", null, {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewCancel: (
    params: DraftCaseReviewCancelRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.delete("service/draft/case/review/cancel", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  caseReviewDelete: (
    params: DraftCaseReviewDeleteRequest
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.delete("service/draft/case/review/delete", {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),

  refreshUpdateTimeOfCase: (
    params: DraftCaseRefreshUpdateTime
  ): Promise<AxiosResponse<SimpleResponse, object>> =>
    instance.put("service/draft/case/refresh-update-time", null, {
      params: params,
      headers: {
        Authorization: GlobalCookies.get(ACCESS_TOKEN_KEY_NAME),
      },
    }),
};
