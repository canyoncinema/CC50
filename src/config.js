import base64 from 'base-64';

class Config {
	constructor(env) {
		this.env = env;
		console.log('config', this.env);
	}

	get baseUrl() {
		return this.env === 'development' ?
		'http://ec2-54-245-141-209.us-west-2.compute.amazonaws.com:80/cspace-services' :
		'https://reader:reader123@cs.cancf.com/cspace-services'
	}

	get filmmakers() {
		// TODO PROD
		return this.env === 'development' ?
		'/personauthorities/0be54e66-1fa7-40a6-a94b/items' :
		'/personauthorities/5b2486be-bc1f-4176-97fa/items';
	}

	get filmmakersUrl() {
		return this.baseUrl + this.filmmakers
	}

	get authHeaders() {
		let username = 'reader@cs.cancf.org';
		let password = 'reader123';

		let headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Content-Type', 'text/json');
		headers.append('Authorization', 'Basic' + base64.encode(username + ":" + password));

		return headers;
	}
}

export default Config;

// https://gooduser:secretpassword@www.example.com/webcallback?foo=bar
