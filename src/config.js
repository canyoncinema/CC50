import base64 from 'base-64';
import { matchRefName,
	toItemsData,
	toTotalCount,
	toPageCount,
	getShortIdentifierFromRefName,
	getDisplayNameFromRefName,
	collectionItemsToItemName,
	cspaceCollectionToItemName,
	collectionItemsToCSpaceCollection } from './utils/parse-data';
import { queryParamsToString } from './utils/query-string';

const toRefNameUriVal = refName => refName.replace('#', '%23');

const config = {
	development: {
		ghost: {
			apiUrl: 'http://ghost.cancf.com/ghost/api/v0.1',
		},
		username: process.env.REACT_APP_CC50_USERNAME_DEVELOPMENT,
		password: process.env.REACT_APP_CC50_PASSWORD_DEVELOPMENT,
		baseUrl: 'http://dev-cs45-2.cancf.com:8180/cspace-services',
		list: {
			personauthorities: '/personauthorities/0be54e66-1fa7-40a6-a94b/items',
			workauthorities: '/workauthorities/ac2cb0c7-8339-497a-8d66/items',
			exhibitions: '/exhibitions',
			media: '/media'
		}
	},
	production: {
		ghost: {
			apiUrl: 'http://ghost.cancf.com/ghost/api/v0.1',
		},
		username: process.env.REACT_APP_CC50_USERNAME_PRODUCTION,
		password: process.env.REACT_APP_CC50_PASSWORD_PRODUCTION,
		// baseUrl: 'http://cs.cancf.com:8180/cspace-services',
		baseUrl: 'http://beta.canyoncinema50.org/cspace-services',
		list: {
			personauthorities: '/personauthorities/4e269e3b-5449-43bf-8aac/items',
			workauthorities: '/workauthorities/7a94c0cb-5341-4976-b854/items',
			exhibitions: '/exhibitions',
			media: '/media'
		}
		// _ALL_ only works for LISTS
		// Note: CSID changes on db reset, shortIdentifier stays

	}
}


export const wrappedFetch = (...args) => {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	// headers.append('Authorization', 'Basic ' + base64.encode(
	// 	config.production.username + ":" + config.production.password)
	// );
	args[1] = { headers };
	return fetch(...args);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
		return this.baseUrl + config[this.env].list.personauthorities
			+ queryParamsToString(queryParams);
	}

	listFilmsUrl(queryParams) {
		return this.baseUrl + config[this.env].list.workauthorities
			+ queryParamsToString(queryParams);
	}

	listEventsUrl(queryParams) {
		return this.baseUrl + config[this.env].list.exhibitions
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
		return url;
	}

	getEventsUrl(queryParams) {
		return this.baseUrl + config[this.env].list.exhibitions
			+ queryParamsToString(queryParams);
	}

	fetchItems(...args) {
		return wrappedFetch(encodeURI(this.getItemsUrl(...args)));
	}

	// note: ephemera and event search are not yet there
	// collectionItemTypes = ['films', 'filmmakers', 'ephemera', 'events']
	collectionItemTypes = ['films', 'filmmakers']

	fetchSearchedItems(collectionItems, queryParams) {
		return wrappedFetch(encodeURI(this.getItemsUrl(collectionItems, queryParams)));
	}

	convertPayloadToChoices(payload) {
		if (!payload['ns2:abstract-common-list']) {
			throw new Error('Inaccurate payload argument');
		}
		if (toTotalCount(payload) == 0) {
			return [];
		}
		const items = toItemsData(payload);
		return items;
	}

	fetchItemChoices(...args) {
		return new Promise((resolve, reject) => {
			try {
				wrappedFetch(encodeURI(this.getItemsUrl(...args)))
				.then(response => {
					if (response.status >= 400) {
						reject('Bad response from server');
					}
					return response.json();
				})
				.then(payload => {
					try {
						const choices = this.convertPayloadToChoices(payload);
						const totalCount = toTotalCount(payload);
						const pageCount = toPageCount(payload);
						resolve({
							choices,
							totalCount,
							pageCount
						});
					} catch(e) {
						reject(e);
					}
				})
				.catch(err => reject(err));
			} catch(e) {
				reject(e);
			}
		});
	}

	getMediaUrl(queryParams) {
		let url = this.baseUrl + config[this.env].list.media;
		if (queryParams) {
			url += queryParamsToString(Object.assign(queryParams, {
				wf_deleted: false
			}));
		}
		return url;
	}

	fetchItemMedia({ refName, isEvent, isByFilmmaker, isFilmStills, pgSz }) {
		let as;
		const asWrapper = (...args) => `((${args.join('')}))`;
		const isByCreator = creatorRefName => `media_common:creator+%3D+%22${encodeURIComponent(toRefNameUriVal(creatorRefName))}%22`;
		const isFilmSubject = filmRefName => `media_canyon:filmSubject+%3D+%22${encodeURIComponent(toRefNameUriVal(filmRefName))}%22`;
		const andIsFilmSubjectMedia = '+AND+media_common:typeList%2F*+%3D+%22film_still%22';
		if (isByFilmmaker) {
			// get film stills whose creator = the filmmaker (by refName)
			as = asWrapper(isByCreator(refName), andIsFilmSubjectMedia);
		} else if (isEvent) {
			as = ``
		} else {
			as = asWrapper(isFilmSubject(refName), andIsFilmSubjectMedia);
		}
		const queryParams = {
			as,
			pgSz
		};
		return wrappedFetch(this.getMediaUrl(queryParams));
	}

	fetchAllChoices(queryParams) {
		// SPEC: does a search across ALL collection item types,
		// and returns a shuffled list of them
		const choicesPromises = this.collectionItemTypes.map(items =>
				this.fetchItemChoices(items, queryParams)
			);
		return new Promise((resolve, reject) => {
			Promise.all(choicesPromises)
				.then((sets) => {
					const setsOfChoices = sets.map(s => s.choices);
					const setsOfTotalCounts = sets.map(s => s.totalCount);
					const totalCountSum = setsOfTotalCounts
						.reduce((total, count) =>
							total += count,
						0);
					const setsOfPageCounts = sets.map(s => s.pageCount);
					const pageCountSum = setsOfPageCounts
						.reduce((total, count) =>
							total += count,
						0)
					// TODO: PAGINATION
					const lastElIndices = setsOfChoices.reduce((lastIndices, choiceSet, i) => {
						if (i === 0) {
							lastIndices.push(choiceSet.length - 1);
						} else {
							const lastI = lastIndices[lastIndices.length - 1];
							lastIndices.push(lastI + choiceSet.length);
						}
						return lastIndices;
					}, []);
					const allChoices = setsOfChoices.reduce((allChoices, set, i) => {
						return allChoices.concat(
							set.map(choice => {
								choice.collectionItems = this.collectionItemTypes[i];
								return choice;
							})
						);
					}, []);
					const shuffledChoices = shuffle(allChoices);
					resolve({
						choices: shuffledChoices,
						totalCount: totalCountSum,
						pageCount: pageCountSum
					});
				})
				.catch(e => reject(e))
		})
	}

	fetchEvents(...args) {
		return wrappedFetch(encodeURI(this.getEventsUrl(...args)));
	}

	getItemUrl({ collectionItems, cspaceCollection, csid, shortIdentifier }) {
		if (!(shortIdentifier || csid) || !(collectionItems || cspaceCollection)) {
			throw new Error('collectionItems + shortIdentifier are required');
		}
		// example: "http://cs.cancf.com/cspace-services/personauthorities/urn:cspace:name(person)/items/urn:cspace:name(AbigailChild1529446292368)"
		const cllxn = cspaceCollection ? cspaceCollection : collectionItemsToCSpaceCollection(collectionItems, false);
		const itemName = collectionItems ?
			collectionItemsToItemName(collectionItems, false) :
			cspaceCollectionToItemName(cspaceCollection, false);
		return `${this.baseUrl}/${cllxn}/${csid ? csid : `urn:cspace:name(${itemName})/items/urn:cspace:name(${shortIdentifier})`}`;
	}

	fetchItem(...args) {
		return wrappedFetch(encodeURI(this.getItemUrl(...args)));
	}

	fetchEvent(csid) {
		return this.fetchItem({
			cspaceCollection: 'exhibitions',
			csid
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
		return wrappedFetch(encodeURI(this.getFilmmakerFilmsUrl(...args)));
	}

	fetchFilms(filmRefNames) {
		const promises = filmRefNames.map(refName =>
			this.fetchItem({
				collectionItems: 'films',
				shortIdentifier: getShortIdentifierFromRefName(refName)
			})
		);
		return Promise.all(promises)
			.then(responses => {
				return Promise.all(responses
					.map(r => r.status >= 400 ? { error: 'Bad response from server' } : r) // fail silently
					.map(r => {
						return r.error ? r.error : r.json();
					})
				)
			});
	}

	GHOST_CLIENT_SECRET = 'de4b915ccc25' // not so secret secret (read-only access)

	listNews({ limit, filter }) {
		// NOTE: Ghost Bug when listing fields including 'tags'; just show all fields
		return fetch(`http://ghost.cancf.com/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=${this.GHOST_CLIENT_SECRET}&` +
			`limit=${limit}` +
			`&include=tags,authors` +
			`&order=published_at+desc` +
			`&filter=visibility:public${filter ? '%2B' + filter : ''}`);
	}

	retrieveNewsDetail({ slug }) {
		return fetch(`http://ghost.cancf.com/ghost/api/v0.1/posts/slug/${slug}/?client_id=ghost-frontend&client_secret=${this.GHOST_CLIENT_SECRET}&include=authors,tags`);
	}

	MIN_MEDIA_COUNT = 321

	fetchSpotlightMediaItems() {
		// SPEC: 3 randomized items on media
		let mediaItems = [];
		let totalItems = this.MIN_MEDIA_COUNT;
		const queryParams = () => ({
			pgSz: 1,
			pgNum: Math.ceil(Math.random() * Number(totalItems))
		});

		const fetchSpotlightMediaItem = () =>
			wrappedFetch(encodeURI(this.getMediaUrl(queryParams())));

		const getSpotlightMediaItem = response => {
			return new Promise((resolve, reject) => {
				if (response.status >= 400) {
					reject('Bad response from server: ' + response.status);
				}
				response.json()
					.then(payload => {
						totalItems = payload['ns2:abstract-common-list'].totalItems;
						const items = toItemsData(payload, true);
						resolve(items[0]);
					})
					.catch(err => reject(err));
			})
			.then(item => mediaItems.push(item));
		};

		return fetchSpotlightMediaItem()
			.then(response => getSpotlightMediaItem(response))
			.then(fetchSpotlightMediaItem)
			.then(response => getSpotlightMediaItem(response))
			.then(fetchSpotlightMediaItem)
			.then(response => getSpotlightMediaItem(response))
			.then(() => mediaItems);
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
