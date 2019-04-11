import * as types from '../actionTypes';

const initialState = {
	data: [],
	mediaByCsid: [],
	isLoading: false,
	error: null,
    pageNum: null,
    pastEventsTotalCount: 0,
	pastEvents: [],
	futureEvents: []
};

function sortEventsByDate(events) {
    const pastEvents = [];
    const futureEvents = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    events.forEach(e => {
        e.showingOpeningDate = e.showingOpeningDate.replace(/-/g, '\/');
        new Date(e.showingOpeningDate) < today ? pastEvents.push(e) : futureEvents.push(e)
    });
    return {
        pastEvents,
        futureEvents
    }
}

const eventsReducer = (state=initialState, action) => {
    const { data, totalCount, pageCount, pageNum } = action;
    switch (action.type) {
		case types.FETCH_EVENTS:
				return {
					...state,
					isLoading: true,
					error: null
				};
		case types.RECEIVED_EVENTS:
            const allReceivedEvents = sortEventsByDate(data);
            const pastEventsTotalCount = totalCount - allReceivedEvents.futureEvents.length;
            return {
				isLoading: false,
				error: null,
				pastEvents: allReceivedEvents.pastEvents,
				futureEvents: allReceivedEvents.futureEvents,
                pastEventsTotalCount: pastEventsTotalCount,
                pageCount,
                pageNum,
			};
        case types.ADD_EVENTS:
            return {
                ...state,
                isLoading: false,
                error: null,
                pastEvents: (state.pastEvents || []).concat(data),
                pastEventsTotalCount: state.pastEventsTotalCount,
                pageCount,
                pageNum,
            };
		case types.FAILED_EVENTS:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default eventsReducer;