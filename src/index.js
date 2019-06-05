import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'
import ContextProvider from './ContextAPI/ContextProvider'

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <ContextProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </ContextProvider>
        </AppContainer>,
    document.getElementById('root'));
}

render()

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
