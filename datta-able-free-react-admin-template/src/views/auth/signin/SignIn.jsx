import React, { useEffect } from 'react';
import superagent from "superagent";
import { BASE_API } from "../../../config/constant";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState("");
  const [userPwd, setUserPwd] = React.useState("");
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/auth/profile");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "userId") setUserId(e.target.value);
    if (e.target.name === "userPwd") setUserPwd(e.target.value);
  };

  const validateForm = () => {
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

    setErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    superagent
      .post(BASE_API + "/auth/login")
      .type("form")
      .send({ userId, userPwd })
      .then((res) => {
        localStorage.setItem('token', res.body.token);
        localStorage.setItem('userId', res.body.userInfo.user_id);
        localStorage.setItem('userNm', res.body.userInfo.user_nm);
        localStorage.setItem('email', res.body.userInfo.email);
        alert("Login OK");
        navigate("/app/dashboard/default");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
                <Form onSubmit={handleFormSubmit}>
                  <Card.Body className="text-center">
                    <div className="mb-4">
                      <i className="feather icon-user-plus auth-icon" />
                    </div>
                    <h3 className="mb-4">Sign in</h3>
                    <div className="input-group mb-3">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                          name="userId"
                          type="text"
                          placeholder="사용자아이디를 입력하세요"
                          value={userId}
                          onChange={handleChange}
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
                          value={userPwd}
                          onChange={handleChange}
                        />
                        {errors.userPwd && <div className="invalid-feedback">{errors.userPwd}</div>}
                      </Form.Group>
                    </div>
                    <Button className="btn btn-primary mb-4" type="submit">Sign in</Button>
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
}

export default SignIn;
