import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Autolinker from 'autolinker';

import Card from '../../components/Card/MainCard';

class BoardView extends React.Component {

  render () {

    return (
      <React.Fragment>
        <Row>
          <Col>
            {
              this.props.data.map(item => {
                if (this.props.source == 'boardOne') {
                  return (
                    <Card title={item.board_title} isOption>
                    <p dangerouslySetInnerHTML={ {__html : item.board_memo} }/>
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

export default BoardView;
