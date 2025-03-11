import React from 'react';
import {ePage} from '../../data/exam';
import List from './List';
import { Row, Col, Card } from 'react-bootstrap';

class Page extends React.Component {

  constructor () {
    super();
    this.state = {
      ePage: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    ePage((data) => {
      this.setState({
        ePage: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  render () {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Footer>
              <List
                    source="ePage"
                    data={this.state.ePage.data}
                    loaded={this.state.ePage.loaded}
              />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
};

export default Page;
