import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Tags from '../Tags/Tags';
import Tag from '../Tag/Tag';
import './Filmmaker.css';

class Filmmaker extends Component {
	render() {
		const { id, avatarUrl, displayName, tags, history } = this.props;
		return (
			<div className="Filmmaker shadow-on-hover"
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/filmmakers/${id}`;
					history.push(path);
				}}>
				<div className="media">
					<FilmmakerAvatar
						width="115px"
						height="115px"
						url={avatarUrl} />
				</div>
				<div className="content">
					<h4 className="displayName single-line">{displayName}</h4>
					{
						tags && tags.length ?
						<Tags className="single-line">
							{
								tags.map((tag, i) => (
									<Tag key={i}>{tag}</Tag>
								))
							}
						</Tags>
						: null
					}
				</div>
			</div>
		);
	}
}

export default withRouter(Filmmaker);