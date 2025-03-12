import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

class dashSales extends React.Component {

render () {
  return (
  <React.Fragment>
    <Row>
        {
          this.props.data.map(item => {
            if (this.props.source == 'dashboard') {
              return (
            <Col key={item.index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{item.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${item.icon} f-30 m-r-5`} /> {item.amount}
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{item.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${item.class}`}
                      role="progressbar"
                      style={{ width: `${item.value}%` }}
                      aria-valuenow={item.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            )
          }
        })
      }
    </Row>
  </React.Fragment>
  )
  }

};

export default dashSales;
