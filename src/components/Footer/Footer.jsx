import React from 'react';
import './Footer.css';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


const Footer = () => {
	return (
		<Row className="Footer">
			<Col sm="6">
				<ul className="links">
					<li><Link to="/catalog">Catalog</Link></li>
					<li><Link to="/catalog">News</Link></li>
					<li><Link to="/catalog">About CC50</Link></li>
					<li><Link to="/catalog">Writings & Essays</Link></li>
					<li><Link to="/catalog">Tour</Link></li>
					<li><Link to="/catalog">Press</Link></li>
					<li><Link to="/catalog">Events</Link></li>
					<li><Link to="/catalog">Canyon Cinema</Link></li>
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
								<div>+1 415.626.2255</div>
								<div>www.canyoncinema.com</div>
							</section>
							<section className="social">
								Facebook, Twitter, Tumblr
							</section>
						</div>
					</Col>
					<Col sm="6">
						<div className="general">
							<section>
								<div><strong>General & Title Inquiries</strong></div>
								<div><Link to="mailto:info@canyoncinema.com">info(at)canyoncinema.com</Link></div>
							</section>
							<section>
								<div><strong>Hours</strong></div>
								<div>Monday - Friday, 9 - 5</div>
							</section>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Footer;