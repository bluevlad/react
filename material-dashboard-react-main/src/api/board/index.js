import superagent from "superagent";
import { BASE_API } from "../../constants/index";

export const fetchBoardData = async (page = 1) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardList?curPage=${page}`);

    return {
      boardList: response.body.boardList.map((board) => ({
        boardMngSeq: board.BOARD_MNG_SEQ,
        parentBoardMngSeq: board.PARENT_BOARD_MNG_SEQ,
        boardTitle: board.BOARD_TITLE,
        boardContent: board.BOARD_CONTENT,
        filePath: board.FILE_PATH,
        fileName: board.FILE_NAME,
        realFileName: board.REAL_FILE_NAME,
        noticeTopYn: board.NOTICE_TOP_YN,
        openYn: board.OPEN_YN,
        isUse: board.IS_USE,
        hits: board.HITS,
        regDt: board.REG_DT,
        regId: board.REG_ID,
        updDt: board.UPD_DT,
        updId: board.UPD_ID,
        createName: board.CREATE_NAME,
        answer: board.ANSWER,
        thumbnailFilePath: board.THUMBNAIL_FILE_PATH,
        thumbnailFileName: board.THUMBNAIL_FILE_NAME,
        thumbnailRealFileName: board.THUMBNAIL_FILE_REAL_NAME,
        recommend: board.RECOMMEND,
        boardSeq3: board.BOARD_SEQ3,
        examType: board.EXAM_TYPE,
        examArea: board.EXAM_AREA,
        examCategory: board.EXAM_CATEGORY,
        examSub: board.EXAM_SUB,
        categoryCode: board.CATEGORY_CODE,
        profId: board.PROF_ID,
        boardType: board.BOARD_TYPE,
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

export const fetchboardDetailData = async () => {
  try {
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const boardMngSeq = param.get("boardMngSeq");
    const boardSeq = param.get("boardSeq");
    const response = await superagent.get(
      `${BASE_API}/board/getBoard?boardMngSeq=` + boardMngSeq + `&boardSeq=` + boardSeq
    );

    return {
      boardDetail: {
        boardMngSeq: response.body.boardDetail.BOARD_MNG_SEQ,
        parentBoardMngSeq: response.body.boardDetail.PARENT_BOARD_MNG_SEQ,
        boardTitle: response.body.boardDetail.BOARD_TITLE,
        boardContent: response.body.boardDetail.BOARD_CONTENT,
        filePath: response.body.boardDetail.FILE_PATH,
        fileName: response.body.boardDetail.FILE_NAME,
        realFileName: response.body.boardDetail.REAL_FILE_NAME,
        noticeTopYn: response.body.boardDetail.NOTICE_TOP_YN,
        openYn: response.body.boardDetail.OPEN_YN,
        isUse: response.body.boardDetail.IS_USE,
        hits: response.body.boardDetail.HITS,
        regDt: response.body.boardDetail.REG_DT,
        regId: response.body.boardDetail.REG_ID,
        updDt: response.body.boardDetail.UPD_DT,
        updId: response.body.boardDetail.UPD_ID,
        createName: response.body.boardDetail.CREATE_NAME,
        answer: response.body.boardDetail.ANSWER,
        thumbnailFilePath: response.body.boardDetail.THUMBNAIL_FILE_PATH,
        thumbnailFileName: response.body.boardDetail.THUMBNAIL_FILE_NAME,
        thumbnailRealFileName: board.THUMBNAIL_FILE_REAL_NAME,
        recommend: response.body.boardDetail.RECOMMEND,
        boardSeq3: response.body.boardDetail.BOARD_SEQ3,
        examType: board.EXAM_TYPE,
        examArea: response.body.boardDetail.EXAM_AREA,
        examCategory: board.EXAM_CATEGORY,
        examSub: response.body.boardDetail.EXAM_SUB,
        categoryCode: response.body.boardDetail.CATEGORY_CODE,
        profId: response.body.boardDetail.PROF_ID,
        boardType: response.body.boardDetail.BOARD_TYPE,
      },
    };
  } catch (error) {
    console.error("Error fetching board detail data:", error);
    return { boardDetail: {} }; // 기본값 반환
  }
};
