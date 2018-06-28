import React, { Component } from 'react';

// This is for ReactMarkdown renderer to render the element
// and ignore paragraphs
//
// Example:
//
//
//

class ChildrenOnly extends Component {
	render() {
		return this.props.children;
	}
};

export default ChildrenOnly;