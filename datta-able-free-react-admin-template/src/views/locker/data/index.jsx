import superagent from "superagent";
import { BASE_API } from "../../../config/constant";

export const fetchLockerData = async (page = 1) => {
  try {
    const response = await superagent.get(`${BASE_API}/locker/getLockerList?pageIndex=${page}`);

    return {
      lockerList: response.body.lockers.map(loc => ({
        box_cd: loc.box_cd,
        box_nm: loc.box_nm,
        box_count: parseInt(loc.box_count),
        not_cnt: parseInt(loc.not_cnt),
        row_num: parseInt(loc.row_num),
        row_count: parseInt(loc.row_count),
        use_cnt: parseInt(loc.use_cnt),
        start_num: loc.start_num,
        end_num: parseInt(loc.end_num),
        box_price: loc.box_price,
        deposit: loc.deposit,
        upd_id: loc.upd_id,
        upd_dt: loc.upd_dt,
      })),
      paginationInfo: {
        currentPageNo: response.body.paginationInfo.currentPageNo,
        recordCountPerPage: parseInt(response.body.paginationInfo.recordCountPerPage),
        pageSize: parseInt(response.body.paginationInfo.pageSize),
        totalRecordCount: parseInt(response.body.paginationInfo.totalRecordCount),
        totalPageCount: parseInt(response.body.paginationInfo.totalPageCount) || 1, // 기본값 설정
        firstPageNoOnPageList: parseInt(response.body.paginationInfo.firstPageNoOnPageList),
        lastPageNoOnPageList: parseInt(response.body.paginationInfo.lastPageNoOnPageList),
        firstRecordIndex: parseInt(response.body.paginationInfo.firstRecordIndex),
        lastRecordIndex: parseInt(response.body.paginationInfo.lastRecordIndex),
        lastPageNo: parseInt(response.body.paginationInfo.lastPageNo),
        firstPageNo: parseInt(response.body.paginationInfo.firstPageNo),
      },
    };
  } catch (error) {
    console.error("Error fetching locker data:", error);
    return { lockerList: [], paginationInfo: { totalPageCount: 1 } }; // 기본값 반환
  }
};

export const fetchLockerDetailData = async () => {
  try {

    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const id = param.get("id");
    const response = await superagent.get(`${BASE_API}/locker/getLocker?boxCd=`+id);

    return {
      lockerNumList: response.body.lockerNumList.map(loc => ({
        box_cd: loc.box_cd,
        box_num: parseInt(loc.box_num),
        user_id: loc.user_id,
        user_nm: loc.user_nm,
        box_flag: loc.box_flag,
        upd_dt: loc.upd_dt,
        upd_id: loc.upd_id,
        rent_seq: loc.rent_seq,
        rent_memo: loc.rent_memo,
      })),
      lockerDetail: {
        box_cd: response.body.lockerDetail.box_cd,
        box_nm: response.body.lockerDetail.box_nm,
        box_count: parseInt(response.body.lockerDetail.box_count),
        not_cnt: parseInt(response.body.lockerDetail.not_cnt),
        row_num: parseInt(response.body.lockerDetail.row_num),
        row_count: parseInt(response.body.lockerDetail.row_count),
        use_cnt: parseInt(response.body.lockerDetail.use_cnt),
        start_num: response.body.lockerDetail.start_num,
        end_num: parseInt(response.body.lockerDetail.end_num),
        box_price: response.body.lockerDetail.box_price,
        deposit: response.body.lockerDetail.deposit,
        upd_id: response.body.lockerDetail.upd_id,
        upd_dt: response.body.lockerDetail.upd_dt,
      },
    };
  } catch (error) {
    console.error("Error fetching locker data:", error);
    return { lockerNumList: [], lockerDetail: { } }; // 기본값 반환
  }
};
