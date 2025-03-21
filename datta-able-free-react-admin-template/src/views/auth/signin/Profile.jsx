import React, { useState, useEffect } from "react";
import superagent from "superagent";
import { BASE_API } from "../../../config/constant";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// useNavigate를 클래스 컴포넌트에서 사용하기 위한 HOC
function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

// userId를 가져와서 전달하는 HOC
function withUserId(Component) {
  return function WrappedComponent(props) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [userNm, setUserNm] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [email, setEmail] = useState("");
    const [memo, setmemo] = useState("");

    useEffect(() => {
      if (!token) return;

      superagent
        .post(BASE_API + "/auth/userInfo")
        .type("form")
        .send({ userId, token })
        .then((res) => {
          setUserNm(res.body.userInfo.user_nm);
          setUserPwd(res.body.userInfo.user_pwd);
          setEmail(res.body.userInfo.email);
          setmemo(res.body.userInfo.memo);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [token]);

    return <Component {...props} userId={userId} userNm={userNm} userPwd={userPwd} email={email} memo={memo} />;
  };
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token || "",
      regId: props.userId || "",
      userNm: props.userNm || "",
      userPwd: props.userPwd || "",
      confirmPassword: props.userPwd || "",
      email: props.email || "",
      memo:  props.memo || "",
      isEmail: false,
      isSms: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ regId: this.props.userId });
    }
    if (prevProps.userNm !== this.props.userNm) {
      this.setState({ userNm: this.props.userNm });
    }
    if (prevProps.userPwd !== this.props.userPwd) {
      this.setState({ userPwd: this.props.userPwd });
    }
    if (prevProps.email !== this.props.email) {
      this.setState({ email: this.props.email });
    }
    if (prevProps.memo !== this.props.memo) {
      this.setState({ memo: this.props.memo });
    }
  }

  handleChange(e) {
    const { name, type, value, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    superagent
      .post(BASE_API + "/updateUser")
      .type("form")
      .send(this.state)
      .then((res) => {
        alert("Response: " + res.text);
        this.props.navigate("/app/dashboard/default");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">사용자 정보 수정</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleFormSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type="text" value={this.state.regId} readOnly />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                          type="password"
                          name="userPwd"
                          placeholder="비밀번호 입력"
                          value={this.state.userPwd}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" value={this.state.userNm} readOnly />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="비밀번호 확인"
                          value={this.state.userPwd}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                          We&apos;ll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>비고</Form.Label>
                        <Form.Control
                          name="memo"
                          as="textarea"
                          rows="3"
                          placeholder="내용을 입력하세요"
                          value={this.state.memo}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>정보수신동의</Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="isEmail"
                          label="이메일 수신 여부"
                          checked={this.state.isEmail}
                          onChange={this.handleChange}
                        />
                        <Form.Check
                          type="checkbox"
                          name="isSms"
                          label="문자 수신 여부"
                          checked={this.state.isSms}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                          저장
                        </Button>
                        <Button variant="info" onClick={() => this.props.navigate("/app/dashboard/default")} className="ms-2">
                          취소
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(withUserId(Profile));
