import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
import AppRouter from "./routers";


//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store, add reducers, attach saga
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

//run saga(s)
sagaMiddleware.run(Sagas);



// Render the main component into the dom

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('app'));

