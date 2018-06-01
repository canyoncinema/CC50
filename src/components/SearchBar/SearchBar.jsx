import React, { Component } from 'react';
import './SearchBar.css';

import CollectionContext from '../../collection-context';
import SearchIcon from './SearchIcon.svg';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
		this.wrapperRef = React.createRef();

		this.onOutsideClick = this.onOutsideClick.bind(this);
		this.onInsideClick = this.onInsideClick.bind(this);
	}

	state = {
		clearPlaceholder: false
	}

	componentDidMount() {
		// TODO: make outside click handling reusable
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

	componentDidUpdate() {
		if (this.state.clearPlaceholder) {
			this.inputRef.current.focus();
		}
	}

	onOutsideClick(event) {
		// TODO: make reusable
		const el = this.wrapperRef && this.wrapperRef.current;
		if (el && !el.contains(event.target)) {
			this.setState({
				clearPlaceholder: false
			});
    }
	}

	onInsideClick(event) {
		this.setState({
			clearPlaceholder: true
		});
	}

	render() {
		const { className } = this.props;
		const { clearPlaceholder } = this.state;
		// TODO: handle submit
		return (
			<CollectionContext.Consumer>
				{
					context => {
					const { searchPlaceholder, searchText, setSearchText } = context;
					return (
						<form
							className={[
								'SearchBar',
								className,
								clearPlaceholder ? 'active' : null
							].join(' ')}
							ref={this.wrapperRef} onSubmit={() => null}
							onClick={this.onInsideClick}>
							<img alt="Search Icon" className="icon" src={SearchIcon} />
							<input
								ref={this.inputRef}
								type="text"
								className="input"
								value={searchText}
								onChange={setSearchText}
								disabled={!clearPlaceholder}
								placeholder={clearPlaceholder ? '' : searchPlaceholder} />
						</form>
						)
					}
				}
			</CollectionContext.Consumer>
		);
	}
}

export default SearchBar;