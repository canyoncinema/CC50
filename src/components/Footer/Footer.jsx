import React from 'react';
import './Footer.css';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Support from '../Support/Support';
import Subscribe from '../Subscribe/Subscribe';
import IconTumblr from '../Icon/IconTumblr';
import IconFacebook from '../Icon/IconFacebook';
import IconTwitter from '../Icon/IconTwitter';

const mapStateToProps = state => ({
  isLoadingFooter: state.items.isLoading ||
    state.item.isLoading ||
    state.searchedItems.isLoading || false || true
    // whatever isLoading states we want to hide the header for
    // + display "Loading" indicator where footer is, instead
});

const Footer = ({className}) => {
	return (
		<div className={['Footer',
			className,
		].join(' ')}>
			<div className="container">
				<Row className="no-gutters">
					<Col md={6}>
						<ul className="links">
							<li><Link target="_blank" to="//www.canyoncinema.com/catalog">Catalog</Link></li>
							<li><Link to="/news">News</Link></li>
							<li><Link to="/about">About CC50</Link></li>
							<li><Link to="/collection/ephemera">Writings & Essays</Link></li>
							<li><Link to="/tour">Tour</Link></li>
							<li><Link to="/press">Press</Link></li>
							<li><Link to="/events">Events</Link></li>
							<li><Link target="_blank" to="//www.canyoncinema.com">Canyon Cinema</Link></li>
						</ul>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={6}>
								<div className="bio">
									<section className="contact">
										<div><strong>Canyon Cinema Foundation</strong></div>
										<div>1777 Yosemite Ave Suite #210</div>
										<div>San Francisco, CA 94124</div>
										<div><Link to="tel:1-415-626-2255">+1 415.626.2255</Link></div>
										<div><Link target="_blank" to="//www.canyoncinema.com">www.canyoncinema.com</Link></div>
									</section>
									<section className="social">
										<Link target="_blank" to="//www.facebook.com/canyoncinema">
											<IconFacebook />
										</Link>
										<Link target="_blank" to="//www.canyon-cinema.tumblr.com">
											<IconTumblr />
										</Link>
										<Link target="_blank" to="//www.twitter.com/canyoncinema">
											<IconTwitter />
										</Link>
									</section>
								</div>
							</Col>
							<Col md={6}>
								<div className="general">
									<section>
										<div><strong>General & Title Inquiries</strong></div>
										<div><a href="mailto:info@canyoncinema.com">info(at)canyoncinema.com</a></div>
									</section>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className="no-gutters">
					<Col md={6} md={{ offset: 6 }}>
						<label className="subscribe-label">Subscribe and stay up to date on news and events</label>
					</Col>
				</Row>
				<Row className="no-gutters">
					<Col md={6}>
						<Support />
					</Col>
					<Col md={6}>
						<Subscribe />
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(Footer);