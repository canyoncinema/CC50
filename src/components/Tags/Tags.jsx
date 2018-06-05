import React from 'react';
import './Tags.css';
import { tagId } from '../Tag/Tag';

const Tags = ({ className, children, onTagSelect, tagsDisabled }) => {
	children = React.Children.map(children, (child) => {
		const { field, value } = child.props;
		return React.cloneElement(child, {
			onTagSelect,
			disabled: field &&
			value &&
			tagsDisabled &&
			tagsDisabled[tagId(field, value)]
		});
	})
	return (
		<div className={['Tags', className].join(' ')}>
			{children}
		</div>
	);
}

export default Tags;