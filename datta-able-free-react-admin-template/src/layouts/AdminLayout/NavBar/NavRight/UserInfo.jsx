import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const UserInfo = () => {
  const [userId, setUserId] = useState(""); // 사용자 ID 상태 관리
  const [userNm, setUserNm] = useState(""); // 사용자 이름 상태 관리
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // 토큰이 없으면 실행 안 함

    // localStorage에서 값 가져와서 상태 업데이트
    setUserId(localStorage.getItem("userId") || "");
    setUserNm(localStorage.getItem("userNm") || "");
  }, [token]); // token이 변경될 때만 실행

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNm");
    setUserId("");
    setUserNm("");
  };

  return (
    <ListGroup.Item as="li" bsPrefix=" ">
      <Dropdown align={'end'} className="drp-user">
        <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
          <i className="icon feather icon-settings" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="profile-notification">
          <div className="pro-head">
            <img src={avatar1} className="img-radius" alt="User Profile" />
            <span>{userNm || "Guest"}</span> {/* 상태에서 userNm을 가져와 표시 */}
            <Link to="#" className="dud-logout" title="Logout" onClick={handleLogout}>
              <i className="feather icon-log-out" />
            </Link>
          </div>
          <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
            <ListGroup.Item as="li" bsPrefix=" ">
              <Link to="#" className="dropdown-item">
                <i className="feather icon-settings" /> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix=" ">
              <Link to="/auth/profile" className="dropdown-item">
                <i className="feather icon-user" /> Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix=" ">
              <Link to="#" className="dropdown-item">
                <i className="feather icon-mail" /> My Messages
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix=" ">
              <Link to="#" className="dropdown-item">
                <i className="feather icon-lock" /> Lock Screen
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Dropdown.Menu>
      </Dropdown>
    </ListGroup.Item>
  );
};

export default UserInfo;
