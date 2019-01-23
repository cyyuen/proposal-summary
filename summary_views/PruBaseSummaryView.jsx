import React from 'react';

export default class PruBaseSummaryView extends React.Component {

	render() {
		return (
			<div>
				{JSON.stringify(this.props, null, 2)}
			</div>
		)
	}
}