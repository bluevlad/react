import React from 'react';
import superagent from "superagent";
import { BASE_URL } from "../../../services/api";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userPwd: "",
      errors: {},  // 🔹 에러 메시지 저장 객체
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // 🔹 입력값 유효성 검사
  validateForm() {
    const { userId, userPwd } = this.state;
    let errors = {};
    let isValid = true;

    if (!userId.trim()) {
      errors.userId = "사용자 아이디를 입력하세요.";
      isValid = false;
    }

    if (!userPwd.trim()) {
      errors.userPwd = "비밀번호를 입력하세요.";
      isValid = false;
    } else if (userPwd.length < 6) {
      errors.userPwd = "비밀번호는 최소 6자리 이상이어야 합니다.";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return; // 🔹 유효성 검사 실패 시 제출 중단
    }

    superagent
      .post(BASE_URL + "/login/Login")
      .type("form") // application/x-www-form-urlencoded 타입 설정
      .send({ userId: this.state.userId, userPwd: this.state.userPwd }) // 자동으로 URL-encoded 처리
      .then((res) => {
        alert("Response: " + res.text);
        this.props.navigate("/app/dashboard/default");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <Card className="borderless">
              <Row className="align-items-center">
                <Col>
                  <Form onSubmit={this.handleFormSubmit}>
                  <Card.Body className="text-center">
                    <div className="mb-4">
                      <i className="feather icon-user-plus auth-icon" />
                    </div>
                    <h3 className="mb-4">Sign up</h3>
                    <div className="input-group mb-3">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                      name="userId"
                      type="text"
                      placeholder="사용자아이디를 입력하세요"
                      value={this.state.userId}
                      onChange={this.handleChange}
                    />
                    {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
                    </Form.Group>
                    </div>
                    <div className="input-group mb-4">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      className={`form-control ${errors.userPwd ? 'is-invalid' : ''}`}
                      name="userPwd"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={this.state.userPwd}
                      onChange={this.handleChange}
                    />
                    {errors.userPwd && <div className="invalid-feedback">{errors.userPwd}</div>}
                    </Form.Group>
                    </div>
                    <div className="form-check  text-start mb-4 mt-2">
                      <input type="checkbox" className="form-check-input" id="customCheck1" defaultChecked={false} />
                      <label className="form-check-label" htmlFor="customCheck1">
                        Send me the <Link to="#"> Newsletter</Link> weekly.
                      </label>
                    </div>
                    <Button className="btn btn-primary mb-4" type="submit">Sign up</Button>
                    <p className="mb-2">
                      Already have an account?{' '}
                      <NavLink to={'/auth/signin'} className="f-w-400">
                        Login
                      </NavLink>
                    </p>
                    <p className="mb-2">
                      <NavLink to={'/app/dashboard/default'} className="f-w-400">
                        Home
                      </NavLink>
                    </p>
                  </Card.Body>
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  };

};
  
export default withRouter(SignUp);
