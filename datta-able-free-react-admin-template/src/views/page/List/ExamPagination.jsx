import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import Card from '../../../components/Card/MainCard';

function ExamPagination (props) {
  let active = props.ePage.currentPageNo;
  let totalPage = props.ePage.totalPageCount;
  let disabled = props.ePage.lastPageNo;
  let totalItem = props.ePage.totalRecordCount;
  let items = [];
  let activeItems = [];
  let disabledItems = [];

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
            <h5 className="mt-5">온라인시험 Page({totalItem})</h5>
            <hr />
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              {activeItems}
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

ExamPagination.propTypes = {
  ePage: PropTypes.object.isRequired,
};

export default ExamPagination;
