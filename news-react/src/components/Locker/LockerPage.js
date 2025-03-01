import React from 'react';
import PropTypes from 'prop-types';
import '../Page/index.css';
import Pagination from "react-js-pagination";

const LockerPage = (props) => {
 
    const handlePageChange = (page) => {
        setPage(props.lPage.currentPageNo);
      };
    
    return (
        <Pagination
            activePage={props.lPage.currentPageNo} // 현재 페이지
            itemsCountPerPage={props.lPage.recordCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={props.lPage.totalRecordCount} // 총 아이템 갯수
            pageRangeDisplayed={props.lPage.totalPageCount} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
    )

};

LockerPage.propTypes = {
    lPage: PropTypes.object.isRequired,
};

export default LockerPage;
