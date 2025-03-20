import React from 'react';
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { boardOne } from "./data";
import { useNavigate } from "react-router-dom";

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
      boardId: "",
      regId: "",
      updId: "",
      isUse: "Y",
      boardTitle: "",
      boardMemo: "",
      boardOne: {
        data: [],
        loaded: false,
      },
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goList = this.goList.bind(this);
  }

  componentDidMount() {
    boardOne((data) => {
      this.setState({
        boardOne: {
          data: data,
          loaded: true,
        },
        boardId: data[0]?.board_id || "",
        regId: data[0]?.reg_id || "admin",
        updId: data[0]?.upd_id || "",
        isUse: data[0]?.is_use || "",
        boardTitle: data[0]?.board_title || "",
        boardMemo: data[0]?.board_memo || "",
      });
    });
  }

  goList() {
    this.props.navigate("/board/list");
  }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    handleFormSubmit(e) {
      e.preventDefault();
  
      superagent
      .post(BASE_API + "/updateBoard")
      .type("form") // application/x-www-form-urlencoded 타입 설정
      .send({
        boardId: this.state.boardId,
        regId: this.state.regId,
        updId: this.state.updId,
        isUse: this.state.isUse,
        boardTitle: this.state.boardTitle,
        boardMemo: this.state.boardMemo,
      }) // 자동으로 URL-encoded 처리
      .then((res) => {
        alert("저장되었습니다");
//        alert("Response: " + res.text);
        this.goList(); // 저장 후 목록으로 이동
      })
      .catch((err) => {
        console.error(err);
      });
    }
  
  render () {

    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">게시판 수정</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col md={12}>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Control
                      name="boardId"
                      type="hidden"
                      value={this.state.boardId}
                  />
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control name="updId" type="text" placeholder="작성자" value={this.state.regId} readOnly={true}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                      name="boardTitle"
                      type="text"
                      placeholder="제목을 입력하세요"
                      value={this.state.boardTitle}
                      onChange={this.handleChange}
                    />
                    </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                      name="boardMemo"
                      as="textarea"
                      rows="5"
                      placeholder="내용을 입력하세요"
                      value={this.state.boardMemo}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label>사용여부</Form.Label>
                  <Form.Control 
                    as="select" 
                    name="isUse" 
                    value={this.state.isUse} 
                    onChange={this.handleChange}
                  >
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </Form.Control>
                  </Form.Group>                  
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">저장</Button>
                    <Button variant="info" className="text-capitalize" onClick={this.goList}>목록</Button>
                  </div>
                </Form>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );

  };

};
  
export default withRouter(Edit);
