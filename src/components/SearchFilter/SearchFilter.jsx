import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './SearchFilter.css';

import { FILMS_SEARCH_LABEL, EPHEMERA_SEARCH_LABEL } from '../../collection-context';
import Tags from '../Tags/Tags';
import Tag, { tagId } from '../Tag/Tag';

// TODO: disabled filters list belongs on the Collection Context
class SearchFilter extends Component {
	state = {
		isOpen: false,
		filtersDisabled: {}
	}

	toggleMenu = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	onTagSelect = (field, value) => {
		const FIELD_VALUE_ID = tagId(field, value);
		this.setState(prevState => {
			const obj = {};
			obj[FIELD_VALUE_ID] = !prevState.filtersDisabled[FIELD_VALUE_ID];
			const newFiltersDisabled = Object.assign(prevState.filtersDisabled, obj);
			console.log('newFiltersDisabled', newFiltersDisabled);
			return {
				filtersDisabled: newFiltersDisabled
			};
		});
	}

	render() {
		const { searchLabel } = this.props;
		const { isOpen, filtersDisabled } = this.state;
		return [
			<span key={0}
				className={isOpen ? 'SearchFilter label active' : 'SearchFilter label'}
				onClick={this.toggleMenu}>
				Filter
			</span>,
			<div key={99} className={isOpen ? 'SearchFilter menu active' : 'SearchFilter menu'}>
			{
				searchLabel === FILMS_SEARCH_LABEL ?
					[<section key={1}>
						<label>Format</label>
						<Tags className="single-line"
							onTagSelect={this.onTagSelect}
							tagsDisabled={filtersDisabled}>
							<Tag field="format" value="super8">Super 8</Tag>
							<Tag field="format" value="8mm">8mm</Tag>
							<Tag field="format" value="16mm">16mm</Tag>
							<Tag field="format" value="35mm">35mm</Tag>
							<Tag field="format" value="dvd">DVD</Tag>
						</Tags>
					</section>,
					<Row className="no-gutters" key={2}>
						<Col sm={7} className="inline-group">
							<label>Image</label>
							<Tags onTagSelect={this.onTagSelect}
								tagsDisabled={filtersDisabled}>
								<Tag field="image" value="bw">B/W</Tag>
								<Tag field="image" value="color">Color</Tag>
								<Tag field="image" value="opt">Opt</Tag>
							</Tags>
						</Col>
						<Col sm={5} className="inline-group">
							<label>Sound</label>
							<Tags onTagSelect={this.onTagSelect}
								tagsDisabled={filtersDisabled}>
								<Tag field="sound" value="sound">Sound</Tag>
								<Tag field="sound" value="silent">Silent</Tag>
							</Tags>
						</Col>
					</Row>,
					<section key={3}>
						<label>Years</label>
						<Tags onTagSelect={this.onTagSelect}
							tagsDisabled={filtersDisabled}>
							<Tag field="years" value="1920s">1920s</Tag>
							<Tag field="years" value="1930s">1930s</Tag>
							<Tag field="years" value="1940s">1940s</Tag>
							<Tag field="years" value="1950s">1950s</Tag>
							<Tag field="years" value="1960s">1960s</Tag>
						</Tags>
						<Tags onTagSelect={this.onTagSelect}
							tagsDisabled={filtersDisabled}>
							<Tag field="years" value="1970s">1970s</Tag>
							<Tag field="years" value="1980s">1980s</Tag>
							<Tag field="years" value="1990s">1990s</Tag>
							<Tag field="years" value="2000s">2000s</Tag>
							<Tag field="years" value="2010s">2010s</Tag>
						</Tags>
					</section>
					]
					: searchLabel === EPHEMERA_SEARCH_LABEL ?
					<section key={1}>
						<label>Type</label>
						<Tags onTagSelect={this.onTagSelect}
							tagsDisabled={filtersDisabled}>
							<Tag field="type" value="videos">Videos</Tag>
							<Tag field="type" value="interviews">Interviews</Tag>
							<Tag field="type" value="printedPieces">Printed Pieces</Tag>
						</Tags>
						<Tags onTagSelect={this.onTagSelect}
							tagsDisabled={filtersDisabled}>
							<Tag field="type" value="writings">Writings</Tag>
							<Tag field="type" value="newsletters">Newsletters</Tag>
							<Tag field="type" value="photos">Photos</Tag>
						</Tags>
					</section>
				: null
			}
			</div>
		];
	}
}

export default SearchFilter;