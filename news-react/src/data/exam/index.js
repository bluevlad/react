import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api";

export const examitem = (callback) => {
  const examUrl = baseUrl + "/getExamBankItemList";

  localforage.getItem("examitem").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
        callback(cache.data);
        return;
      }
    }

    request.get(examUrl).end((error, response) => {
      let data = [];
      for (let exam of response.body) {
        data.push({
          id: exam.que_id,
          que_title: exam.que_title,
          que_count: exam.que_count,
          pass_ans: exam.pass_ans,
          ans_view1: exam.ans_view1,
          ans_view2: exam.ans_view2,
          ans_view3: exam.ans_view3,
          ans_view4: exam.ans_view4,
          ans_view5: exam.ans_view5,
        });
      }

      localforage.setItem("examitem", {
        expires: moment().add(expiresDuration, expiresUnit).valueOf(),
        data,
      });
      
      callback(data);
    });
  });
};
