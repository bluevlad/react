import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api";

export const producthunt = (callback) => {
  const prdUrl = baseUrl + "/getExamBankItemList";

  localforage.getItem("producthunt").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
        callback(cache.data);
        return;
      }
    }

    request.get(prdUrl).end((error, response) => {
      let data = [];
      for (let product of response.body) {
        data.push({
          id: product.que_id,
          name: product.queTitle,
          tagline: product.pass_ans,
          url: product.que_type,
          votesCount: product.que_count,
          commentsCount: product.que_level,
          discussionUrl: product.reg_id,
        });
      }

      localforage.setItem("producthunt", {
        expires: moment().add(expiresDuration, expiresUnit).valueOf(),
        data,
      });

      callback(data);
    });
  });
};
