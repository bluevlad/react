import request from "superagent";
import localforage from "localforage";

const expiresDuration = 5;
const expiresUnit = "seconds";

const baseUrl = "http://localhost:8080/api/getLockerList";

export const github = (callback) => {

    request.get(baseUrl).end((error, response) => {
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

      callback(data);
    });
};
