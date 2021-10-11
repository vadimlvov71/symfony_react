import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
//import '../css/app.css';
import Home from './components/Home';
import Detail from './components/Detail';

ReactDOM.render(<Router><Switch><Route exact path="/"><Home /></Route><Route exact path="/:goods_translit"><Detail /></Route></Switch></Router>, document.getElementById('root'));
