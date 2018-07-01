import React from 'react';

import { Link } from 'react-router-dom';

const EphemeraMiniCard = ({ shortIdentifier, termDisplayName }) =>
	<div>Ephemera: <Link to={`/collection/ephemera/${shortIdentifier}`}>
		{termDisplayName}
	</Link>
	</div>

// import { Row, Col } from 'reactstrap';
// import './EphemeraMiniCard.css';
// import PhotoFill from "../PhotoFill/PhotoFill";

// class EphemeraMiniCard extends React.Component {
// 		// constructor(props) {
// 		// 	super(props);
// 		// }
// >>>>>>> Stashed changes

// const EphemeraMiniCard = ({viewMode, src, className, width, children, height}) => {
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
									// background-color="ffffff"
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
// const EphemeraMiniCard = ({viewMode, src, className, width, children, height})

}//;

// ReactDOM.render(
//   element,
//   document.getElementById('root'),
// )

export default EphemeraMiniCard;