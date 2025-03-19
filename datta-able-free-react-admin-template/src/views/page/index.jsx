import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { bPage } from './data';

import Card from '../../components/Card/MainCard';

const Page = () => {
  const [paginationData, setPaginationData] = useState({ data: [], loaded: false });
  const [active, setActive] = useState(2); // 현재 페이지
  const totalPage = 5; // 전체 페이지 수
  const navigate = useNavigate();

  // 🔹 비동기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bPage();
        setPaginationData({ data, loaded: true });
      } catch (error) {
        console.error("페이지 데이터 로드 오류:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <h5 className="mt-3">게시판 Page</h5>
            <hr />
            <Pagination>
              <Pagination.First onClick={() => setActive(1)} />
              <Pagination.Prev onClick={() => setActive(Math.max(1, active - 1))} />

              {/* 페이지 숫자 버튼 */}
              {[...Array(totalPage)].map((_, index) => {
                const number = index + 1;
                return (
                  <Pagination.Item
                    key={number}
                    active={number === active}
                    onClick={() => setActive(number)}
                  >
                    {number}
                  </Pagination.Item>
                );
              })}

              <Pagination.Next onClick={() => setActive(Math.min(totalPage, active + 1))} />
              <Pagination.Last onClick={() => setActive(totalPage)} />
            </Pagination>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Page;
