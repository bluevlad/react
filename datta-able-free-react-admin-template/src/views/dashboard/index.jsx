import React from 'react';
import { Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

import { board, exam, locker } from './data';
import TabContent from './tabContent';
import MyLocker from './MyLocker';

class DashDefault extends React.Component {

  constructor () {
    super();
    this.state = {
      board: { data: [], loaded: false },
      exam: { data: [], loaded: false },
      locker: { data: [], loaded: false },
    };
  }

  componentDidMount () {
    board((data) => {
      this.setState({
        board: { data: data, loaded: true },
      });
    });
    exam((data) => {
      this.setState({
        exam: { data: data, loaded: true },
      });
    });
    locker((data) => {
      this.setState({
        locker: { data: data, loaded: true },
      });
    });
  }

  render () {
    return (
    <React.Fragment>
      <Row  >
        <MyLocker/>

        <Col md={6} xl={8} className="user-activity">
          <Card>
            <Tabs defaultActiveKey="d-board" id="uncontrolled-tab-example">
              <Tab eventKey="d-board" title="게시판">
                <TabContent
                  source="board"
                  data={this.state.board.data}
                  loaded={this.state.board.loaded}
                />
              </Tab>
              <Tab eventKey="d-exam" title="문제은행">
              <TabContent
                  source="exam"
                  data={this.state.exam.data}
                  loaded={this.state.exam.loaded}
                />
              </Tab>
              <Tab eventKey="d-locker" title="사물함">
              <TabContent
                  source="locker"
                  data={this.state.locker.data}
                  loaded={this.state.locker.loaded}
                />
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
};

export default DashDefault;
