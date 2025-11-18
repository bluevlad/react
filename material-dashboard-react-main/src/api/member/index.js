import superagent from "superagent";
import { BASE_API } from "../../constants/index";

export const fetchMemberListData = async (page = 1) => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await superagent.get(
      `${BASE_API}/member/getMemberList?curPage=${page}&userId=${userId}`
    );

    return {
      memberList: response.body.memberList.map((member) => ({
        userId: member.USER_ID,
        userName: member.USER_NM,
        userPwd: member.USER_PWD,
        sex: member.SEX,
        birthDay: member.BIRTH_DAY,
        userRole: member.USER_ROLE,
        email: member.EMAIL,
        zipCode: member.ZIP_CODE,
        address1: member.ADDRESS1,
        address2: member.ADDRESS2,
        regDt: member.REG_DT,
        updDt: member.UPD_DT,
        updId: member.UPD_ID,
        userPoint: member.USER_POINT,
        isUse: member.IS_USE,
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
    console.error("Error fetching member data:", error);
    return { memberList: [], paginationInfo: { totalPageCount: 1 } }; // 기본값 반환
  }
};

export const fetchMemberDetailData = async () => {
  try {
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const user_id = param.get("user_id");
    const response = await superagent.get(`${BASE_API}/member/getMember?userId=` + user_id);

    return {
      memberDetail: {
        userId: memberDetail.USER_ID,
        userName: memberDetail.USER_NM,
        userPwd: memberDetail.USER_PWD,
        sex: memberDetail.SEX,
        birthDay: memberDetail.BIRTH_DAY,
        userRole: memberDetail.USER_ROLE,
        email: memberDetail.EMAIL,
        userPoint: memberDetail.USER_POINT,
        isUse: memberDetail.IS_USE,
        regDt: memberDetail.REG_DT,
        regId: memberDetail.REG_ID,
        updDt: memberDetail.UPD_DT,
        updId: memberDetail.UPD_ID,
        isOkSms: memberDetail.ISOK_SMS,
        isOkEmail: memberDetail.ISOK_EMAIL,
      },
    };
  } catch (error) {
    console.error("Error fetching member data:", error);
    return { memberDetail: {} }; // 기본값 반환
  }
};
