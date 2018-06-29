import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import Head from './components/Head/Head';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	[
		<Head key={0} />,
		<App key={1} />
	]
, document.getElementById('root'));
registerServiceWorker();
