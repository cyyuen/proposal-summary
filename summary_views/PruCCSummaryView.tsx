import * as React from 'react';
import PruBaseSummaryView from './PruBaseSummaryView'
import {PruSummaryProps} from './PruBaseSummaryView'

import {
	displayAgeYearString

} from './utils'

import {
	Tag,
	Avatar,
	Row,
	Col,
	Divider
} from 'antd'

import {PruCCDataset, PruCCDataLine} from "../Dataset"

export interface PruCCSummaryProps extends PruSummaryProps {
	dataset: PruCCDataset
}

export default abstract class PruCCSummaryView extends PruBaseSummaryView<PruCCSummaryProps> {

	getProposalHighlights(): [{ content: any; icon: any; }] {
		throw new Error("Method not implemented.");
	}

	abstract getPlanname():string
	abstract getDiseaseNum(): number
	abstract getClaimNum(): number
	
	renderHighlight() {
		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured
		} = this.props.dataset.summary;

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
			  title: 'A:年期/岁数',
			  dataIndex: 'ANB',
			  key: 'ANB',
			  align: "center",
			  render: (age, record) => {
			  	return displayAgeYearString(age, record.year);
			  }
		}, {
			title: 'B:累计保费',
			  dataIndex: 'accumulatePremiun',
			  key: 'accumulatePremiun',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyNumber(number)}</div>
			}
		},
		{
			  title: 'C:保障金额(有事赔钱)',
			  dataIndex: 'totalInsured',
			  key: 'totalInsured',
			  align: "center",
			  render: (number, record) => {
			  	return <div> {this.toCurrencyNumber(number)}</div>
			}
		}, {
				title: 'D:现金价值(没事理财)',
				dataIndex: 'cashValue',
				key: 'cashValue',
				align: "center",
				render: (number, record: PruCCDataLine) => {
					return <div> {this.toCurrencyNumber(number)} <Tag color="blue">{(record.totalYield * 100).toFixed(2)+"%"}</Tag> </div>
			}
		}];

		return columns;
	}

	renderFooter() {
		return (
			<div>
			<Divider orientation="left">保障运作模式</Divider>

			重大疾病保险运作的模式，简单总结就是"以小钱换大保障，有事赔钱，没事理财"。<br/>
			🎯上表B栏数据是相应年龄时，累计缴纳的保费。<br/>
			🎯C栏数据是相应年龄时，客户遇到重大疾病或身故时，得到的理赔。<br/>
			🎯D栏数据是相应年龄时，客户选择退保时，可以拿回到手的钱。
			
    		</div>
		)
	}

	getDetailTableDataSource(): PruCCDataLine[] {
		const dataset = this.props.dataset;

		return dataset.getDataLinesInEvery10Years();
	}
}