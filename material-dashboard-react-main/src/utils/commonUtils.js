// 공통 유틸리티 함수들

/**
 * 모바일 디바이스인지 확인하는 함수
 * @returns {boolean} 모바일 디바이스 여부
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 빈 값인지 확인하는 함수
 * @param {*} value 확인할 값
 * @returns {boolean} 빈 값 여부
 */
export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

/**
 * 숫자를 콤마가 포함된 문자열로 변환
 * @param {number} num 변환할 숫자
 * @returns {string} 콤마가 포함된 문자열
 */
export const numberWithCommas = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 날짜 포맷 변환
 * @param {string|Date} date 변환할 날짜
 * @param {string} format 포맷 (기본값: 'YYYY-MM-DD')
 * @returns {string} 포맷된 날짜 문자열
 */
export const formatDate = (date, format = "YYYY-MM-DD") => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
};
