import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {HackerNewsIcon} from '../Icons';
import {hackernews} from '../../data';
import NewsList from '../NewsList';
import styles from './index.css';

class News extends React.Component {

    constructor () {
        super();

        this.state = {
            hackernews: {
                data: [],
                loaded: false,
            },
        };
    }

    componentDidMount () {
        hackernews((data) => {
            this.setState({
                hackernews: {
                    data: data,
                    loaded: true,
                },
            });
        });
    }

    render () {
        return (
            <Tabs
                className={styles.tabsContainer}
                contentContainerClassName={styles.content}
            >

                <Tab icon={<HackerNewsIcon title="Hacker News" />}>
                    <h1 className={styles.heading}>
                        Hacker News
                    </h1>

                    <NewsList
                        source="hackernews"
                        data={this.state.hackernews.data}
                        loaded={this.state.hackernews.loaded}
                        className={styles.storiesContainer}
                    />
                </Tab>

            </Tabs>
        )
    }
};

export default News;
