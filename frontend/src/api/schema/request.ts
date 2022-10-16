/** auth api 리스트
 * RequestEmailVerification: 이메일 인증
 * RequestPhoneNumberVerification: 핸드폰 번호 인증
 * ConfirmEmailVerification: 이메일 인증 코드 인증
 * ConfirmPhoneNumVerification: 핸드폰 번호 인증 코드 인증
 * LoginAccessTokenParam: accessToken 발급 로그인 파라미터
 * LoginAccessTokenBody: accessToken 발급 로그인 바디
 * LoginSnsTokenParams: accessToken 발급 sns 로그인 파라미터
 * LoginSnsTokenBody: accessToken 발급 sns 로그인 바디
 * SessionRefresh: 세션 최신화
 * RequestFindEmail: 이메일 찾기 요청
 * RequestTmpSession: 임시 세션 요청
 * RequestResetPassword: 비밀번호 초기화 요청
 */

export interface RequestEmailVerificationParams {
  service_code_path: string;
  format_code_path: string;
}

export interface RequestEmailVerificationBody {
  email: string;
  verification_type: string;
}

export interface RequestPhoneNumberVerification {
  country_code: string;
  phone_number: string;
  verification_type: string;
}

export interface ConfirmEmailVerification {
  email: string;
  auth_code: string;
}

export interface ConfirmPhoneNumVerification {
  country_code: string;
  phone_number: string;
  auth_code: string;
}

export interface LoginAccessTokenParam {
  service_code_path?: string;
  forced?: boolean;
}

export interface LoginAccessTokenBody {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}
export interface LoginSnsTokenParams {
  service_code_path?: string;
  forced?: boolean;
}
export interface LoginSnsTokenBody {
  sns_type: string;
  token: string;
}

export interface SessionRefresh {
  refresh_token: string;
}

export interface RequestFindEmail {
  join_type: string;
  country_code: string;
  phone_num: string;
}

export interface RequestTmpSession {
  user_email: string;
  country_code: string;
  phone_num: string;
}

export interface RequestResetPassword {
  user_pwd: string;
}

/** join api 리스트
 * JoinFormType: 회원가입 폼
 * GoogleValidationToken: 구글 토큰 유효성 인증
 * AppleValidationToken: 애플 토큰 유효성 인증
 * WithdrawalRequest: 사용자 탈퇴 처리
 */

export type JoinFormType = {
  token?: string;
  user_email?: string;
  user_pwd?: string;
  client_type_code_path: string;
  detail: {
    theme_code_path: string;
    ui_lang_code_path: string;
    name: string;
    country_code: string;
    phone_num: string;
    timezone: string;
    join_type: string;
  };
  statuses: {
    service_code_path: string;
    format_code_path: string;
  }[];
  acceptance: {
    sms_news_acceptance: boolean;
    sms_system_acceptance: boolean;
    sms_education_acceptance: boolean;
    email_news_acceptance: boolean;
    email_system_acceptance: boolean;
    email_education_acceptance: boolean;
  };
};

export interface GoogleValidationToken {
  token: string;
}

export interface AppleValidationToken {
  token: string;
}

export interface WithdrawalRequest {
  withdrawal_code_path: string;
  withdrawal_msg: string;
}

/** management api 리스트
 * NodeReadChildrenRequest: 코드 노드 자식 읽기
 * TermsVersionReadAll: 모든 버전의 Terms 요청
 * TermsRead: 특정 버전의 Terms 요청
 * PrivacyVersionReadAll: 모든 버전의 Privacy 요청
 * PrivacyRead: 특정 버전의 Privacy 요청
 * PrivacyRead: 특정 버전의 Privacy 요청
 * NodeCombinationReadAllRequest: 특정 코드 콤비네이션 값 요청
 * SupportContentsTitleMapReadRequest: 지원센터 메타데이터 가져옴
 * SupportContents3rdDepthReadRequest: 3뎁스 데이터 가져옴
 * SupportContentsSearchPageRequest:   지원센터 페이지네이션
 * DraftModalReadPageRequest: 이벤트 모달 읽기
 */
export interface NodeReadChildrenRequest {
  parent_id?: number;
  parent_path?: string;
}

export interface NoticeReadPageRequest {
  service_code_path: string;
  page_size: number;
  page_number: number;
}

export interface ManagementContactCreateRequest {
  service_code_path: string;
  name: string;
  company: string;
  email: string;
  phone_num: string;
  country_code: string;
  contact_title: string;
  contact_contents: string;
}

export interface NoticeReadRequest {
  id: number;
}

export interface NoticeCountsNotReadRequest {
  service_code_path: string;
}

export interface TermsVersionReadAll {
  ui_lang_code_path: string;
}

export interface TermsRead {
  id: number;
}

export interface PrivacyVersionReadAll {
  ui_lang_code_path: string;
}

export interface PrivacyRead {
  id: number;
}

export interface NodeCombinationReadAllRequest {
  row_condition: string;
  col_condition?: string;
  combination_type: string;
}

export interface SupportContentsTitleMapReadRequest {
  service_code_path: string;
  format_code_path_list: string[];
  ui_lang_code_path: string;
}

export interface SupportContents3rdDepthReadRequest {
  id?: number;
  parent_id?: number;
}

export interface SupportContentsSearchPageRequest {
  keywords: string;
  service_code_path: string;
  format_code_path_list: string[];
  ui_lang_code_path: string;
  page_size: number;
  page_number: number;
}

export interface CommentCreateRequestParams {
  format_code_path: string;
  comment_type: string;
  comment_title: string;
  comment_contents: string;
}

export interface DraftModalReadPageRequest {
  service_code_path?: string;
  format_code_path?: string;
  ui_lang_code_path?: string;
  page_size: number;
  page_number: number;
}

export interface DraftNewFeaturesReadPageRequest {
  format_code_path?: string;
  ui_lang_code_path?: string;
  page_size: number;
  page_number: number;
}

/** preference api 리스트
 * PreferenceThemeColorPaletteReadRequest: 테마 데이터 요청
 * PreferenceConfiqureDetailRequest: 사용자 환경 설정(detail 테이블용) 저장
 * PreferenceConfiqureSettingRequest: 사용자 환경 설정(setting 테이블용) 저장
 * PreferenceAcceptanceConfigureRequest: 사용자 환경 설정(수신동의) 저장
 * PreferenceDetailPhoneNumberConfigureRequest: 사용자 환경 설정(핸드폰 번호) 저장
 */

export interface PreferenceThemeColorPaletteReadRequest {
  theme_code_path: string;
}

export interface PreferenceConfiqureDetailRequest {
  theme_code_path?: string;
  ui_lang_code_path?: string;
  name?: string;
  country_code?: string;
  timezone?: string;
}

export interface PreferenceConfiqureSettingRequest {
  setting_code_path: string;
  setting_data: string;
}

export interface PreferenceAcceptanceConfigureRequest {
  sms_news_acceptance: boolean;
  sms_system_acceptance: boolean;
  sms_education_acceptance: boolean;
  email_news_acceptance: boolean;
  email_system_acceptance: boolean;
  email_education_acceptance: boolean;
}

export interface PreferenceDetailPhoneNumberConfigureRequest {
  country_code: string;
  phone_number: string;
}

export interface PreferenceDetailPresignedUrlRead {
  image_type: string;
}

/** draft api 리스트
 * DraftCaseCreateRequest: 케이스 생성
 * DraftCaseUpdateRequest: 케이스 수정
 * DraftCaseReadRequest: 캐이스 한건 정보 가져오기
 * DraftCaseReadPageRequest: 캐이스 리스트 정보 가져오기
 * DraftCaseSlotReadAllRequest: 케이스 슬롯 정보 모두 가져오기
 * DraftCaseSlotReadRequest: 케이스 슬롯 한개 정보 가져오기
 * DraftCaseReadGroupByClientRequest: 클라이언트별 케이스 정보 가져오기
 * DraftCaseCacheCreateOrUpdateRequest: 워크스페이스 작업용 케이스 등록
 * DraftIdiomsReadRequest: 관용어 요청
 * DraftIdiomsUpdateRequest: 관용어 수정
 * DraftCaseReviewValidateReviewer: 케이스 리뷰어 수신자 검증
 */

export interface DraftCaseCreateRequest {
  format_code_path: string;
  work_type_code_path: string;
  workspace_type_code_path: string;
  case_status_code_path: string;
  case_save_location_code_path: string;
  ref_no: string;
  title: string;
  client?: string | null;
  due_date?: string | null;
}

export interface DraftCaseUpdateRequest {
  id: number;
  case_status_code_path: string;
  case_save_location_code_path: string;
  ref_no: string;
  title: string;
  client?: string | null;
  due_date?: string | null;
  active_save_slot: number;
}

export interface DraftCaseReadRequest {
  case_id: number;
}

export interface DraftCaseSlotReadAllRequest {
  case_id: number;
}

export interface DraftCaseSlotReadRequest {
  case_id: number;
  save_slot: number;
}

export interface DraftCaseDeleteRequest {
  case_id: number;
  migration_only?: boolean;
}

export interface DraftCaseReadSecretKeyRequest {
  case_id: number;
}

export interface DraftCaseReadPageRequest {
  case_status_code_path_list?: string[];
  ref_no?: string;
  title?: string;
  client_exact?: string | null;
  client_like?: string;
  client_none?: boolean;
  due_date?: string;
  order_condition?: string;
  order_target?: string;
  page_size: number;
  page_number: number;
}

export interface DraftCaseReadAllRequest {
  format_code_path?: string;
  work_type_code_path?: string;
  workspace_type_code_path?: string;
  case_status_code_path_list?: string | null;
  case_save_location_code_path?: string;
  ref_no?: boolean;
  title?: string;
  client_exact?: string;
  client_like?: string;
  client_none?: string;
  due_date?: string;
  order_condition?: string;
  order_target?: number;
}

export interface DraftCaseReadGroupByClientRequest {
  case_status_code_path_list?: string[];
  page_size: number;
  page_number: number;
}

export interface DraftCasePresignedUrlPublish {
  id: number;
  save_slot: number;
  data_key: string;
  is_update: boolean;
}

export interface DraftCasePresignedUrlsPublish {
  id: number;
  save_slot: number;
  data_keys: string[];
  is_update: boolean;
}

export interface DraftReviewCasePresignedUrlPublish {
  id: number;
  data_key: string;
}

export interface DraftCasePresignedUrlReadRequest {
  id: number;
  save_slot: number;
  data_key: string;
}

export interface DraftCasePresignedUrlReadAllRequest {
  id: number;
  save_slot: number;
}

export interface DraftCaseRefreshUpdateTime {
  id: number;
}

export interface DraftCaseChangeSlot {
  id: number;
  change_slot: number;
}

export interface DraftCaseLoadSlot {
  id: number;
  load_slot: number;
}

export interface DraftReviewCasePresignedUrlReadRequest {
  id: number;
  data_key: string;
}

export interface DraftReviewCasePresignedUrlReadAllRequest {
  id: number;
}

export interface DraftCaseCacheCreateOrUpdateRequest {
  case_master_id?: number;
  review_case_id?: number;
  context?: string;
  activated?: boolean;
  save_slot?: number;
  case_save_location_code_path?: string;
}

export interface DraftIdiomsCreateRequest {
  format_code_path: string;
  dr_idiom_code_path: string;
  idiom_title: string;
  idiom_contents: string;
}

export interface DraftIdiomsReadRequest {
  format_code_path: string;
}

export interface DraftIdiomsUpdateRequest {
  id: number;
  idiom_title: string | null;
  idiom_contents: string;
}

export interface DraftIdiomsDeleteRequest {
  id: number;
}
export interface DraftCaseReviewValidateReviewerRequest {
  format_code_path:
    | "FORMAT/ALL"
    | "FORMAT/KIPO"
    | "FORMAT/USPTO"
    | "FORMAT/JPO"
    | "FORMAT/EPO"
    | "FORMAT/CNIPA"
    | "FORMAT/AUSPAT"
    | "FORMAT/CIPO"
    | "FORMAT/DPMA"
    | "FORMAT/UKIPO"
    | "FORMAT/INPI"
    | "FORMAT/KOEN"
    | "FORMAT/KOJA"
    | "FORMAT/KOZH"
    | "FORMAT/KODE"
    | "FORMAT/KOFR"
    | "FORMAT/JAEN"
    | "FORMAT/JAZH"
    | "FORMAT/JADE"
    | "FORMAT/JAFR"
    | "FORMAT/ZHEN"
    | "FORMAT/ZHDE"
    | "FORMAT/ZHFR"
    | "FORMAT/DEEN"
    | "FORMAT/DEFR"
    | "FORMAT/FREN"
    | "FORMAT/ETC";
  reviewer_email: string;
}

export interface DraftCaseReviewCreateRequest {
  case_master_id: number;
  reviewer_email: string;
  due_date: string;
}

export interface DraftCaseReviewSendReadPageRequest {
  keyword: string;
  page_size: number;
  page_number: number;
}

export interface DraftCaseReviewReceivedReadPageRequest {
  keyword: string;
  page_size: number;
  page_number: number;
}

export interface DraftCaseReviewReadRequest {
  id: number;
}

export interface DraftCaseReviewStartRequest {
  id: number;
}
export interface DraftCaseReviewCompleteRequest {
  id: number;
}

export interface DraftCaseReviewCancelRequest {
  id: number;
  user_type: "requestor" | "reviewer";
}

export interface DraftCaseReviewDeleteRequest {
  id: number;
  user_type: "requestor" | "reviewer";
}

/** payment api 리스트
 * DraftPaymentPricingTableReadAllRequest: 가격 테이블 모두 읽기
 * DraftPaymentFreeTrialOneMonthFreeRequest: 신규 사용자를 위한 한달 무료 신청
 */

export interface DraftPaymentPricingTableReadAllRequest {
  service_code_path: string;
}

export interface DraftPaymentFreeTrialOneMonthFreeRequest {
  service_code_path: string;
  format_code_path: string;
}

/** nlp api 리스트
 * DraftNlpSearchBm25Request: 케이스 생성
 */

export interface NlpSearchBm25Request {
  format_code_path: string;
  // "kr" | "en" | "cn" | "jp";
  source_language: string;
  target_language: string;
  // "source" | "target";
  where: string;
  strategy: "미적용" | "형태소 분석" | "명사를 제외한 형태소 분석 (한글전용)";
  section_type: string;
  index_size: number;
  verbose?: boolean;
}
