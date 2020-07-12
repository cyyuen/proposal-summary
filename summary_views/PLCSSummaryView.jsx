import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView'

export default class EGSP2AccSummaryView extends PruBaseSummaryView {

	render() {
		return (
			<div>
				{JSON.stringify(this.props, null, 2)}
			</div>
		)
	}
}