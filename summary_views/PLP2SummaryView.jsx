import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView'

import {
	Tag,
	Avatar,
	Row,
	Col
} from 'antd'

import {
	INSURANCE_ICON,
	DOLLAR_ICON,
	CLUSTER_ICON
} from '../constants'

export default class PLP2SummaryView extends PruBaseSummaryView {

	renderHighlight() {

		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured,
			ct2Assured,
			ct2Premiun,
			ct2PaymentPeriod,
		} = this.props.summary;

		return (
			<Row align="middle" style={{padding: "15px 0px 25px 0px"}}>
				<Col style={{textAlign: "center"}} span={6}>
					<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={70}>PLP2</Avatar>
				</Col>
				<Col style={{textAlign: "left", fontSize: "15px"}} span={18}>
					<div>基本人寿保额{this.toCurrencyFormat(basicInsured)}</div>
					<div>前20年赠送的100%人寿保额{this.toCurrencyFormat(freeInsured)}</div>
					<div>前21年起每年递减10%</div>
					{ct2Assured != 0 &&
						<div>附加<strong>{this.toCurrencyFormat(ct2Assured)}的{ct2PaymentPeriod}年定期人寿 (每年{this.toCurrencyFormat(ct2Premiun)})</strong></div>
					}
					<div>第一年起始人寿保额<strong>{this.toCurrencyFormat(basicInsured + freeInsured + ct2Assured)}</strong></div>
				</Col>
			</Row>
		)
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
			  title: '保额(理赔)',
			  dataIndex: 'assured',
			  key: 'assured',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyFormat(number)} </div>
			  }
		}, {
			  title: '现金价值(退保)',
			  dataIndex: 'cashValue',
			  key: 'cashValue',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyFormat(number)} </div>
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
	const year25 = details[24];
	const year30 = details[29];

	const keyYearDetails = [
		year10,
		year20,
		year25,
		year30
	]

	for (let i = 0, len = details.length; i != len; ++i) {
		switch (details[i].ANB) {
			case 61:
			case 71:
			case 81:
			case 91:
			case 101:
				if (details[i].ANB > year30.ANB) {
					keyYearDetails.push(details[i]);
				};
				break
		} 
	}

	return keyYearDetails;
}