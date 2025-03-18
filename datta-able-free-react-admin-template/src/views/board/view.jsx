import React from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { boardOne } from "../../data/board";

import Card from '../../components/Card/MainCard';

// 🔹 `withRouter` 유틸 함수 (React Router v6에서 사용) 
// navigate를 props로 전달
function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardOne: {
        data: [],
        loaded: false,
      },
    };

    // `goWrite` 함수 수정
    this.goList = this.goList.bind(this);
    this.goWrite = this.goWrite.bind(this);
    this.goEdit = this.goEdit.bind(this);
    this.goDelete = this.goDelete.bind(this);
  }

  componentDidMount() {
    boardOne((data) => {
      this.setState({
        boardOne: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  goList() {
    this.props.navigate("/board/list");
  }

  goWrite() {
    this.props.navigate("/board/write");
  }

  goEdit(boardId) {
    this.props.navigate("/board/edit?id="+boardId);
  }

  goDelete(boardId) {
    this.props.navigate("/board/delete?id="+boardId);
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card title={this.state.boardOne.data[0]?.board_title} isOption>
              <p dangerouslySetInnerHTML={ {__html : this.state.boardOne.data[0]?.board_memo} }/>
            </Card>
            <div className="d-flex justify-content-end">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">목록</Tooltip>}
              >
                <Button variant="info" className="text-capitalize" onClick={this.goList}>
                  목록
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">수정</Tooltip>}
              >
                <Button
                  variant="warning"
                  className="text-capitalize"
                  onClick={() => this.goEdit(this.state.boardOne.data[0]?.board_id)}
                >
                  수정
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">삭제</Tooltip>}
              >
                <Button 
                  variant="danger" 
                  className="text-capitalize" 
                  onClick={() => this.goDelete(this.state.boardOne.data[0]?.board_id)}
                >
                삭제
                </Button>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

// 🔹 `withRouter`로 컴포넌트 감싸기
export default withRouter(View);
