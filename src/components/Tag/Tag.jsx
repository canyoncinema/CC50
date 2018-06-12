import React, { Component } from 'react';
import './Tag.css';

export const tagId = (field, value) => `${field}__${value}`;

class Tag extends Component {
	render() {
		const { children, onTagSelect, disabled } = this.props;
		return (
			<div disabled={disabled}
				className="Tag"
				onClick={onTagSelect && this.onClick}>
				{children}
			</div>
		);
	}

	onClick = () => {
		const { field, value, onTagSelect } = this.props;
		onTagSelect(field, value);
	}
}


export default Tag;
