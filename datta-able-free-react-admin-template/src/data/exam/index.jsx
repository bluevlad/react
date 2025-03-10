import request from "superagent";

const baseUrl = "http://localhost:8080/api";

export const exam = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");
  
      request.get(baseUrl+"/getExamBankItemList?curPage="+page).end((error, response) => {
      let data = [];
      for (let exam of response.body.exambankItemList) {
        data.push({
          que_id: exam.que_id,
          que_title: exam.que_title,
          que_count: parseInt(exam.que_count),
          pass_ans: exam.pass_ans,
          que_type: exam.que_type,
          ans_view1: exam.ans_view1,
          ans_view2: exam.ans_view2,
          ans_view3: exam.ans_view3,
          ans_view4: exam.ans_view4,
          ans_view5: exam.ans_view5,
          ans_desc: exam.ans_desc,
          is_use: exam.is_use,
          reg_id: exam.reg_id,
          reg_dt: exam.reg_dt,
          upd_id: exam.upd_id,
          upd_dt: exam.upd_dt,
        });
      }

      callback(data);
    });

};
