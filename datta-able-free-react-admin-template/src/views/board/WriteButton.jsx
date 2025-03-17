import React, {useState} from 'react';
import superagent from "superagent";
import { BASE_URL } from "../../services/api";
import { Form, Button } from 'react-bootstrap';

export const WriteButton = () => {

  const [formData, setFormData] = useState({ boardTitle: "", boardMemo: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form 전송 (application/x-www-form-urlencoded)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    superagent
      .post(BASE_URL + "insertBoard")
      .type("form") // application/x-www-form-urlencoded 타입 설정
      .send(formData) // 자동으로 URL-encoded 처리
      .then((res) => {
        alert("Response: " + res.text);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>제목</Form.Label>
      <Form.Control
        name="boardTitle"
        type="text"
        placeholder="제목을 입력하세요"
        value={formData.boardTitle}
        onChange={handleChange}
      />
      </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>내용</Form.Label>
      <Form.Control
        name="boardMemo"
        type="text"
        placeholder="내용을 입력하세요"
        value={formData.boardMemo}
        onChange={handleChange}
       />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" onClick={handleFormSubmit}>등록</Button>
    </Form>
  );


};
