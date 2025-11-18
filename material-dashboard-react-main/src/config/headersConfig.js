import { Storage } from "utils/storage";

/**
 * HTTP 요청 헤더 설정 함수
 * @param {Object} config axios 설정 객체
 * @returns {Object} 헤더가 설정된 config 객체
 */
const headersConfig = (config) => {
  // 기본 헤더 설정
  const defaultHeaders = {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Accept-Language": navigator.language || "ko-KR",
  };

  // 로컬 스토리지에서 인증 정보 가져오기
  const accessToken = Storage.local.get("access-token");
  const refreshToken = Storage.local.get("refresh-token");
  const userId = Storage.local.get("x-user-id");
  const companyCode = Storage.local.get("x-company-code");
  const userRole = Storage.local.get("x-user-role");

  // 인증 헤더 추가
  if (accessToken) {
    defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    defaultHeaders["X-Refresh-Token"] = refreshToken;
  }

  // 사용자 정보 헤더 추가
  if (userId) {
    defaultHeaders["X-User-Id"] = userId;
  }

  if (companyCode) {
    defaultHeaders["X-Company-Code"] = companyCode;
  }

  if (userRole) {
    defaultHeaders["X-User-Role"] = userRole;
  }

  // 현재 URL 및 메뉴 ID (필요시 추가)
  const currentUrl = window.location.pathname;
  const currentMenuId = Storage.local.get("current-menu-id");

  if (currentUrl) {
    defaultHeaders["X-Current-URL"] = currentUrl;
  }

  if (currentMenuId) {
    defaultHeaders["X-Current-Menu-Id"] = currentMenuId;
  }

  // 타임존 정보 추가
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone) {
    defaultHeaders["X-Timezone"] = timeZone;
  }

  // MultiPart 요청인 경우 Content-Type 제거
  if (config.isMultiPart) {
    delete defaultHeaders["Content-Type"];
  }

  // 기존 헤더와 병합
  config.headers = {
    ...defaultHeaders,
    ...config.headers,
  };

  return config;
};

export default headersConfig;
