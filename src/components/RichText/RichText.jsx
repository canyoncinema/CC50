import React from 'react';
import './RichText.css';

const RichText = ({children, dangerouslySetInnerHTML}) => <pre
	dangerouslySetInnerHTML={dangerouslySetInnerHTML}
	className="RichText">
	{children}
</pre>;

export default RichText;