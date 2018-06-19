import base64 from 'base-64';

const config = {
	development: {
		username: process.env.REACT_APP_CC50_USERNAME_DEVELOPMENT,
		password: process.env.REACT_APP_CC50_PASSWORD_DEVELOPMENT,
		baseUrl: 'http://dev-cs45-2.cancf.com/cspace-services',
		list: {
			filmmakers: '/personauthorities/0be54e66-1fa7-40a6-a94b/items'
		}
	},
	production: {
		username: process.env.REACT_APP_CC50_USERNAME_PRODUCTION,
		password: process.env.REACT_APP_CC50_PASSWORD_PRODUCTION,
		baseUrl: 'https://cs.cancf.com/cspace-services',
		list: {
			filmmakers: '/personauthorities/0be54e66-1fa7-40a6-a94b/items'
		}
	}
}

class Config {
	constructor(env) {
		this.env = env;
	}

	get baseUrl() {
		return config[this.env].baseUrl;
	}

	get filmmakers() {
		return config[this.env].list.filmmakers;
	}

	get filmmakersUrl() {
		return this.baseUrl + this.filmmakers
	}

	get authHeaders() {
		const { username, password } = config[this.env];
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

		return headers;
	}
}

export default Config;

// https://gooduser:secretpassword@www.example.com/webcallback?foo=bar
