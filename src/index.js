import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
}, esES);

ReactDOM.render(
    <Router>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
