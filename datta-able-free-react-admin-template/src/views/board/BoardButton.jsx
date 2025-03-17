import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Card from '../../components/Card/MainCard';

const BoardButton = () => {

  const navigate = useNavigate();
  
  const goWrite = () => {
    navigate("/board/write");
  };

  const buttonVariants = ['primary'];

  const basicButtons = buttonVariants.map((variant, idx) => {
    const tooltip = (
      <Tooltip className="mb-2" id="tooltip">
        {variant}
      </Tooltip>
    );
    return (
      <OverlayTrigger key={idx} placement="top" overlay={tooltip}>
        <Button variant={variant} className="text-capitalize" onClick={goWrite}>
          WRITE
        </Button>
      </OverlayTrigger>
    );
  });

  return (
          <Card>
        {basicButtons}
          </Card>
  );

};

export default BoardButton;
