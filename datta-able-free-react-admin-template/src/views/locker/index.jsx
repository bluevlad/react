import React from 'react';
import {locker} from '../../data/locker';
import List from './List';
import { Row, Col, Card, Table } from 'react-bootstrap';

class Locker extends React.Component {

    constructor () {
        super();

        this.state = {
            locker: {
                data: [],
                loaded: false,
            },
        };
    }

    componentDidMount () {
        locker((data) => {
            this.setState({
                locker: {
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
                        <Card.Header>
                        <Card.Title as="h5">공지사항</Card.Title>
                        <span className="d-block m-t-5">
                            use bootstrap <code>Table</code> component
                        </span>
                        </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>사물함명</th>
                    <th>사물함수</th>
                    <th>변경일시</th>
                  </tr>
                </thead>
                <tbody>
                    <List
                        source="locker"
                        data={this.state.locker.data}
                        loaded={this.state.locker.loaded}
                    />
                    </tbody>
                    </Table>
            </Card.Body>
                    </Card>
                    </Col>
                </Row>
                </React.Fragment>
        )
    }
};

export default Locker;
