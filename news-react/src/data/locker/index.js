import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api/getLockerList";

export const locker = (callback) => {

  localforage.getItem("locker").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
        callback(cache.data);
        return;
      }
    }

    request.get(baseUrl).end((error, response) => {
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

      localforage.setItem("locker", {
        expires: moment().add(expiresDuration, expiresUnit).valueOf(),
        data,
      });

      callback(data);
    });
  });

};
