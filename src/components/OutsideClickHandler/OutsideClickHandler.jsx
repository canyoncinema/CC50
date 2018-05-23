import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideClickHandler extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert('You clicked outside of me!');
    }
  }

  render() {
  	const { isDisabled, children } = this.props;
    return isDisabled ?
    	children
    	: <div ref={this.setWrapperRef}>{children}</div>;
  }
}

OutsideClickHandler.propTypes = {
  children: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool
};
