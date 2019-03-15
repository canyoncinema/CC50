// import {
//     FETCH_ITEM_PROGRAMS,
//     RECEIVED_ITEM_PROGRAMS,
//     FAILED_ITEM_PROGRAMS
// } from '../actionTypes';
// import { config } from '../store';
// import {toItemsData, toDisplayName, getShortIdentifierFromRefName, toItemData} from '../utils/parse-data';
//
// function fetchItemPrograms() {
//     return {
//         type: FETCH_ITEM_PROGRAMS
//     }
// }
//
// function receiveItemPrograms(dispatch, payload, refShortIdentifier) {
//     const films = toItemsData(payload);
//     return {
//         type: RECEIVED_ITEM_PROGRAMS,
//         data: films
//     }
// }
//
// function failItemPrograms(error) {
//     console.error('Failed Item Request', error);
//     return {
//         type: FAILED_ITEM_PROGRAMS,
//         error
//     }
// }
//
// export function getItemPrograms({ filmmakerRefName, pgSz, exceptShortIdentifier }) {
//     // const { filmsByFilmmakerPgSz } = filmmakerOptions;
//     return (dispatch) => {
//         dispatch(fetchItemPrograms());
//         wrappedFetch(config.getUrlFromRefName(filmmakerRefName))
//             .then(response => {
//                 if (response.status >= 400) {
//                     console.error("Bad response from server");
//                 }
//                 return response.json();
//             })
//             .then(payload => {
//                     const data = toItemData(payload);
//                     dispatch(receiveItemFilmmaker(dispatch, data, filmShortIdentifier, filmmakerRefName, filmsByFilmmakerPgSz));
//                 }, error =>
//                     dispatch(failItemFilmmaker(error))
//             );
//     }
// }
