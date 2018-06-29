import { Component } from 'react';

class ChildrenOnly extends Component {
	render() {
		return this.props.children;
	}
};

export default ChildrenOnly;