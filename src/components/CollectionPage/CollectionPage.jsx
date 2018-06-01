import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Row } from 'reactstrap';
import './CollectionPage.css';
import CollectionContext from '../../collection-context';

import MainNav from '../MainNav/MainNav';
import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';
import Search from '../Search/Search';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';
import Button from '../Button/Button';

class CollectionPage extends Component {
	constructor(props) {
		super(props);
		this.onViewModeChange = this.onViewModeChange.bind(this);
		this.setViewMode = this.setViewMode.bind(this);
	}

	setSearchText(e) {
		const searchText = e.target.value;
		this.setState({
			searchText
		});
	}

	setViewMode(mode) {
		this.setState({
			viewMode: mode
		});
	}

	state = {
		searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
		searchLabel: 'All',
		searchText: '',
		setSearchText: this.setSearchText.bind(this),
		isCollapsedNav: false,
		viewMode: 'tile',
		setViewMode: this.setViewMode.bind(this),
		onOptionSelect: label => {
			this.setState({
	  		searchLabel: label,
				searchPlaceholder: 'Search ' +
					(label === 'All' ?
						'films, filmmakers, curated programs, ephemera'
						: label.toLowerCase()
					) 
			});
		}
	}

	componentDidMount() {
		const headerHeight = 361;
    window.addEventListener('scroll', (e) => {
      if (window.scrollY >= headerHeight &&
      		!this.state.isCollapsedNav) {
      	this.setState({
      		isCollapsedNav: true
      	});
      } else if (window.scrollY < headerHeight &&
      		this.state.isCollapsedNav) {
      	this.setState({
      		isCollapsedNav: false
      	});
      }
    });
  }

	onViewModeChange(mode) {
		this.setState({
			viewMode: mode
		});
	}

	render() {
		const searchData = [{
			id: 1232,
			itemType: 'film',
			title: 'Dyketactics',
			description: 'Popular lesbian "commercial," 110 images of sensual touching montages in A, B, C, D rolls of "kinaesthetic" editing.',
			tags: ['16mm', '1970s', 'Color', 'Sound'],
			creator: 'Barbara Hammer',
			year: '1974'
		}, {
			id: 1232,
			itemType: 'film',
			title: 'Dyketactics and some very long long long long long long title goes here and here and here and here',
			description: 'Popular lesbian "commercial," 110 images of sensual touching montages in A, B, C, D rolls of "kinaesthetic" editing.',
			tags: ['16mm', '1970s', 'Color', 'Sound', '16mm', '16mm', '16mm', '16mm', '16mm', '16mm'],
			creator: 'Barbara Hammer Barbara Hammer Barbara Hammer Barbara Hammer Barbara Hammer Barbara Hammer',
			year: '1974'
		}, {
			id: 1232,
			itemType: 'filmmaker',
			title: 'Barbara Hammer has a very long name here',
			description: `Barbara Hammer is a visual artist primarily working in film and video. Her work reveals and celebrates marginalized peoples whose stories have not been told. Her cinema is multi-leveled and engages an audience viscerally and intellectually with the goal of activating them to make social change. She has been honored with 5 retrospectives in the last 3 years: The Museum of Modern Art in New York City, Tate Modern in London, Jeu de Paume in Paris, the Toronto International Film Festival and Kunsthalle Oslo in Norway. Her book Hammer! Making Movies Out of Sex and Life was published in 2010 by The Feminist Press at The City University of New York. 
She is most well-known for making the first explicit lesbian film in 1974, Dyketactics, and for her trilogy of documentary film essays on queer history Nitrate Kisses (1992), Tender Fictions (1995), History Lessons, (2000). 
She teaches at The European Graduate School in Saas-Fee, Switzerland. Her work is represented by the gallery KOW in Berlin, Germany. Company (formerly Capricious88) will exhibit her drawings and paintings in a one-woman show in NYC opening September 11, 2015.
Welcome To This House, her new feature documentary on the poet Elizabeth Bishop, was funded by a Guggenheim Fellowship (2013-14) Welcome To This House premieres at The Museum of Fine Art, Boston and The Museum of Modern Art, New York, 2015.
Barbara Hammer lives and works in New York City and Kerhonkson, New York.`,
			avatar: null
		}, {
			id: 1232,
			itemType: 'Curated Program',
			title: 'Between Pop Culture and the Avant-Garde: Little-Seen Thing that has ever seen!',
			description: 'Between Pop Culture and the Avant-Garde: Little-Seen Films by Women from the Collection of Canyon Cinema. Ranging from...',
			photos: [
				'https://placeimg.com/640/480/any',
				'https://placeimg.com/940/480/any',
				'https://placeimg.com/340/480/any',
				'https://placeimg.com/740/480/any',
				'https://placeimg.com/840/480/any',
				'https://placeimg.com/240/480/any',
				'https://placeimg.com/140/480/any',
			],
			filmmakers: [{
				id: 234,
				name: 'Coni Beeson'
			}, {
				id: 234,
				name: 'Dana Plays'
			}, {
				id: 234,
				name: 'Alice Anne Parker Severson'
			}, {
				id: 234,
				name: 'Elizabeth Sherry'
			}, {
				id: 234,
				name: 'Bob Smithy Jonesy'
			}]
		}, {
			id: 1232,
			itemType: 'Ephemera',
			title: 'Michael Wallin Remembered Ephemera Titles have a Maximum of Three Lines Even If It OverFlows to a Fourth Line',
			photos: [],
			tags: ['Printed Pieces'],
			related: [{
				id: 32,
				title: 'Barbara Hammer',
				itemType: 'filmmaker'
			}, {
				id: 64,
				title: 'Michael Wallin',
				itemType: 'filmmaker'
			}, {
				id: 32,
				title: 'Karry Fisher',
				itemType: 'filmmaker'
			}, {
				id: 64,
				title: 'Wes Andersen',
				itemType: 'filmmaker'
			}]
		}]
		const {
			isCollapsedNav
		} = this.state;
		return (
			<CollectionContext.Provider value={this.state}>
			<div className={isCollapsedNav ? 'collapsed-nav active' : 'collapsed-nav'}>
				<MainNav isCollapsed={true} />
				<MainNavFilterBar />
			</div>
			<div className="CollectionPage">
				<header className="search-sort">
					<h1 className="white">Explore the collection</h1>
					<div className="filters">
						<Search id={0} />
						<div className="change-view">
							<label>View:</label>
							
								<ViewModeButtons />
						</div>
					</div>
				</header>
				<div className="section">
					<header className="section-header d-flex">
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
							<SearchCards data={searchData} />
							: null
						}
					</Row>
				</div>
			</div>
			</CollectionContext.Provider>
		);
	}
}

export default withRouter(CollectionPage);
