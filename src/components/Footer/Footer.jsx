import React from 'react';
import './Footer.css';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


const Footer = ({className}) => {
	return (
		<Row className={['Footer', className].join(' ')}>
			<Col sm="6">
				<ul className="links">
					<li><Link target="_blank" to="//www.canyoncinema.com/catalog">Catalog</Link></li>
					<li><Link to="/news">News</Link></li>
					<li><Link to="/about">About CC50</Link></li>
					<li><Link to="/writings-and-essays">Writings & Essays</Link></li>
					<li><Link to="/tour">Tour</Link></li>
					<li><Link to="/press">Press</Link></li>
					<li><Link to="/events">Events</Link></li>
					<li><Link target="_blank" to="//www.canyoncinema.com">Canyon Cinema</Link></li>
				</ul>
			</Col>
			<Col sm="6">
				<Row>
					<Col sm="6">
						<div className="bio">
							<section className="contact">
								<div><strong>Canyon Cinema Foundation</strong></div>
								<div>1777 Yosemite Ave Suite #210</div>
								<div>San Francisco, CA 94124</div>
								<div><Link to="tel:1-415-626-2255">+1 415.626.2255</Link></div>
								<div><Link target="_blank" to="//www.canyoncinema.com">www.canyoncinema.com</Link></div>
							</section>
							<section className="social">
								<Link target="_blank" to="//www.facebook.com/canyoncinema">Facebook</Link>, 
								<Link target="_blank" to="//www.canyon-cinema.tumblr.com">Twitter</Link>, 
								<Link target="_blank" to="//www.twitter.com/canyoncinema">Tumblr</Link>
							</section>
						</div>
					</Col>
					<Col sm="6">
						<div className="general">
							<section>
								<div><strong>General & Title Inquiries</strong></div>
								<div><Link to="mailto:info@canyoncinema.com">info(at)canyoncinema.com</Link></div>
							</section>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Footer;