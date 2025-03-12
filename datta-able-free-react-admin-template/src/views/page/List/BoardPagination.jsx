import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Card from '../../../components/Card/MainCard';

function BoardPagination (props) {
  let active = props.bPage.currentPageNo;
  let totalPage = props.bPage.totalPageCount;
  let disabled = props.bPage.lastPageNo;
  let totalItem = props.bPage.totalRecordCount;
  let items = [];
  let activeItems = [];
  let disabledItems = [];

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

  for (let number = 1; number <= totalPage; number++) {
    disabledItems.push(
      <Pagination.Item key={number} disabled={number === disabled}>
        {number}
      </Pagination.Item>
    );
  }

  const goPage = (num) => {
    alert(num);
    for (let number = 1; number <= totalPage; number++) {
      activeItems.push(
      <Pagination.Item key={number} active={number === num} onClick={() => goPage(number)}>
        {number}
      </Pagination.Item>
      );
    }
  };
  
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Pagination">
            <h5 className="mt-5">게시판 Page({totalItem})</h5>
            <hr />
            <Pagination>{items}</Pagination>
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
