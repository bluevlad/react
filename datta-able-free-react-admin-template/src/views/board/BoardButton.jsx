import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BoardButton = () => {

  const navigate = useNavigate();
  
  const goWrite = () => {
    navigate("/board/write");
  };

  return (
    <div className="d-flex justify-content-end">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip className="mb-2" id="tooltip">등록</Tooltip>}
      >
        <Button variant="primary" className="text-capitalize" onClick={goWrite}>
          등록
        </Button>
      </OverlayTrigger>
    </div>
  );

};

export default BoardButton;
