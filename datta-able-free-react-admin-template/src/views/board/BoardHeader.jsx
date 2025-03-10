import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BoardHeader = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Basic Table</Card.Title>
              <span className="d-block m-t-5">
                use bootstrap <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>등록일시</th>
                  </tr>
                </thead>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BoardHeader;
