import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {HackerNewsIcon, GitHubIcon, ProductHuntIcon} from '../Icons';
import {locker} from '../../data/locker';
import {github} from '../../data/github';
import {examitem} from '../../data/exam';
import NewsList from '../NewsList';
import styles from './index.css';

class News extends React.Component {

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

                <Tab icon={<HackerNewsIcon title="Locker Resurvation" />}>
                    <h1 className={styles.heading}>
                        Locker Resurvation
                    </h1>

                    <NewsList
                        source="locker"
                        data={this.state.locker.data}
                        loaded={this.state.locker.loaded}
                        className={styles.storiesContainer}
                    />

                    <a href="https://localhost:3000/api/getLockerList?page=2">
                        Go to Locker Resurvation (page 2)
                    </a>
                </Tab>

                <Tab
                    icon={<GitHubIcon title="GitHub Trending" />}
                    value="github"
                    onActive={this.handleActiveTab.bind(this)}
                >
                    <h1 className={styles.heading}>
                        GitHub Trending
                    </h1>

                    <NewsList
                        source="github"
                        data={this.state.github.data}
                        loaded={this.state.github.loaded}
                        className={styles.storiesContainer}
                    />

                    <a href="https://github.com/trending">
                        Go to GitHub Trending
                    </a>
                </Tab>

                <Tab
                    icon={<ProductHuntIcon title="Exam Item" />}
                    value="examitem"
                    onActive={this.handleActiveTab.bind(this)}
                >
                    <h1 className={styles.heading}>
                        Exam Item
                    </h1>

                    <NewsList
                        source="examitem"
                        data={this.state.examitem.data}
                        loaded={this.state.examitem.loaded}
                        className={styles.storiesContainer}
                    />

                    <a href="https://localhost:8080/exam">
                        Go to Exam Item
                    </a>
                </Tab>

            </Tabs>
        )
    }
};

export default News;
