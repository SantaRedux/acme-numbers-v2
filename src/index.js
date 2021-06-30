import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';
import App from './App';


render(<Provider store={ store }><HashRouter><App /></HashRouter></Provider>, document.querySelector('#root'));


