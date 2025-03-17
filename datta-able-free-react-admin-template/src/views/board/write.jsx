import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { WriteButton } from './WriteButton';

class Write extends React.Component {

  render () {

    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">게시판 쓰기</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col md={12}>
                  <WriteButton/>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );

  };

};
  
export default Write;
