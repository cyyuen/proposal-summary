import React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView.jsx'

const NEXT_TIMESLOT_REACH_END = "reachTimeslotEnd";

import {
	Tag,
	Timeline,
	Card,
	Statistic, 
	Row, 
	Col, 
	Icon,
	Table,
	Divider
} from 'antd'

import {
	displayAgeYearString
} from './utils.js'

import {
	INSURANCE_ICON,
	DOLLAR_ICON,
	CLUSTER_ICON
} from '../constants.js'

export default class EGSP2WithdrawSummaryView extends PruBaseSummaryView {

	renderHighlight() {

	}

	renderTimeline() {
		const {
			details
		} = this.props;

		const timeslots = this.extractTimeslots(details);

  		return (
    		<Timeline>
      			{timeslots.map((timeslot, index) => {
        			return this.renderTimeslot(timeslot, index);
      			})}
    		</Timeline>
  		)
	}

	extractTimeslots(details) {
		let index = 0;
		let nextTimeslot = this.fetchNextWithdrawTimeslot(details, index);
		let timeslots = [];

		while(nextTimeslot !== NEXT_TIMESLOT_REACH_END) {

			console.log(nextTimeslot);

			timeslots.push(nextTimeslot);

			index = nextTimeslot.nextIndex;

			nextTimeslot = this.fetchNextWithdrawTimeslot(details, index);
		}

		if(index !== details.length) {
			// timeslots.push(this.fetchEndingTimeslot(timeslots, index, details));
		}
	
		return timeslots;
	}

	fetchEndingTimeslot(timeslots, index, data) {

		const endingTimeslotDetails = [];

		var count = 0;
		var skip = 10; 
	
		for (var i = index, len = data.length; i < len; i++) {
		
			if (count % 10 === 0) {
				endingTimeslotDetails.push(data[i]);
			}
		
			count++;
		}

		if ((data.length - 1 - index) % 10 != 0) {
			endingTimeslotDetails.push(data[data.length - 1]);
		}

		return {
			isEndingTimeslot: true,
			details: endingTimeslotDetails
		}
	}

	fetchNextWithdrawTimeslot(data, index) {
		var i = index;

		var startIndex = 0;
		var startANB = 0;
		var endANB = 0;
		var endIndex = 0;
		var totalYears = 0;
		var totalWithdraw = 0;
		var withdrawValueEachYear = 0;

		if (i == data.length) {
			return NEXT_TIMESLOT_REACH_END;
		}

		// fetch next withdraw
		while(data[i].withdrawValue == 0) { 

			if (i == data.length - 1) {
				return NEXT_TIMESLOT_REACH_END;
			}

			i++
		};

		startIndex = i;
		startANB = data[i].ANB;
		endANB = startANB - 1;
		withdrawValueEachYear = data[i].withdrawValue;
		var previousWithdrawValue = -1;
	
		while(data[i] && data[i].withdrawValue != 0) {
			if (previousWithdrawValue != -1 && previousWithdrawValue != data[i].withdrawValue) {
				break;
			}

			previousWithdrawValue = data[i].withdrawValue;
			totalWithdraw += data[i].withdrawValue;
			totalYears++;
			i++;
			endANB++;
		}

		return {
			nextIndex: i,
			totalWithdraw: totalWithdraw,
			startANB: startANB,
			startIndex: startIndex,
			endIndex: i - 1,
			endANB: endANB,
			withdrawValueEachYear: withdrawValueEachYear,
			remainingValue: data[i - 1].remainingValue,
			totalYears: totalYears
		}
	}

	renderTimeslot(timeslot, index) {

		var timeslotItem = null;

		if (timeslot.isEndingTimeslot) {
			return <Timeline.Item>
				<div>
					<Tag color="blue">ANB {timeslot.details[0].ANB}岁开始:</Tag>
					<div style={{"margin-top": "10px"}}>
						
					<Table 
						dataSource={timeslot.details} 
						columns={[{
								  title: '年期/岁数',
								  dataIndex: 'ANB',
								  key: 'ANB',
								  align: "center",
								  render: (age, record) => {
								  	return displayAgeYearString(age, record.year);
								  }
							}, {
								  title: '账户现金价值',
								  dataIndex: 'remainingValue',
								  key: 'remainingValue',
								  align: "center",
								  render: (number, record) => {
								  	return <div> {this.toCurrencyFormat(number)}</div>
								  }
							}, {
								  title: '合计',
								  dataIndex: 'total',
								  key: 'total',
								  align: "center",
								  render: (number, record) => {
								  	return <div> {this.toCurrencyFormat(number)}  </div>
								  }
							}
						]}
						size="middle"
						bordered
						pagination={false}
					/>

					</div>
				</div>
			</Timeline.Item>
		}

		return <Timeline.Item><div> 
				<div>
					<Tag color="blue">ANB {timeslot.startANB}岁 ~ {timeslot.endANB}岁 (共{timeslot.totalYears}年)</Tag>
				</div>
				<div style={{
					"margin-top": "15px"
				}}>
					<Row gutter={16}>
				    <Col span={12}>
				      <Statistic 
				      	title="每年提取" 
				      	value={this.toCurrencyFormat(timeslot.withdrawValueEachYear)}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "25px"
				      	}}
				    />
				    </Col>
				    <Col span={12}>
				      <Statistic 
				      	title={timeslot.totalYears + "年共提取"} 
				      	value={this.toCurrencyFormat(timeslot.withdrawValueEachYear * timeslot.totalYears)}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "25px"
				      	}}
				      />
				    </Col>
				  </Row>
				</div>
				<Divider style={{
					"margin-top": "10px"
				}}></Divider>
				<div style={{
					"font-size": "12px",
    				"color": "rgb(154, 153, 153)",
    				"letter-spacing": "1px",
    				"margin-top": "-20px"
				}}>
					ANB {timeslot.endANB}岁时，账户仍剩余{this.toCurrencyFormat(timeslot.remainingValue)}
				</div>
			</div></Timeline.Item>
	}

	renderTimelineSummary() {
		const {summary} = this.props;

		return <div>

			<Row gutter={16}>
				    <Col span={8}>
				      <Statistic 
				      	title={"累积提取(" + this.toCurrencyFormat(summary.totalWithdraw).split(" ")[1] + ")"} 
				      	value={this.toCurrencyFormat(summary.totalWithdraw).split(" ")[0]}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "25px"
				      	}}
				    />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title={"总价值(" + this.toCurrencyFormat(summary.totalValue).split(" ")[1] + ")"} 
				      	value={this.toCurrencyFormat(summary.totalValue).split(" ")[0]}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "25px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title="总增值"
				      	value={summary.totalValue/summary.totalPremiun * 100}
				      	prefix={<Icon type="arrow-up" />}
				      	precision={2}
            			suffix="%"
				      	valueStyle={{
				      		"color": '#3f8600',
    						"font-size": "25px"
				      	}}
				      />
				    </Col>
				  </Row>
			</div>
	}

	renderSummaryDetails() {
		const {
			details
		} = this.props;

		const highlights = [details[0]];
	
		for (var i = 0, len = details.length; i < len; i++) {

			console.log(details[i]);

			if ((details[i].ANB - 1) % 20 === 0) {
				highlights.push(details[i]);
			}
		}

		return (
			<Table 
						dataSource={highlights} 
						columns={[{
								  title: '年期/岁数',
								  dataIndex: 'ANB',
								  key: 'ANB',
								  align: "center",
								  render: (age, record) => {
								  	return displayAgeYearString(age, record.year);
								  }
							}, {
								  title: '累计提取',
								  dataIndex: 'totalWithdraw',
								  key: 'totalWithdraw',
								  align: "center",
								  render: (number, record) => {
								  	return <div> {this.toCurrencyFormat(number)}</div>
								  }
							}, {
								  title: '账户现金价值',
								  dataIndex: 'remainingValue',
								  key: 'remainingValue',
								  align: "center",
								  render: (number, record) => {
								  	return <div> {this.toCurrencyFormat(number)}</div>
								  }
							}, {
								  title: '合计',
								  dataIndex: 'total',
								  key: 'total',
								  align: "center",
								  render: (number, record) => {
								  	return <div> {this.toCurrencyFormat(number)}  </div>
								  }
							}
						]}
						size="middle"
						bordered
						pagination={false}
					/>
		)
	}

	renderDetails() {
		return (
			<div style={{"margin-top": "30px"}}>
				<div>{this.renderTimelineSummary()}</div>
				<Divider orientation="left">具体数据</Divider>
				<div>{this.renderTimeline()}</div>
				<div>{this.renderSummaryDetails()}</div>
			</div>
		)
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