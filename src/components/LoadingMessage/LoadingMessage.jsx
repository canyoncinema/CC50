import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import './LoadingMessage.css';

const StyledFooterIsLoading = styled.div`
	color: var(--black);
  padding: 70px;
  -webkit-font-smoothing: antialiased;
  font-size: 1.5rem;
  text-align: center;
`;

const FooterIsLoading = () => {
	return (
		<StyledFooterIsLoading className="FooterIsLoading">
			<div className="container">
				<Row className="no-gutters">
					<Col md={12}>
						Loading more...
					</Col>
				</Row>
			</div>
		</StyledFooterIsLoading>
	);
};

const StyledScreen = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 9999;
	background-color: var(--offwhite);
	background-color: #f6f5ec;
	font-size: 1.5rem;
	text-align: center;
`;

const ScreenIsLoading = () => {
	return (
		<StyledScreen>
			<div className="list-center-wrapper">
				<div>
					Loading...
				</div>
			</div>
		</StyledScreen>
	);
}

const LoadingMessage = ({ isBottom, isFullWidth }) => {
	if (isBottom) {
		return <FooterIsLoading />;
	}
	if (isFullWidth) {
		return <ScreenIsLoading />;
	}
	return <span className="LoadingMessage">Loading...</span>;
}

export default LoadingMessage;
