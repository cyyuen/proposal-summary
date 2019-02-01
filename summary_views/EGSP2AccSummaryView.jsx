import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView.jsx'

import {
	Tag
} from 'antd'

import {
	INSURANCE_ICON,
	DOLLAR_ICON,
	CLUSTER_ICON
} from '../constants.js'

export default class EGSP2AccSummaryView extends PruBaseSummaryView {

	renderHighlight() {

	}

	getDetailTableColumns() {
		const columns = [{
			  title: '年期/岁数',
			  dataIndex: 'ANB',
			  key: 'ANB',
			  align: "center",
			  render: (number, record) => {
			  	if (record.year === -1) {
			  		return number + "岁";
			  	}

			  	return record.year + "年/" + number + "岁"
			  }
		}, {
			  title: '账户预期现金价值',
			  dataIndex: 'total',
			  key: 'total',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyFormat(number)} <Tag color="blue">{"增长" + parseFloat(record.increase).toFixed(2)+"倍"}</Tag> </div>
			  }
		}];

		return columns;
	}

	getDetailTableDataSource() {
		const {
			details
		} = this.props;

		const  { totalPremiun } = this.props.summary;

		return pickKeyYearDetails(details, totalPremiun);
	}

	getProposalHighlights() {

		const {
			details
		} = this.props;

		const highlightDetails = [];
		const  { totalPremiun } = this.props.summary; 
		const year20 = details[19];

		highlightDetails.push(year20);
	
		for (let i = 0, len = details.length; i != len; ++i) {

			switch (details[i].ANB) {
				case 66:
				case 86:
				case 101:
					if (details[i].ANB > year20.ANB) {
						highlightDetails.push(details[i]);
					};
				break
			} 
		}

		const highlights = [];

		for (let i = 0, len = highlightDetails.length; i != len; ++i) {

			const highlightDetail = highlightDetails[i];

			highlights.push(this.createHighlight(
				<span>到ANB {highlightDetail.ANB}岁，增值到{this.toCurrencyFormat(highlightDetail.total)}  </span>
			))
		}

		return highlights;
	}
}

function pickKeyYearDetails(details, totalPremiun) {

	const year10 = details[9];
	const year20 = details[19];
	const year30 = details[21];

	year10.increase = year10.total / totalPremiun;
	year20.increase = year20.total / totalPremiun;
	year30.increase = year30.total / totalPremiun;
	
	const keyYearDetails = [
		year10,
		year20,
		year30
	]

	for (let i = 0, len = details.length; i != len; ++i) {
		switch (details[i].ANB) {
			case 66:
			case 86:
			case 101:
				if (details[i].ANB > year30.ANB) {

					details[i].increase = details[i].total / totalPremiun;

					keyYearDetails.push(details[i]);
				};
				break
		} 
	}

	return keyYearDetails;
}