import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api";

export const locker = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  request.get(baseUrl+"/getLockerList?curPage="+page).end((error, response) => {
    let data = [];
    for (let loc of response.body) {
      data.push({
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
        upd_dt: moment.unix(loc.upd_dt).fromNow(),
      });
    }

    callback(data);
  });

};

export const lockerOne = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const id = param.get("id");

  request.get(baseUrl+"/getLocker?boxCd="+id).end((error, response) => {
    let data = [];
      data.push({
        box_cd: response.body.box_cd,
        box_nm: response.body.box_nm,
        box_count: parseInt(response.body.box_count),
        not_cnt: parseInt(response.body.not_cnt),
        row_num: parseInt(response.body.row_num),
        row_count: parseInt(response.body.row_count),
        use_cnt: parseInt(response.body.use_cnt),
        start_num: response.body.start_num,
        end_num: parseInt(response.body.end_num),
        box_price: response.body.box_price,
        deposit: response.body.deposit,
        upd_id: response.body.upd_id,
        upd_dt: moment.unix(response.body.upd_dt).fromNow(),
      });

    callback(data);
  });

};
