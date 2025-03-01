import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {LockerIcon, ExamIcon, BoardIcon} from '../Icons';
import {locker} from '../../data/locker';
import {examitem} from '../../data/exam';
import {board} from '../../data/board';
import {lPage} from '../../data/locker';
import List from '../List';
import Page from '../Page';
import styles from './index.css';

class Academy extends React.Component {

    constructor () {
        super();

        this.state = {
            locker: {
                data: [],
                loaded: false,
            },
            examitem: {
                data: [],
                loaded: false,
            },
            board: {
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
        locker((data) => {
            this.setState({
                locker: {
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
            console.log("lPage : " + lPage);
        });
    }

    handleActiveTab (tab) {
        switch (tab.props.value) {
            case 'examitem':
                if (!this.state.examitem.loaded) {
                    examitem((data) => {
                        this.setState({
                            examitem: {
                                data: data,
                                loaded: true,
                            },
                        });
                    });
                }
            break;
            case 'board':
                if (!this.state.board.loaded) {
                    board((data) => {
                        this.setState({
                            board: {
                                data: data,
                                loaded: true,
                            },
                        });
                    });
                }
            break;
        }
    }

    render () {
        return (
            <Tabs
                className={styles.tabsContainer}
                contentContainerClassName={styles.content}
            >

                <Tab 
                    icon={<LockerIcon title="Locker Resurvation" />}>
                    <h1 className={styles.heading}>
                        Locker Resurvation
                    </h1>

                    <List
                        source="locker"
                        data={this.state.locker.data}
                        loaded={this.state.locker.loaded}
                        className={styles.storiesContainer}
                    />

                    <Page
                        source="lPage"
                        data={this.state.lPage.data}
                        loaded={this.state.lPage.loaded}
                        className={styles.storiesContainer}
                    />

                </Tab>

                <Tab
                    icon={<ExamIcon title="Exam Item" />}
                    value="examitem"
                    onActive={this.handleActiveTab.bind(this)}
                >
                    <h1 className={styles.heading}>
                        Exam Item
                    </h1>

                    <List
                        source="examitem"
                        data={this.state.examitem.data}
                        loaded={this.state.examitem.loaded}
                        className={styles.storiesContainer}
                    />

                    <a href="/?page=2">
                    Go to Next (page 2)
                    </a>
                </Tab>

                <Tab
                    icon={<BoardIcon title="Board List" />}
                    value="board"
                    onActive={this.handleActiveTab.bind(this)}
                >
                    <h1 className={styles.heading}>
                        Notifications
                    </h1>

                    <List
                        source="board"
                        data={this.state.board.data}
                        loaded={this.state.board.loaded}
                        className={styles.storiesContainer}
                    />

                    <a href="/?page=2">
                    Go to Next (page 2)
                    </a>
                </Tab>

            </Tabs>
        )
    }
};

export default Academy;
