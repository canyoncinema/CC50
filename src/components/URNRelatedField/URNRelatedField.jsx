import { Component } from 'react';
import { config } from '../../store';
import { toItemData } from '../../utils/parse-data';
import { wrappedFetch } from '../config';

// Grab related data, and conditionally render the element with fetched data
class URNRelatedField extends Component {
	componentDidMount() {
		// TODO: error handling
		const { refName } = this.props;
		if (!refName) return;
		wrappedFetch(config.getUrlFromRefName(refName))
			.then(response => {
				if (response.status >= 400) {
					console.error("Bad response from server");
				}
				return response.json();
			})
			.then(payload => {
				const data = toItemData(payload);
				this.props.setData(data);
			}, error =>
				console.error('Error', error)
			);
	}
	render() {
		return null;
	}
}

export default URNRelatedField;