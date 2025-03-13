import request from "superagent";

const baseUrl = "http://localhost:8080/api";

export const sales = (callback) => {

  request.get(baseUrl+"/getSales").end((error, response) => {
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
