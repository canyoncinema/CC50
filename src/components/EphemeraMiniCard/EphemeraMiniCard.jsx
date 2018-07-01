import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PhotoFill from "../PhotoFill/PhotoFill";
import './EphemeraMiniCard.css';

import { Link } from 'react-router-dom';

class EphemeraMiniCard extends Component {
	render() {
		const children = this.props.children;
		const photos = this.props.photos; //&& photos.length;
		return (
			<div className="EphemeraMiniCard shadow-on-hover grid">
				{
				<Row>
					<div class="col-sm-3">
						<div class="no-gutters">
							<p>
								<PhotoFill
									viewMode="grid"
									max-width="100%"
									width="150px"
									height="150px"
									src="https://placeimg.com/640/480/any"/>
								{children}
							</p>
							<div class="no-gutters content">
								<p>photo info</p>
							</div>
						</div>
					</div>
				</Row>	
				}
			</div>
		);
	}
}

export default EphemeraMiniCard;