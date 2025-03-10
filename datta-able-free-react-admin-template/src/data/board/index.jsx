import request from "superagent";

const baseUrl = "http://localhost:8080/api";

export const board = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  request.get(baseUrl+"/getBoardList?curPage="+page).end((error, response) => {
    let data = [];
    for (let bd of response.body.boardList) {
      data.push({
        board_id: bd.board_id,
        board_title: bd.board_title,
        board_memo: bd.board_memo,
        is_use: bd.is_use,
        reg_id: bd.reg_id,
        reg_dt: bd.reg_dt,
        upd_id: bd.upd_id,
        upd_dt: bd.upd_dt,
      });
    }

    callback(data);
  });

};
