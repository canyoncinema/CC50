import React, { Component } from 'react';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Tags from '../Tags/Tags';
import Tag from '../Tag/Tag';

class RelatedFilmmaker extends Component {
	render() {
		return (
			<div className="RelatedFilmmaker">
				<FilmmakerAvatar
					width="115px"
					height="115px"
					url="" />
					
			</div>
		);
	}
}

export default RelatedFilmmaker;