import superagent from "superagent";
import { BASE_API } from "../../../config/constant";

export const fetchBoardData = async (page = 1) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardList?pageIndex=${page}`);

    return {
      boardList: response.body.boardList.map(bd => ({
        board_id: bd.board_id,
        board_title: bd.board_title,
        board_memo: bd.board_memo,
        is_use: bd.is_use,
        reg_id: bd.reg_id,
        reg_dt: bd.reg_dt,
        upd_id: bd.upd_id,
        upd_dt: bd.upd_dt,
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
    console.error("Error fetching board data:", error);
    return { boardList: [], paginationInfo: { totalPageCount: 1 } }; // 기본값 반환
  }
};

export const boardOne = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const id = param.get("id");

  superagent.get(BASE_API+"/board/getBoard?boardId="+id).end((error, response) => {
    let data = [];
      data.push({
        board_id: response.body.boardItem.board_id,
        board_title: response.body.boardItem.board_title,
        board_memo: response.body.boardItem.board_memo,
        is_use: response.body.boardItem.is_use,
        reg_id: response.body.boardItem.reg_id,
        reg_dt: response.body.boardItem.reg_dt,
        upd_id: response.body.boardItem.upd_id,
        upd_dt: response.body.boardItem.upd_dt,
      });

    callback(data);
  });

};
