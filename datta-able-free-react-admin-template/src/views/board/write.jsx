import React from 'react';
import superagent from "superagent";
import { BASE_URL } from "../../services/api";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Write extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      regId: "admin",
      isUse: "Y",
      boardTitle: "",
      boardMemo: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goList = this.goList.bind(this);
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
      .post(BASE_URL + "/insertBoard")
      .type("form") // application/x-www-form-urlencoded 타입 설정
      .send(this.state) // 자동으로 URL-encoded 처리
      .then((res) => {
        alert("Response: " + res.text);
        this.props.navigate("/board/list");
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
                <Card.Title as="h5">게시판 쓰기</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col md={12}>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text" placeholder="작성자" value={this.state.regId} readOnly={true}/>
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
                    <Form.Control as="select" name="isUse">
                      <option vlaue="Y">사용</option>
                      <option value="N">미사용</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">등록</Button>
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
  
export default withRouter(Write);
