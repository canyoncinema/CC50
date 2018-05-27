import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './CollectionPage.css';

import Search from '../Search/Search';
import SearchCard from '../SearchCard/SearchCard';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';
import Button from '../Button/Button';

class CollectionPage extends Component {
	state = {
		searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera'
	}
	render() {
		const searchData = [{
			itemType: 'film',
			title: 'Dyketactics',
			description: 'Popular lesbian "commercial," 110 images of sensual touching montages in A, B, C, D rolls of "kinaesthetic" editing.',
			tags: ['16mm', '1970s', 'Color', 'Sound'],
			creator: 'Barbara Hammer',
			year: '1974'
		}, {
			itemType: 'filmmaker',
			title: 'Barbara Hammer',
			description: `Barbara Hammer is a visual artist primarily working in film and video. Her work reveals and celebrates marginalized peoples whose stories have not been told. Her cinema is multi-leveled and engages an audience viscerally and intellectually with the goal of activating them to make social change. She has been honored with 5 retrospectives in the last 3 years: The Museum of Modern Art in New York City, Tate Modern in London, Jeu de Paume in Paris, the Toronto International Film Festival and Kunsthalle Oslo in Norway. Her book Hammer! Making Movies Out of Sex and Life was published in 2010 by The Feminist Press at The City University of New York. 
She is most well-known for making the first explicit lesbian film in 1974, Dyketactics, and for her trilogy of documentary film essays on queer history Nitrate Kisses (1992), Tender Fictions (1995), History Lessons, (2000). 
She teaches at The European Graduate School in Saas-Fee, Switzerland. Her work is represented by the gallery KOW in Berlin, Germany. Company (formerly Capricious88) will exhibit her drawings and paintings in a one-woman show in NYC opening September 11, 2015.
Welcome To This House, her new feature documentary on the poet Elizabeth Bishop, was funded by a Guggenheim Fellowship (2013-14) Welcome To This House premieres at The Museum of Fine Art, Boston and The Museum of Modern Art, New York, 2015.
Barbara Hammer lives and works in New York City and Kerhonkson, New York.`,
			avatar: null
		}, {
			itemType: 'Curated Program',
			title: 'Between Pop Culture and the Avant-Garde: Little-Seen Thing that has ever seen!',
			description: 'Between Pop Culture and the Avant-Garde: Little-Seen Films by Women from the Collection of Canyon Cinema. Ranging from...',
			photos: [],
			filmmakers: [{
				id: 234,
				name: 'Coni Beeson'
			}, {
				name: 'Dana Plays'
			}, {
				name: 'Alice Anne Parker Severson'
			}, {
				name: 'Elizabeth Sherry'
			}]
		}, {
			itemType: 'Ephemera',
			title: 'Michael Wallin Remembered Ephemera Titles have a Maximum of Three Lines',
			photos: [],
			tags: ['Printed Pieces'],
			related: [{
				id: 32,
				name: 'Barbara Hammer'
			}, {
				id: 64,
				name: 'Michael Wallin'
			}]
		}]

		return (
			<div className="CollectionPage">
				<header className="search-sort">
					<h1 className="white">Explore the collection</h1>
					<div className="filters">
						<Search />
						<div className="change-view">
							<label>View:</label><ViewModeButtons />
						</div>
					</div>
				</header>
				<section>
					<header className="d-flex">
						<div>
							<h3>Recently Added Films</h3>
							<p>New acquisitions to the Canyon Cinema collection</p>
						</div>
            <Button className="ml-auto" size="default">
              See all films
            </Button>
					</header>
					<Row>
						{
							searchData && searchData.length ?
							searchData.map((data, i) => {
							return (
								<Col sm="4">
									<SearchCard {...data} />
								</Col>
								);
							})
							: null
						}
					</Row>
				</section>
			</div>
		);
	}
}

export default CollectionPage;
