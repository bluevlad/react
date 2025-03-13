import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

class LockerView extends React.Component {

  render () {

    return (
      <React.Fragment>
        <Row>
          <Col>
          {
            this.props.data.map(item => {
              if (this.props.source == 'lockerOne') {
                return (
                  <Card title={item.box_nm} isOption>
                    {item.box_count}
                  </Card>
                )
              }
            })
          }
          </Col>
        </Row>
      </React.Fragment>
    )

  };
  
};

export default LockerView;
