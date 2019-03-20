import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView.jsx'

import {
	displayAgeYearString
} from './utils.js'

import {
	Tag,
	Avatar,
	Row,
	Col
} from 'antd'

export default class SingleCCSummaryView extends PruBaseSummaryView {

	/**
	@override
	*/
	getPlanname() {

	}

	renderHighlight() {

		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured
		} = this.props.summary;

		return (
			<Row align="middle" style={{padding: "15px 0px 25px 0px"}}>
				<Col style={{textAlign: "center"}} span={6}>
					<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={70}>{this.getPlanname()}</Avatar>
				</Col>
				<Col style={{textAlign: "left", fontSize: "15px"}} span={18}> 
					<div>涵盖{this.getDiseaseNum()}种病况，最多理赔{this.getClaimNum()}次 </div>
					<div>终身重疾保额{this.toCurrencyFormat(basicInsured)}</div>
					<div>前{totalFreeInsuredYears}赠送的重疾保额{this.toCurrencyFormat(freeInsured)}</div>
					<div>第一年起始重疾保额<strong>{this.toCurrencyFormat(basicInsured + freeInsured)}</strong></div>
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
			  render: (age, record) => {
			  	return displayAgeYearString(age, record.year);
			  }
		}, {
			  title: '保障金额(有事赔钱)',
			  dataIndex: 'totalInsured',
			  key: 'totalInsured',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyFormat(number)}</div>
			}
		}, {
				title: '现金价值(没事理财)',
				dataIndex: 'cashValue',
				key: 'cashValue',
				align: "center",
				render: (number, record) => {
					return <div> {this.toCurrencyFormat(number)} <Tag color="blue">{parseFloat(record.cashValueGearing * 100).toFixed(2)+"%"}</Tag> </div>
			}
		}];

		return columns;
	}

	getDetailTableDataSource() {
		const {
			details
		} = this.props;

		const  { totalPremiun } = this.props.summary;

		const year1 = details[0];
		const year11 = details[10];
		const year20 = details[19];
		const year25 = details[20];


		attachGearing(year1);
		attachGearing(year11);
		attachGearing(year20);
		attachGearing(year25);

		const keyYearDetails = [
			year1,
			year11,
			year20,
			year25
		];

		for (let i = 0, len = details.length; i != len; ++i) {
			switch (details[i].ANB) {
				case 66:
				case 86:
				case 101:
					if (details[i].ANB > year25.ANB) {
						attachGearing(details[i]);
						keyYearDetails.push(details[i]);
					};
					break
			} 
		}

		return keyYearDetails;
	}
}

function attachGearing(detail) {
	detail.cashValueGearing = detail.cashValue / detail.accumulatePremiun;
	detail.totalInsuredGearing = detail.totalInsured / detail.accumulatePremiun;
}