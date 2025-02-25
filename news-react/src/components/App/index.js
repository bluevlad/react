import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from '../../../config/theme';
import Header from '../Header';
import News from '../News';
import Locker from '../Locker';
import styles from './index.css';

class App extends React.Component {

    render () {
        return (
            <MuiThemeProvider muiTheme={Theme}>
                <div>
                    <Header />
                    <News />
                    <Locker />
                </div>
            </MuiThemeProvider>
        )
    }

};

export default App;
