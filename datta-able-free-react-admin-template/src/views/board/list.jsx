import React from 'react';
import {board} from '../../data/board';
import BoardList from './BoardList';
import { Row, Col, Card, Table } from 'react-bootstrap';

class List extends React.Component {

  constructor () {
    super();
    this.state = {
      board: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    board((data) => {
      this.setState({
        board: {
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
                <Card.Title as="h5">공지사항</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>제목</th>
                      <th>등록자</th>
                      <th>등록일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <BoardList
                    source="board"
                    data={this.state.board.data}
                    loaded={this.state.board.loaded}
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
