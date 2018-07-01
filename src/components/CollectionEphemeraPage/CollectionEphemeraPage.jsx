import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import PhotoFill from '../PhotoFill/PhotoFill';
import RichText from '../RichText/RichText';
import Filmmakers from '../Filmmakers/Filmmakers';
import ReactMarkdown from 'react-markdown';
import './CollectionEphemeraPage.css';

const mapStateToProps = state => ({
	item: state.item.data,
	isLoading: state.item.isLoading
});

class CollectionEphemeraPage extends Component {
	render() {
		const { isLoading, item } = this.props;
		if (isLoading) {
			return <LoadingMessage />;
		}

		return (
			<div className="CollectionEphemeraPage">
				<ScrollToTopOnMount />
				<section>
					<PhotoFill
						src={item.photoSrc && item.photoSrc.original}
						width="100%"
						height="442px"
					/>
					{
						item.ephemeraDescription ?
						<RichText>
							<ReactMarkdown source={item.ephemeraDescription} />
						</RichText>
						: null
					}
					{
						item.videoUrl ?
						[
						<iframe src="https://player.vimeo.com/video/250910788" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>,
						<p><a href="https://vimeo.com/250910788">Canyon Cinema 50 - Interview with Abigail Child (April 11, 2017)</a> from <a href="https://vimeo.com/user19095105">Canyon Cinema Foundation</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
						]
						: null
					}
					</section>
					{
						item.relatedFilms && item.relatedFilms.length ?
						<section>
							<h3>Related Films</h3>
						</section>
						: null
					}
					{
						item.relatedFilmmakers && item.relatedFilmmakers.length ?
						<section>
							<h3>Related Filmmakers</h3>
							<Filmmakers data={item.relatedFilmmakers} />
						</section>
						: null
					}
			</div>
		);
	}
}

export default CollectionItemPage(connect(mapStateToProps)(CollectionEphemeraPage));
