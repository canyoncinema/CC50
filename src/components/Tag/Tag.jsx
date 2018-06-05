import React, { Component } from 'react';
import './Tag.css';

export const tagId = (field, value) => `${field}__${value}`;

class Tag extends Component {
	render() {
		const { children, disabled } = this.props;
		return (
			<div disabled={disabled}
				className="Tag"
				onClick={this.onClick}>
				{children}
			</div>
		);
	}

	onClick = () => {
		const { field, value, onTagSelect } = this.props;
		if (field && value && onTagSelect) {
			onTagSelect(field, value);	
		}
	}
}


export default Tag;
