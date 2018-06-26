import base64 from 'base-64';
import { matchRefName,
	getDisplayNameFromRefName,
	collectionItemsToItemName,
	cspaceCollectionToItemName,
	collectionItemsToCSpaceCollection } from './utils/parse-data';
import { queryParamsToString } from './utils/query-string';

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
		// _ALL_ only works for LISTS
		// Note: CSID changes on db reset, shortIdentifier stays

	}
}

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

	getItemsUrl(collectionItems, queryParams) {
		const cspaceCollection = collectionItemsToCSpaceCollection(collectionItems, false);
		const collectionRefName = collectionItemsToCSpaceCollection(collectionItems, true);
		let url = this.baseUrl + config[this.env].list[cspaceCollection];
		if (queryParams) {
			url += queryParamsToString(Object.assign(queryParams, {
				wf_deleted: false
			}));
		}
		// if (sortVal) {
			// TODO: SORT FOR REAL
			// url += '?sortBy=' + collectionRefName + '_common:' + sortVal;
		// }
		return url;
	}

	fetchItems(...args) {
		return fetch(encodeURI(this.getItemsUrl(...args)), {
			headers: this.authHeaders
		});
	}

	getItemUrl({ collectionItems, cspaceCollection, shortIdentifier }) {
		if (!shortIdentifier || !(collectionItems || cspaceCollection)) {
			throw new Error('collectionItems + shortIdentifier are required');
		}
		// example: "http://cs.cancf.com/cspace-services/personauthorities/urn:cspace:name(person)/items/urn:cspace:name(AbigailChild1529446292368)"
		const cllxn = cspaceCollection ? cspaceCollection : collectionItemsToCSpaceCollection(collectionItems, false);
		const itemName = collectionItems ?
			collectionItemsToItemName(collectionItems, false) :
			cspaceCollectionToItemName(cspaceCollection, false);
		return `${this.baseUrl}/${cllxn}/urn:cspace:name(${itemName})/items/urn:cspace:name(${shortIdentifier})`;
	}

	fetchItem(...args) {
		return fetch(encodeURI(this.getItemUrl(...args)), {
			headers: this.authHeaders
		});
	}

	getRetrieveUri({ collectionItems, shortIdentifier, cspaceCollection }) {
		const cspaceCllxn = cspaceCollection ||
			collectionItemsToCSpaceCollection(collectionItems);
		if (shortIdentifier) {
			return config[this.env].list[cspaceCllxn] +
				'/urn:cspace:name(' +
				shortIdentifier +
				')';
		}
	}

	getFilmmakerFilmsUrl({ filmmakerRefName, pgSz=6, exceptShortIdentifier }) {
		let as = '(works_common:creatorGroupList/*/creator+=+"' +
			filmmakerRefName + '"';
		if (exceptShortIdentifier) {
			// all films by this filmmaker, except this film by short identifier
			as += '+AND+works_common:shortIdentifier+<>+"' + exceptShortIdentifier + '"'
		}
		as += ')';
		return this.getItemsUrl('films', {
			as,
			pgNum: 0,
			pgSz,
			wf_deleted: false
		})
	}

	fetchFilmmakerFilms(...args) {
		return fetch(encodeURI(this.getFilmmakerFilmsUrl(...args)), {
			headers: this.authHeaders
		});
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
		return this.getItemUrl({
			shortIdentifier,
			cspaceCollection
		})
	}
}

export default Config;
