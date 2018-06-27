import React, { Component } from 'react';
import $clamp from 'clamp-js';
import lineClamp from 'line-clamp';
import Dotdotdot from 'react-dotdotdot';
import BrowserDetection from 'react-browser-detection';

class ClampedDescription extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	// componentDidMount() {
	// 	// TODO: HACK -- lineClamp does not behave well with 1 line clamps
	// 	// use .single-line-ellipsed class for 1-line clamps
	// 	// if (this.props.maxLines === 1) {
	// 	// 	lineClamp(this.ref.current, 1);
	// 	// 	return;
	// 	// }
	// 	try {
	// 		if (this.props.maxLines > 1) {
	// 			$clamp(this.ref.current, { clamp: this.props.maxLines});
	// 		}
	// 	} catch(e) {
	// 		console.error(e);
	// 		if (this.props.maxLines > 1) {
	// 			lineClamp(this.ref.current, this.props.maxLines);
	// 		}
	// 	}
	// }

	browserHandler = {
	  chrome: () => {
	  	const { children, className, title, maxLines } = this.props;
	  	return (
	  		<Dotdotdot
					title={title}
					className={[
						'ClampedDescription',
						this.props.maxLines === 1 ? 'single-line-ellipsed' : '',
						className
					].join(' ')}
					clamp={maxLines}>
					{children}
				</Dotdotdot>
	  	);
	  },
	  default: () => {
	  	// at least on firefox, cannot take (any?) styles like pre-wrap
	  	// -> omit classname entirely to be safe
	  	const { children, className, title, maxLines } = this.props;
	  	return (
		  	<Dotdotdot
					title={title}
					className={[
						'ClampedDescription',
						this.props.maxLines === 1 ? 'single-line-ellipsed' : ''
					].join(' ')}
					clamp={maxLines}>
					{children}
				</Dotdotdot>
			);
		}
	}

	render() {
		const { children, className, title, maxLines } = this.props;
		return (
			<BrowserDetection>
			{ this.browserHandler }
			</BrowserDetection>
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