import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import Counter from './Counter'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = (type: string) => store.dispatch({type})

ReactDOM.render(
  <React.StrictMode>
    <Counter 
     value={store.getState()}
     onIncrement={() => {action('INCREMENT');console.log(store.getState())}}
     onDecrement={() => action('DECREMENT')}
     onIncrementAsync={() => action('INCREMENT_ASYNC')}
     />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
