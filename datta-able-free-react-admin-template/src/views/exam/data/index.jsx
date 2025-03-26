import superagent from "superagent";
import { BASE_API } from "../../../config/constant";

export const fetchExamData = async (page = 1) => {
  try {
    const response = await superagent.get(`${BASE_API}/exam/getExamList?pageIndex=${page}`);

    return {
      examList: response.body.examList.map(exam => ({
        exam_id: exam.exam_id,
        exam_nm: exam.exam_nm,
        exam_year: exam.exam_year,
        exam_round: exam.exam_round,
        exam_open: exam.exam_open,
        exam_end: exam.exam_end,
        exam_period: exam.exam_period,
        exam_time: exam.exam_period,
				is_use: exam.is_use,
        use_flag: exam.use_flag,
        set_id: exam.set_id,
        reg_dt: exam.reg_dt,
        reg_id: exam.reg_id,
        upd_dt: exam.upd_dt,
        upd_id: exam.upd_id,
      })),
      paginationInfo: {
        currentPageNo: response.body.paginationInfo.currentPageNo,
        recordCountPerPage: parseInt(response.body.paginationInfo.recordCountPerPage),
        pageSize: parseInt(response.body.paginationInfo.pageSize),
        totalRecordCount: parseInt(response.body.paginationInfo.totalRecordCount),
        totalPageCount: parseInt(response.body.paginationInfo.totalPageCount) || 1, // 기본값 설정
        firstPageNoOnPageList: parseInt(response.body.paginationInfo.firstPageNoOnPageList),
        lastPageNoOnPageList: parseInt(response.body.paginationInfo.lastPageNoOnPageList),
        firstRecordIndex: parseInt(response.body.paginationInfo.firstRecordIndex),
        lastRecordIndex: parseInt(response.body.paginationInfo.lastRecordIndex),
        lastPageNo: parseInt(response.body.paginationInfo.lastPageNo),
        firstPageNo: parseInt(response.body.paginationInfo.firstPageNo),
      },
    };
  } catch (error) {
    console.error("Error fetching board data:", error);
    return { boardList: [], paginationInfo: { totalPageCount: 1 } }; // 기본값 반환
  }
};

export const examOne = (callback) => {

  const url = new URL(window.location.href);
  const param = new URLSearchParams(url.search);
  const id = param.get("id");

  superagent.get(BASE_API+"/exam/getExamView?examId="+id).end((error, response) => {
    let data = [];
      data.push({
        exam_id: response.body.examDetail.exam_id,
        exam_nm: response.body.examDetail.exam_nm,
        exam_year: response.body.examDetail.exam_year,
        exam_round: response.body.examDetail.exam_round,
        exam_open: response.body.examDetail.exam_open,
        exam_end: response.body.examDetail.exam_end,
        exam_period: response.body.examDetail.exam_period,
        exam_time: response.body.examDetail.exam_period,
				is_use: response.body.examDetail.is_use,
        use_flag: response.body.examDetail.use_flag,
        set_id: response.body.examDetail.set_id,
        reg_dt: response.body.examDetail.reg_dt,
        reg_id: response.body.examDetail.reg_id,
        upd_dt: response.body.examDetail.upd_dt,
        upd_id: response.body.examDetail.upd_id,
     });

    callback(data);
  });

};

export const fetchExamDetailData = async () => {
  try {

    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const id = param.get("id");
    const response = await superagent.get(`${BASE_API}/exam/getExamView?examId=`+id);

    return {
      queList: response.body.QueList.map(que => ({
        que_id: que.que_id,
        que_title: que.que_title,
        que_desc: que.que_desc,
        pass_ans: que.pass_ans,
        que_range: que.que_range,
        que_level: que.que_level,
        que_count: que.que_count,
        que_type: que.que_type,
				pass_ans: que.pass_ans,
        ans_desc: que.ans_desc,
        ans_view1: que.ans_view1,
        ans_view2: que.ans_view2,
        ans_view3: que.ans_view3,
        ans_view4: que.ans_view4,
        ans_view5: que.ans_view5,
      })),
      examDetail: {
        exam_id: response.body.examDetail.exam_id,
        exam_nm: response.body.examDetail.exam_nm,
        exam_year: response.body.examDetail.exam_year,
        exam_round: response.body.examDetail.exam_round,
        exam_open: response.body.examDetail.exam_open,
        exam_end: response.body.examDetail.exam_end,
        exam_period: response.body.examDetail.exam_period,
        exam_time: response.body.examDetail.exam_time,
				is_use: response.body.examDetail.is_use,
        use_flag: response.body.examDetail.use_flag,
        set_id: response.body.examDetail.set_id,
        reg_dt: response.body.examDetail.reg_dt,
        reg_id: response.body.examDetail.reg_id,
        upd_dt: response.body.examDetail.upd_dt,
        upd_id: response.body.examDetail.upd_id,
      },
    };
  } catch (error) {
    console.error("Error fetching exam data:", error);
    return { queList: [], examDetail: { } }; // 기본값 반환
  }
};
