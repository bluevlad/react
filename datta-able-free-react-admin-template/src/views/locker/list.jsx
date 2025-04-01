import React, { Component } from 'react';
import { Row, Col, Card, Table, Pagination, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchLockerData } from './data';
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
      lockerList: [], // 게시판 데이터
      paginationInfo: {}, // 페이지네이션 정보
      loaded: false, // 로딩 상태
      activePage: 1, // 현재 페이지
    };
  }

  // 🔹 비동기 데이터 호출을 `async/await`으로 변경
  async componentDidMount() {
    await this.loadLockerData(1);
  }

  // 🔹 특정 페이지 데이터 로드
  loadLockerData = async (page) => {
    try {
      const { lockerList, paginationInfo } = await fetchLockerData(page);

      this.setState({
        lockerList,
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
      this.loadLockerData(page);
    }
  };
  
  render() {
    const { lockerList, paginationInfo, loaded, activePage } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">사물함예약</Card.Title>
              </Card.Header>
              <Card.Body>
                {loaded ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>사물함명</th>
                        <th>사물함수</th>
                        <th>변경일시</th>
                        <th>대여가능</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lockerList.map((item, index) => (
                        <tr key={item.box_cd}>
                          <th scope="row">{paginationInfo.totalRecordCount - paginationInfo.firstRecordIndex - index}</th>
                          <td>
                            <Link to={`/locker/view?id=${item.box_cd}`}>
                              {item.box_nm}
                            </Link>
                          </td>
                          <td>{item.box_count}</td>
                          <td>{item.upd_dt}</td>
                          <td>{item.not_cnt}</td>
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
