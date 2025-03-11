import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import Card from '../../../components/Card/MainCard';

function BoardPagination (props) {
  let active = props.bPage.currentPageNo;
  let total = props.bPage.totalPageCount;
  let disabled = props.bPage.lastPageNo;
  let items = [];
  let activeItems = [];
  let disabledItems = [];

  for (let number = 1; number <= total; number++) {
    items.push(<Pagination.Item key={number} onClick={(number) => paginate(number)}>{number}</Pagination.Item>);
  }

  for (let number = 1; number <= total; number++) {
    activeItems.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  for (let number = 1; number <= total; number++) {
    disabledItems.push(
      <Pagination.Item key={number} disabled={number === disabled}>
        {number}
      </Pagination.Item>
    );
  }

  
  // Change page
  const paginate = pageNumbers => {
    <a href="/board?page={pageNumbers}">
    </a>
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Pagination">
            <Pagination>{items}</Pagination>
            <h5 className="mt-5">Working With Icons</h5>
            <hr />
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              {items}
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
            <h5 className="mt-5">More Options</h5>
            <hr />
            <div className="table-responsive">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>

            <h5 className="mt-5">Active</h5>
            <hr />
            <Pagination>{activeItems}</Pagination>
            <h5 className="mt-5">Disabled</h5>
            <hr />
            <Pagination>{disabledItems}</Pagination>
            <h5 className="mt-5">Sizing</h5>
            <hr />
            <Pagination>{items}</Pagination>
            <Pagination size="lg">{items}</Pagination>
            <Pagination size="sm">{items}</Pagination>
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
