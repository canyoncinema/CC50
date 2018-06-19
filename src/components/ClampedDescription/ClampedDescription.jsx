import React, { Component } from 'react';
import $clamp from 'clamp-js';
import lineClamp from 'line-clamp';

class ClampedDescription extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		// TODO: HACK -- lineClamp does not behave well with 1 line clamps
		// use .single-line-ellipsed class for 1-line clamps
		// if (this.props.maxLines === 1) {
		// 	lineClamp(this.ref.current, 1);
		// 	return;
		// }
		$clamp(this.ref.current, { clamp: this.props.maxLines});
	}

	render() {
		const { children, className, title, maxLines } = this.props;
		return (
			<div
				ref={this.ref}
				title={title}
				className={[
					'ClampedDescription',
					className
				].join(' ')}>
				{children}
			</div>
		);
	}
}

export default ClampedDescription;

// // TODO: debug line clamp lib (removes title if clamps 1 line)
// 		// TODO: debug hack with 2 line clamp libs :(
// 		if (this.displayNameRef && this.displayNameRef.current) {
// 			// TODO: HACK -- lineClamp does not behave well with 1 line clamps
// 			if (maxDisplayNameLines > 1) {
// 				lineClamp(this.displayNameRef.current, maxDisplayNameLines);
// 			} else {
// 				$clamp(this.displayNameRef.current, { clamp: maxDisplayNameLines });
// 			}
// 		}

// 		if (this.descriptionRef && this.descriptionRef.current) {
// 			$clamp(this.descriptionRef.current, { clamp: maxDescriptionLines });
// 			// lineClamp(this.descriptionRef.current, maxDescriptionLines);
// 		}

// 		if (this.filmmakersRef && this.filmmakersRef.current) {
// 			$clamp(this.filmmakersRef.current, { clamp: listView ? 3 : 2 });	
// 			// lineClamp(this.filmmakersRef.current, 2);