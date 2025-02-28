import request from "superagent";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

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

export const boardOne = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const id = param.get("id");

  request.get(baseUrl+"/getBoard?boardId="+id).end((error, response) => {
    let data = [];
      data.push({
        board_id: response.body.board_id,
        board_title: response.body.board_title,
        board_memo: response.body.board_memo,
        is_use: response.body.is_use,
        reg_id: response.body.reg_id,
        reg_dt: moment.unix(response.body.reg_dt).fromNow(),
        upd_id: response.body.upd_id,
        upd_dt: moment.unix(response.body.upd_dt).fromNow(),
      });

    callback(data);
  });

};
