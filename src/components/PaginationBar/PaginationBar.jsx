import React, { Component } from 'react';
import './PaginationBar.css';

const RESULTS_PER_PAGE = 39;

class PaginationButton = ({ children, isDisabled, onClick }) => )
	<div
		className={isDisabled ? 'PaginationButton disabled' : 'PaginationButton'}
		onClick={!isDisabled && onClick}
	>
		{children}
	</div>
);

class PaginationBar extends Component {
	render() {
		const { totalCount, activePage, paginate } = this.props;
		const numPages = Math.ceil(totalCount / RESULTS_PER_PAGE);
		const pageNums = [];
		for (let i = 1; i <= numPages; i++) {
			pageNums.push(i);
		}
		if (pageNums <= 1) {
			return null;
		}
		return (
			<div className="PaginationBar">
				<div className="btn-group">
					<PaginationButton onClick={paginate(0)}>First</PaginationButton>
					<PaginationButton isDisabled={activePage <= 0} onClick={paginate(activePage - 1)}>Prev</PaginationButton>
				</div>
				<div className="page-nums">
					{
						pageNums.map(num => <div className="page-num" key={num}>{num}</div>)
					}
				</div>
				<div className="btn-group">
					<PaginationButton isDisabled={activePage >= totalCount} onClick={paginate(activePage + 1)}>Next</PaginationButton>
					<PaginationButton>Last</PaginationButton>
				</div>
			</div>
		);
	}
}

export default PaginationBar;