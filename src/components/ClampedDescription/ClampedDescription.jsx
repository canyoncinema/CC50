import React, { Component } from 'react';
import Dotdotdot from 'react-dotdotdot';
import BrowserDetection from 'react-browser-detection';

class ClampedDescription extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	browserHandler = {
	  chrome: () => {
	  	const { children, className, title, maxLines } = this.props;
		  // console.log('browser detect chrome', children, title, maxLines);
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
	  	const { children, title, maxLines } = this.props;
	  	// console.log('browser detect default', children, title, maxLines);
	  	if (this.props.maxLines === 1) {
	  		return (
	  			<div title={title} className="ClampedDescription single-line-ellipsed">
	  				{children}
	  			</div>
	  		);
	  	}
	  	return (
		  	<Dotdotdot
				title={title}
				className="ClampedDescription"
				clamp={maxLines}>
				{children}
			</Dotdotdot>
			);
		}
	}

	render() {
		const { children, className, title, maxLines } = this.props;
		// TODO @marlo I don't understand, this doesn't seem to do anything with the maxLines information.
        if (!isNaN(maxLines)) {
            return <div title={title} className={className}>{ children }</div>;
		}
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