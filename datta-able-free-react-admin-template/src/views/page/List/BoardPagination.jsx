import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card/MainCard';

function BoardPagination (props) {
  let active = props.bPage.currentPageNo;
  let totalPage = props.bPage.totalPageCount;
  let totalItem = props.bPage.totalRecordCount;
  let items = [];
  let activeItems = [];

  const navigate = useNavigate();

  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item key={number}>
        {number}
      </Pagination.Item>
    );
  }

  for (let number = 1; number <= totalPage; number++) {
    activeItems.push(
      <Pagination.Item key={number} active={number === active} onClick={() => goPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const goPage = (num) => {
    alert(num);
    this.props.navigate("/page?page="+boardId);
  };
  
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Pagination">
            <h5 className="mt-5">게시판 Page({totalItem})</h5>
            <hr />
            <Pagination>{activeItems}</Pagination>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

BoardPagination.propTypes = {
  bPage: PropTypes.object.isRequired,
};

export default BoardPagination;
