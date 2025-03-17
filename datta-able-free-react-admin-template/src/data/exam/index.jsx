import request from "superagent";
import { BASE_URL } from "../../services/api";

export const exam = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");
  
      request.get(BASE_URL+"/getExamBankItemList?curPage="+page).end((error, response) => {
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

export const examOne = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const id = param.get("id");

  request.get(BASE_URL+"/getExamBankItem?queId="+id).end((error, response) => {
    let data = [];
      data.push({
        que_id: response.body.examBankItem.que_id,
        que_title: response.body.examBankItem.que_title,
        que_count: parseInt(response.body.examBankItem.que_count),
        pass_ans: response.body.examBankItem.pass_ans,
        que_type: response.body.examBankItem.que_type,
        ans_view1: response.body.examBankItem.ans_view1,
        ans_view2: response.body.examBankItem.ans_view2,
        ans_view3: response.body.examBankItem.ans_view3,
        ans_view4: response.body.examBankItem.ans_view4,
        ans_view5: response.body.examBankItem.ans_view5,
        ans_desc: response.body.examBankItem.ans_desc,
        is_use: response.body.examBankItem.is_use,
        reg_id: response.body.examBankItem.reg_id,
        reg_dt: response.body.examBankItem.reg_dt,
        upd_id: response.body.examBankItem.upd_id,
        upd_dt: response.body.examBankItem.upd_dt,
     });

    callback(data);
  });

};

export const ePage = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  request.get(BASE_URL+"/getExamBankItemList?curPage="+page).end((error, response) => {
    let data = [];
      data.push({
        currentPageNo: response.body.paginationInfo.currentPageNo,
        recordCountPerPage: parseInt(response.body.paginationInfo.recordCountPerPage),
        pageSize: parseInt(response.body.paginationInfo.pageSize),
        totalRecordCount: parseInt(response.body.paginationInfo.totalRecordCount),
        totalPageCount: parseInt(response.body.paginationInfo.totalPageCount),
        firstPageNoOnPageList: parseInt(response.body.paginationInfo.firstPageNoOnPageList),
        lastPageNoOnPageList: parseInt(response.body.paginationInfo.lastPageNoOnPageList),
        firstRecordIndex: parseInt(response.body.paginationInfo.firstRecordIndex),
        lastRecordIndex: parseInt(response.body.paginationInfo.lastRecordIndex),
        lastPageNo: parseInt(response.body.paginationInfo.lastPageNo),
        firstPageNo: parseInt(response.body.paginationInfo.firstPageNo),
      });
    callback(data);
  });

};
