import request from "superagent";
import localforage from "localforage";
import moment from "moment";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api";

export const hackernews = (callback) => {
  const newsUrl = baseUrl+"/getBoardAll";

  localforage.getItem("hackernews").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
      }
    }

    request.get(newsUrl).end((error, response) => {
      let stories = response.body.slice(0, 30); // grab 30 items
      let data = [];
      let index = 0;

      for (let boardId of stories) {
        const apiUrl = baseUrl+"/getBoard?boardId="+boardId;
        const cachedIndex = index + 1;

        request.get(apiUrl).end((error, response) => {
          data.push({
            id: response.body.BOARD_ID,
            title: response.body.BOARD_TITLE,
            by: response.body.BOARD_BY,
            url: response.body.url,
            points: response.body.score,
            commentCount: response.body.descendants,
            ago: moment.unix(response.body.UPD_DT).fromNow(),
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

export const github = (callback) => {
  const gitUrl = baseUrl+"/getLockerList";

    request.get(gitUrl).end((error, response) => {
      let data = [];
      for (let repo of response.body) {
        data.push({
          url: repo.BOX_NM,
          user: repo.UPD_ID,
          name: repo.BOX_NM,
          description: repo.descendants ? repo.descendants.trim() : null,
          stars: parseInt(repo.USE_CNT),
          language: repo.language ? repo.language.trim() : null,
        });
      }

      localforage.setItem("github", {
        data,
      });

      console.log("data : " + data);
      callback(data);
    });
};

export const producthunt = (callback) => {
  const baseUrl =
    "https://wrapapi.com/use/sunnysingh/producthunt/todaytech/0.0.3?wrapAPIKey=" +
    wrapApiKey;

  localforage.getItem("producthunt").then((cache) => {
    if (cache) {
      const notExpired = moment().diff(cache.expires) < 0;
      if (notExpired) {
        callback(cache.data);
        return;
      }
    }

    request.get(baseUrl).end((error, response) => {
      let data = [];
      for (let product of response.body.data.posts) {
        data.push({
          id: product.id,
          name: product.name,
          tagline: product.tagline,
          url: product.redirect_url,
          votesCount: product.votes_count,
          commentsCount: product.comments_count,
          discussionUrl: product.discussion_url,
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
