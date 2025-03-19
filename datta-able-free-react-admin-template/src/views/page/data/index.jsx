import superagent from "superagent";
import { BASE_URL } from "../../../services/api";

export const bPage = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  superagent.get(BASE_URL+"/getBoardList?curPage="+page).end((error, response) => {
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

export const ePage = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  superagent.get(BASE_URL+"/getExamBankItemList?curPage="+page).end((error, response) => {
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

export const lPage = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const page = param.get("page") === null ? 1 : param.get("page");

  superagent.get(BASE_URL+"/getLockerList?curPage="+page).end((error, response) => {
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
