// 로컬 스토리지 및 세션 스토리지 유틸리티

/**
 * 로컬 스토리지 관리 객체
 */
const local = {
  /**
   * 로컬 스토리지에 값 저장
   * @param {string} key 키
   * @param {*} value 값
   */
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  /**
   * 로컬 스토리지에서 값 가져오기
   * @param {string} key 키
   * @returns {*} 저장된 값
   */
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  },

  /**
   * 로컬 스토리지에서 값 제거
   * @param {string} key 키
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  /**
   * 로컬 스토리지 전체 비우기
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

/**
 * 세션 스토리지 관리 객체
 */
const session = {
  /**
   * 세션 스토리지에 값 저장
   * @param {string} key 키
   * @param {*} value 값
   */
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  },

  /**
   * 세션 스토리지에서 값 가져오기
   * @param {string} key 키
   * @returns {*} 저장된 값
   */
  get: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from sessionStorage:", error);
      return null;
    }
  },

  /**
   * 세션 스토리지에서 값 제거
   * @param {string} key 키
   */
  remove: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from sessionStorage:", error);
    }
  },

  /**
   * 세션 스토리지 전체 비우기
   */
  clear: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },
};

export const Storage = {
  local,
  session,
};
