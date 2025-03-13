import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

class ExamView extends React.Component {

  render () {

    return (
      <React.Fragment>
        <Row>
          <Col>
          {
            this.props.data.map(item => {
              if (this.props.source == 'examOne') {
                return (
                  <Card title={item.que_title} isOption>
                    <p dangerouslySetInnerHTML={ {__html : item.ans_desc} }/>
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

export default ExamView;
