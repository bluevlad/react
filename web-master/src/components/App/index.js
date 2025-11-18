import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from '../../../config/theme';
import Header from '../Header';
import News from '../News';

class App extends React.Component {

    render () {
        return (
            <MuiThemeProvider muiTheme={Theme}>
                <div>
                    <Header />
                    <News />
                </div>
            </MuiThemeProvider>
        )
    }

};

export default App;
