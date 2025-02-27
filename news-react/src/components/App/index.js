import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from '../../../config/theme';
import Header from '../Header';
import Academy from '../Academy';

class App extends React.Component {

    render () {
        return (
            <MuiThemeProvider muiTheme={Theme}>
                <div>
                    <Header />
                    <Academy />
                </div>
            </MuiThemeProvider>
        )
    }

};

export default App;
