import React, { Component } from 'react';
import { board, bPage } from '../../data/board';
import { Link } from 'react-router-dom';
import BoardButton from './BoardButton';
import { Row, Col, Card, Table } from 'react-bootstrap';

class List extends Component {

  constructor () {
    super();
    this.state = {
      board: { data: [], loaded: false },
    };
  }

  // 🔹 비동기 데이터 호출을 `async/await`으로 변경
  async componentDidMount() {
    try {
      const boardData = await board();

      this.setState({
        board: { data: boardData, loaded: true },
      });
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  }

  render () {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">공지사항</Card.Title>
                <BoardButton/>
              </Card.Header>
              <Card.Body>
              {this.state.board.loaded ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>제목</th>
                      <th>등록자</th>
                      <th>등록일시</th>
                      <th>사용여부</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.board.data.map((item) => (
                          <tr key={item.board_id}>
                          <th scope="row">{item.board_id}</th>
                          <td>
                            <Link to={`/board/view?id=${item.board_id}`}>{item.board_title}</Link>
                            </td>
                          <td>{item.reg_id}</td>
                          <td>{item.reg_dt}</td>
                          <td>{item.is_use}</td>
                        </tr>
                     ))}
                  </tbody>
                </Table>
                ) : (
                  <p>로딩 중...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  
};

export default List;
