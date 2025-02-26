import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {LockerIcon} from '../Icons';
import {locker} from '../../data/locker';
import NewsList from '../NewsList';
import styles from './index.css';

class Lockers extends React.Component {

    constructor () {
        super();

        this.state = {
            locker: {
                data: [],
                loaded: false,
            },
            github: {
                data: [],
                loaded: false,
            },
            examitem: {
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

    handleActiveTab (tab) {
        switch (tab.props.value) {
            case 'github':
                if (!this.state.github.loaded) {
                    github((data) => {
                        this.setState({
                            github: {
                                data: data,
                                loaded: true,
                            },
                        });
                    });
                }
            break;
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

                    <NewsList
                        source="locker"
                        data={this.state.locker.data}
                        loaded={this.state.locker.loaded}
                        className={styles.storiesContainer}
                    />
                </Tab>

            </Tabs>
        )
    }
};

export default Lockers;
