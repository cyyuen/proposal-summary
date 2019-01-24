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

	getDetailTableColumns() {
		const columns = [{
			  title: 'ANB',
			  dataIndex: 'ANB',
			  key: 'ANB',
			}, {
			  title: '累计保费',
			  dataIndex: 'accumulatePremiun',
			  key: 'accumulatePremiun',
			  render: number => { return this.toCurrencyFormat(number) }
			}, {
			  title: '退保价值',
			  dataIndex: 'total',
			  key: 'total',
			  render: number => { return this.toCurrencyFormat(number) }
		}];

		return columns;
	}

	getDetailTableDataSource() {
		const {
			details
		} = this.props;

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
				<span>到ANB {highlightDetail.ANB}岁，增值到{this.toCurrencyFormat(highlightDetail.total)} <Tag color="blue">{parseFloat(highlightDetail.total/totalPremiun).toFixed(2)+"%"}</Tag> </span>
			))
		}

		return highlights;
	}
}

function pickKeyYearDetails(details) {

	const year10 = details[9];
	const year20 = details[19];
	const year30 = details[21];
	
	const keyYearDetails = [
		year10,
		year20,
		year30
	]

	for (let i = 0, len = details.length; i != len; ++i) {
		switch (details[i].ANB) {
			case 66:
			case 76:
			case 86:
			case 96:
			case 101:
				if (details[i].ANB > year30.ANB) {
					keyYearDetails.push(details[i]);
				};
				break
		} 
	}

	return keyYearDetails;
}