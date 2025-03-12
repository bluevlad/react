import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import Card from '../../../components/Card/MainCard';

function LockerPagination (props) {
  let active = props.lPage.currentPageNo;
  let totalPage = props.lPage.totalPageCount;
  let disabled = props.lPage.lastPageNo;
  let totalItem = props.lPage.totalRecordCount;
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
            <h5 className="mt-5">사물함 Page({totalItem})</h5>
            <hr />
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination>{disabledItems}</Pagination>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

LockerPagination.propTypes = {
  lPage: PropTypes.object.isRequired,
};

export default LockerPagination;
