import request from "superagent";
import { BASE_URL } from "../../services/api";

export const sales = (callback) => {

  request.get(BASE_URL+"/getSales").end((error, response) => {
    let data = [];
    for (let ds of response.body.dashSalesData) {
      data.push({
        amount: ds.amount,
        icon: ds.icon,
        title: ds.title,
        value: ds.value,
        class: ds.class,
      });
    }

    callback(data);
  });

};
