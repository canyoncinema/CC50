import React from 'react';
import PropTypes from 'prop-types';
import './Tags.css';
import Tag, { tagId } from '../Tag/Tag';

const Tags = ({ isReadOnly, className, tags, children, onTagSelect, tagsDisabled }) => {
	if (children) {
		children = React.Children.map(children, (child) => {
			const { field, value } = child.props;
			return React.cloneElement(child, {
				onTagSelect,
				disabled: field &&
					value &&
					tagsDisabled &&
					tagsDisabled[tagId(field, value)],
				isReadOnly: isReadOnly
			});
		})
		return (
			<div className={['Tags', className].join(' ')}>
				{children}
			</div>
		);
	} else if (tags) {
		return (
			<div className={['Tags', className].join(' ')}>
				{
					tags.map((tag, i) =>
						<Tag
							isReadOnly={isReadOnly}
							key={i}>{tag}</Tag>
					)
				}
			</div>
		);
	}
}

Tags.propTypes = {
	tags: PropTypes.string
}

export default Tags;