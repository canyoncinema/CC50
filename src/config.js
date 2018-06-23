import base64 from 'base-64';
import { matchRefName, getDisplayNameFromRefName } from './utils/parse-data';

const config = {
	development: {
		username: process.env.REACT_APP_CC50_USERNAME_DEVELOPMENT,
		password: process.env.REACT_APP_CC50_PASSWORD_DEVELOPMENT,
		baseUrl: 'http://dev-cs45-2.cancf.com/cspace-services',
		list: {
			personauthorities: '/personauthorities/0be54e66-1fa7-40a6-a94b/items',
			workauthorities: '/workauthorities/ac2cb0c7-8339-497a-8d66/items'
		}
	},
	production: {
		username: process.env.REACT_APP_CC50_USERNAME_PRODUCTION,
		password: process.env.REACT_APP_CC50_PASSWORD_PRODUCTION,
		baseUrl: 'http://cs.cancf.com:8180/cspace-services',
		list: {
			personauthorities: '/personauthorities/4e269e3b-5449-43bf-8aac/items',
			workauthorities: '/workauthorities/7a94c0cb-5341-4976-b854/items'
		}
	}
}

const queryParamsToString = (params) => {
	// expects object with key-value pairs matching collectionspace params
	return params &&
		Object.keys(params).length ?
		Object.keys(params).reduce((path, key) => {
		return path += key + '=' + params[key];
	}, '?') : '';
};

class Config {
	constructor(env) {
		// FOR DEV:
		this.env = 'production' || env;
		// FOR PRODUCTION:
		// this.env = env;
	}

	get baseUrl() {
		return config[this.env].baseUrl;
	}

	listFilmmakersUrl(queryParams) {
		console.log('list query params', queryParamsToString(queryParams))
		return this.baseUrl + config[this.env].list.personauthorities
			+ queryParamsToString(queryParams);
	}

	listFilmsUrl(queryParams) {
		return this.baseUrl + config[this.env].list.workauthorities
			+ queryParamsToString(queryParams);
	}

	getListItemsUrl(collectionItems, sortVal) {
		const cspaceCollection = this.collectionItemsToCSpaceCollection(collectionItems, false);
		const collectionRefName = this.collectionItemsToCSpaceCollection(collectionItems, true);
		let url = this.baseUrl + config[this.env].list[cspaceCollection];
		if (sortVal) {
			// TODO: SORT FOR REAL
			// url += '?sortBy=' + collectionRefName + '_common:' + sortVal;
		}
		return url;
	}

	getUrl(uri) {
		return this.baseUrl + uri;
	}

	collectionItemsToCSpaceCollection(collectionItems, isRefName) {
		switch (collectionItems) {
			case 'films':
				return isRefName ? 'works' : 'workauthorities';
			case 'filmmakers':
				return isRefName ? 'persons' : 'personauthorities';
			case 'ephemera':
				return null;
			case 'events':
				return 'exhibitions';
			default:
				return;
		}
	}

	getRetrieveUri({ collectionItems, shortIdentifier, cspaceCollection }) {
		const cspaceCllxn = cspaceCollection ||
			this.collectionItemsToCSpaceCollection(collectionItems);
		if (shortIdentifier) {
			return config[this.env].list[cspaceCllxn] +
				'/urn:cspace:name(' +
				shortIdentifier +
				')';
		}
		//  else if (itemId) {
		// 	return config[this.env].list[collectionItems] + '/' + itemId;
		// } else {
		// 	throw new Error('Missing ID or Short Identifier');
		// }
	}

	get authHeaders() {
		const { username, password } = config[this.env];
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

		return headers;
	}

	getUrlFromRefName(refName) {
		// ex: "urn:cspace:canyoncinema.com:personauthorities:name(person):item:name(StanBrakhage1529309099094)'Stan Brakhage'"
		// "urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(film_16mm)'16mm Film'"
		// "urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(TheDead1529309019213)'The Dead'"
		const match = matchRefName(refName);
		const cspaceCollection = match[1]; // e.g. personauthorities
		const shortIdentifier = match[3]; // e.g. StanBrakhage1529309099094
		return this.getUrl(this.getRetrieveUri({
			cspaceCollection,
			shortIdentifier
		}));
	}
}

export default Config;

// https://gooduser:secretpassword@www.example.com/webcallback?foo=bar
