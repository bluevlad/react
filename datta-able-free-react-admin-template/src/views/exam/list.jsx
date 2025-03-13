import React from 'react';
import {exam} from '../../data/exam';
import ExamList from './ExamList';
import { Row, Col, Card, Table } from 'react-bootstrap';

class List extends React.Component {

  constructor () {
    super();
    this.state = {
      exam: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    exam((data) => {
      this.setState({
        exam: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  render () {

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">시험문제은행</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>제목</th>
                      <th>문제유형</th>
                      <th>등록일시</th>
                    </tr>
                  </thead>
                  <tbody>
                      <ExamList
                        source="exam"
                        data={this.state.exam.data}
                        loaded={this.state.exam.loaded}
                      />
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )

    }
    
};

export default List;
