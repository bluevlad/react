import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const baseUrl = "http://localhost:8080/api/getLockerList";

export const locker = (callback) => {

  request.get(baseUrl).end((error, response) => {
    let data = [];
    for (let loc of response.body) {
      data.push({
        box_cd: loc.box_cd,
        box_nm: loc.box_nm,
        box_count: loc.box_count,
        not_cnt: loc.not_cnt,
        row_num: loc.row_num,
        row_count: loc.row_count,
        use_cnt: loc.use_cnt,
        start_num: loc.start_num,
        end_num: loc.end_num,
        box_price: loc.box_price,
        deposit: loc.deposit,
        upd_id: loc.upd_id,
        upd_dt: moment.unix(loc.upd_dt).fromNow(),
      });
    }

    localforage.setItem("locker", {
      data,
    });
      callback(data);
  });

};
