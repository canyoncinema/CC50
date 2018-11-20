import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const StyledFooterIsLoading = styled.div`
	background-color: #231f20;
  background-color: var(--black);
  padding: 125px 70px;
  color: #ffffff36;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  left: 0;
  right: 0;
  font-size: 1.5rem;
  text-align: center
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

export default FooterIsLoading;