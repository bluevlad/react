import request from "superagent";
import { BASE_API } from "../../../config/constant";

export const sales = (callback) => {

  request.get(BASE_API+"/main/getSales").end((error, response) => {
    let data = [];
    for (let ds of response.body.dashSalesData) {
      data.push({
        id: ds.id,
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

export const mylocker = (callback) => {

  const user_id = localStorage.getItem("userId");

  request.get(BASE_API+"/dashboard/myRentLocker?userId="+user_id).end((error, response) => {
    let data = [];
    for (let mylocker of response.body.myRentLocker) {
      data.push({
        box_cd: mylocker.box_cd,
        box_nm: mylocker.box_nm,
        box_num: mylocker.box_num,
        rent_seq: mylocker.rent_seq,
        rest_yn: mylocker.rest_yn,
        rent_start: mylocker.rent_start,
        rent_end: mylocker.rent_end,
      });
    }
    callback(data);
  });

};

export const board = (callback) => {

    const page = 1;
    request.get(BASE_API+"/board/getBoardList?pageIndex="+page).end((error, response) => {
      let data = [];
      for (let bd of response.body.boardList) {
        data.push({
          board_id: bd.board_id,
          board_title: bd.board_title,
          board_memo: bd.board_memo,
          is_use: bd.is_use,
          reg_id: bd.reg_id,
          reg_dt: bd.reg_dt,
          upd_id: bd.upd_id,
          upd_dt: bd.upd_dt,
          board_avata: "avatar" + bd.board_id,
        });
      }
        callback(data);
      });
  };
  
export const exam = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");
  
      request.get(BASE_API+"/exam/getExamBankItemList?pageIndex="+page).end((error, response) => {
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

export const locker = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  request.get(BASE_API+"/locker/getLockerList?pageIndex="+page).end((error, response) => {
    let data = [];
    
    for (let loc of response.body.lockers) {
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
        upd_dt: loc.upd_dt,
      });
    }

    callback(data);
  });

};
