import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView'

import {
	Tag
} from 'antd'

import {
	displayAgeYearString
} from './utils'

import {
	INSURANCE_ICON,
	DOLLAR_ICON,
	CLUSTER_ICON
} from '../constants'

export default class EGSP2AccSummaryView extends PruBaseSummaryView {

	renderHighlight() {

	}

	getDetailTableColumns() {
		const columns = [{
			  title: '年期/岁数',
			  dataIndex: 'ANB',
			  key: 'ANB',
			  align: "center",
			  render: (age, record) => {
			  	return displayAgeYearString(age, record.year);
			  }
		}, {
			title: '已投保费',
			  dataIndex: 'accumulatePremiun',
			  key: 'accumulatePremiun',
			  align: "center",
			  render: (number) => {
			  	return <div> {this.toCurrencyFormat(number)} </div>
			  }
		},{
			  title: '账户预期现金价值',
			  dataIndex: 'total',
			  key: 'total',
			  align: "center",
			  render: (number, record) => {

			  	const increase = parseFloat(record.increase).toFixed(2);

			  	if (increase < 1) {
			  		return <div> {this.toCurrencyFormat(number)} <Tag color="red">回本期</Tag> </div>
			  	}

			  	return <div> {this.toCurrencyFormat(number)} <Tag color="blue">{"增长"+ increase +"倍"}</Tag></div>
			  }
		}];

		return columns;
	}

	getDetailTableDataSource() {
		const {
			details
		} = this.props;

		const  { totalPremiun } = this.props.summary;

		const {
			fullDataDisplay
		} = this.props.display;

		if (fullDataDisplay) {
			return details;
		}

		return pickKeyYearDetails(details);
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
				case 61:
				case 81:
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

function pickKeyYearDetails(details) {

	const year10 = details[9];
	const year20 = details[19];
	const year30 = details[21];

	year10.increase = year10.total / year10.accumulatePremiun;
	year20.increase = year20.total / year20.accumulatePremiun;
	year30.increase = year30.total / year30.accumulatePremiun;
	
	const keyYearDetails = [
		year10,
		year20,
		year30
	]

	for (let i = 0, len = details.length; i != len; ++i) {
		switch (details[i].ANB) {
			case 61:
			case 81:
			case 101:
				if (details[i].ANB > year30.ANB) {

					details[i].increase = details[i].total / details[i].accumulatePremiun;

					keyYearDetails.push(details[i]);
				};
				break
		} 
	}

	return keyYearDetails;
}