import React, { Component } from 'react';
import { Row, Col, Form, FormGroup } from 'reactstrap';
import './Subscribe.css';

class Subscribe extends Component {
	state = {
		email: ''
	}

	onChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		});
	}

	render() {
		return (
			<div className="Subscribe">
				<Form
					method="post"
					target="_blank"
					action={`https://canyoncinema.us3.list-manage.com/subscribe/post?u=1a9b415df12c677d769b03069&amp;id=61bff7fcfc&MERGE0=${this.state.email}`}>
					<Row className="no-gutters">
						<Col xs={7}>
							<input type="text"
								placeholder="Your email"
								value={this.state.email}
								onChange={this.onChangeEmail}
							/>
						</Col>
						<Col xs={5}>
							<input className="ml-auto submit" type="submit" value="SUBSCRIBE" />
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Subscribe;