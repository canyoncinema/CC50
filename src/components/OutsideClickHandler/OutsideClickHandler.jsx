import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
class OutsideClickHandler extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
    return node;
  }

  /**
   * Alert if clicked on outside of element
   */
  onOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onOutsideClick(event);
    }
  }

  render() {
  	const { className, onClick, isDisabled, children } = this.props;
    
    if (isDisabled) {
      return <div
        className={className}
        onClick={onClick}>{children}</div>;
    } else {
      return (
        <div
          className={className}
          onClick={onClick}
          ref={this.setWrapperRef}>{children}</div>
      );
    }
  }
}


export default OutsideClickHandler;
