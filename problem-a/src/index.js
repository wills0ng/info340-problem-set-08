import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import SenatorData from './senators.json'


let app = <App senators={SenatorData}/>;
ReactDOM.render(app, document.getElementById('root'));