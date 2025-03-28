import superagent from "superagent";
import { BASE_API } from "../config/constant";

export const fetchRouterData = async () => {
  try {
    const response = await superagent.get(`${BASE_API}/getRouter`);

    // JSON 데이터를 routes 구조로 변환
    const routers = response.body.router
      .filter(router => router.is_use === "Y") // 사용 여부 체크
      .map(router => ({
        path: router.menu_path.trim(), // 공백 제거
        elementPath: router.menu_element.trim(),
        layout: router.menu_layout.trim() || null, // 빈 문자열 처리
      }));

    return routers;
  } catch (error) {
    console.error("Error fetching router data:", error);
    return [];
  }
};
