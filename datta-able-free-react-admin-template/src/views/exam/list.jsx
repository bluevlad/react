import React, { Component } from 'react';
import { Row, Col, Card, Table, Pagination, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchExamData } from './data';
import { useNavigate } from "react-router-dom";


export function withRouter(Component) {
  return function WithRouterComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class List extends Component {

  constructor () {
    super();
    this.state = {
      examList: [], // 시험정보 데이터
      paginationInfo: {}, // 페이지네이션 정보
      loaded: false, // 로딩 상태
      activePage: 1, // 현재 페이지
    };
  }

  // 🔹 비동기 데이터 호출을 `async/await`으로 변경
  async componentDidMount() {
    await this.loadExamData(1);
  }

  // 🔹 특정 페이지 데이터 로드
  loadExamData = async (page) => {
    try {
      const { examList, paginationInfo } = await fetchExamData(page);

      this.setState({
        examList,
        paginationInfo,
        activePage: page,
        loaded: true,
      });
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  };

  // 🔹 페이지 변경 핸들러
  handlePageChange = (page) => {
    if (page >= 1 && page <= this.state.paginationInfo.totalPageCount) {
      this.loadExamData(page);
    }
  };
    
  // 🔹 글쓰기 페이지 이동 함수
  goWrite = () => {
    this.props.navigate('/exam/view');
  };
  
  render() {
    const { examList, paginationInfo, loaded, activePage } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">시험정보</Card.Title>
                <div className="d-flex justify-content-end">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip className="mb-2" id="tooltip">등록</Tooltip>}
                >
                  <Button variant="primary" className="text-capitalize" onClick={this.goWrite}>
                    등록
                  </Button>
                </OverlayTrigger>
              </div>
              </Card.Header>
              <Card.Body>
                {loaded ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>시험명</th>
                        <th>등록자</th>
                        <th>등록일시</th>
                        <th>사용여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examList.map((item, index) => (
                        <tr key={item.exam_id}>
                          <th scope="row">{paginationInfo.totalRecordCount - paginationInfo.firstRecordIndex - index}</th>
                          <td>
                            <Link to={`/exam/view?id=${item.exam_id}`}>
                              {item.exam_nm}
                            </Link>
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

                {/* 페이지네이션 */}
                <Card>
                <div className="d-flex justify-content-center">
                    <Pagination>
                      <Pagination.First onClick={() => this.handlePageChange(1)} />
                      <Pagination.Prev
                        onClick={() => this.handlePageChange(activePage - 1)}
                        disabled={activePage === 1}
                      />

                      {[...Array(paginationInfo.totalPageCount || 1)].map((_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === activePage}
                          onClick={() => this.handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => this.handlePageChange(activePage + 1)}
                        disabled={activePage === paginationInfo.totalPageCount}
                      />
                      <Pagination.Last
                        onClick={() => this.handlePageChange(paginationInfo.totalPageCount)}
                      />
                    </Pagination>
                  </div>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(List);
