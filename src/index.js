import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Root from './Root';
import Head from './components/Head/Head';

import registerServiceWorker from './registerServiceWorker';

// polyfills
import 'core-js/es6/map';
import 'object-fit-images'; // TODO

ReactDOM.render(
	[
		<Head key={0} />,
		<Root key={1} />
	]
, document.getElementById('root'));
registerServiceWorker();
