import React from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

class BoardPage extends React.Component {

  render () {
    if (!this.props.data.length) {
      return (
        <div>게시물 정보를 가져오지 못했습니다 :</div>
      )
    }

    let active = 1;
    let totalPage = 5;
    let totalItem = 5;
    let activeItems = [];
    
    for (let number = 1; number <= 5; number++) {
      activeItems.push(
        <Pagination.Item key={number} active={number === active} onClick={() => goPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    const goPage = (num) => {
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
    )

  };
  
};

export default BoardPage;
