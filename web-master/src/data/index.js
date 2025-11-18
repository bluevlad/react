import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 30;
const expiresUnit = "minutes";

const wrapApiKey = "vZpCx0QXD65gAcUD4Q7gAL6y0GQB1pgT";

export const hackernews = (callback) => {
  const baseUrl = "https://hacker-news.firebaseio.com/v0";

  localforage.getItem("hackernews").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
        callback(cache.data);
        return;
      }
    }

    request.get(baseUrl + "/topstories.json").end((error, response) => {
      let stories = response.body.slice(0, 30); // grab 30 items
      let data = [];
      let index = 0;

      for (let storyId of stories) {
        const apiUrl = baseUrl + "/item/" + storyId + ".json";
        const cachedIndex = index + 1;

        request.get(apiUrl).end((error, response) => {
          data.push({
            id: response.body.id,
            title: response.body.title,
            by: response.body.by,
            url: response.body.url,
            points: response.body.score,
            commentCount: response.body.descendants,
            ago: moment.unix(response.body.time).fromNow(),
          });

          if (cachedIndex === stories.length) {
            localforage.setItem("hackernews", {
              expires: moment().add(expiresDuration, expiresUnit).valueOf(),
              data,
            });
            callback(data);
          }
        });

        index++;
      }
    });
  });
};
