import React from 'react';
import {bPage} from '../../data/board';
import {ePage} from '../../data/exam';
import {lPage} from '../../data/locker';
import List from './List';
import { Row, Col, Card } from 'react-bootstrap';

class Page extends React.Component {

  constructor () {
    super();

    this.state = {
      bPage: {
        data: [],
        loaded: false,
      },
      ePage: {
        data: [],
        loaded: false,
      },
      lPage: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    bPage((data) => {
      this.setState({
        bPage: {
          data: data,
          loaded: true,
        },
      });
    });
    ePage((data) => {
      this.setState({
        ePage: {
          data: data,
          loaded: true,
        },
      });
    });
    lPage((data) => {
      this.setState({
        lPage: {
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
                    source="bPage"
                    data={this.state.bPage.data}
                    loaded={this.state.bPage.loaded}
              />
              <List
                    source="ePage"
                    data={this.state.ePage.data}
                    loaded={this.state.ePage.loaded}
              />
              <List
                    source="lPage"
                    data={this.state.lPage.data}
                    loaded={this.state.lPage.loaded}
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
