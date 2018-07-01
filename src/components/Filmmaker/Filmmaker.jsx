import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Tags from '../Tags/Tags';
import Tag from '../Tag/Tag';
import './Filmmaker.css';

class Filmmaker extends Component {
	render() {
		const { id, test, avatarUrl, termDisplayName, shortIdentifier, tags, history } = this.props;
		return (
			<div className="Filmmaker shadow-on-hover"
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/filmmakers/${shortIdentifier}`;
					history.push(path);
				}}>
				<div className="media">
					<FilmmakerAvatar
						width="115px"
						height="115px"
						url={avatarUrl} />
				</div>
				<div className="content list-center-wrapper">
					<h4 className="displayName single-line">{termDisplayName}</h4>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	test: state.test
});

export default connect(mapStateToProps)(withRouter(Filmmaker));