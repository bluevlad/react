import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

import request from "superagent";

const baseUrl = "http://localhost:8080/api";

const WriteButton = () => {

  const [boardTitleid, setboardTitleid] = useState('');
  const [boardMemo, setboardMemo] = useState('');

  const changeTitle = (e) => {
    setboardTitleid(e.target.value);
   };
  const changeMemo = (e) => {
    setboardMemo(e.target.value);
  };
   
  body = new FormData();
  body.append("boardTitle",  JSON.stringify(getItem('boardTitle')));
  body.append("boardMemo",  JSON.stringify(getItem('boardMemo')));

  const goSubmit = () => {
    alert("여기");
    const form = e.target;
    const formData = new FormData(form);

    request.post(baseUrl+"/insertBoard")
    .type('form')
    .send({body})
    .set('Accept', 'application/json')
    .then(res => {
       alert("등록되었습니다." + JSON.stringify(res.body));
    });

    navigate("/board/list");

};

  return (
    <Button variant="primary" onClick={goSubmit}>Submit</Button>
  );

};

export default WriteButton;
