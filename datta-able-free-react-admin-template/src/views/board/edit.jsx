import React from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { boardOne } from "../../data/board";
import BoardView from "./BoardView";

// 🔹 `withRouter` 유틸 함수 (React Router v6에서 사용) 
// navigate를 props로 전달
function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Edit extends React.Component {
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
    this.props.navigate("/board/list"); // 🔹 `this.props.navigate` 사용
  }

  goWrite() {
    this.props.navigate("/board/write"); // 🔹 `this.props.navigate` 사용
  }

  goEdit() {
    this.props.navigate("/board/edit"); // 🔹 `this.props.navigate` 사용
  }

  goDelete() {
    this.props.navigate("/board/delete"); // 🔹 `this.props.navigate` 사용
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <BoardView
              source="boardOne"
              data={this.state.boardOne.data}
              loaded={this.state.boardOne.loaded}
            />
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
                <Button variant="warning" className="text-capitalize" onClick={this.goEdit}>
                  수정
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">삭제</Tooltip>}
              >
                <Button variant="danger" className="text-capitalize" onClick={this.goDelete}>
                삭제
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">등록</Tooltip>}
              >
                <Button variant="primary" className="text-capitalize" onClick={this.goWrite}>
                  등록
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
export default withRouter(Edit);
