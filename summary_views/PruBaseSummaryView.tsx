import * as React from 'react';
import SummaryCard from '../components/SummaryCard';
import { Divider, Table, Timeline, Icon, Button, Card, Input } from 'antd'

const {
	TextArea
} = Input;

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const WAN = 10000
const MILLION = 1000000
const YI = 100000000

const CARD_ID = "summary-card-id";

import {PruPlanDataset} from "../Dataset"

import {PruPlanDisplaySetting} from "../components/ProposalSummaryViewContainer"

export interface PruSummaryProps {
	dataset: PruPlanDataset
	display: PruPlanDisplaySetting
}

export default abstract class PruBaseSummaryView<T extends PruSummaryProps = PruSummaryProps> extends React.Component<T> {

	/**
	 to be overrided by subclasses
	*/
	renderHighlight() {

		const highlights = this.getProposalHighlights();

		const timelineItems = [];

		for (let i = 0, len = highlights.length; i != len; ++i) {
			let timelineItem = null;
			let highlight = highlights[i];

			if (highlight.icon) {
				timelineItem = (<Timeline.Item dot={<Icon type={highlight.icon} />} > {highlight.content} </Timeline.Item>)
			} else {
				timelineItem = (<Timeline.Item> {highlight.content} </Timeline.Item>)
			}

			timelineItems.push(timelineItem);
		}

		return (
 			<Timeline>
    			{timelineItems}
  			</Timeline>
		)
	}

	createHighlight(content: any, icon: any) {
		return {
			content,
			icon
		}
	}

	/**
	to be overrided by subclasses

	@return [{
		content: xxxx,
		icon: xxxx
	}]
	*/
	abstract getProposalHighlights(): [{content: any, icon: any}]

	abstract getDetailTableColumns() : any[]

	abstract getDetailTableDataSource(): any[]

	/**
	 * Helper functions
	 */
	getCurrency() {
		return this.props.display.currency;
	}

	toCurrencyFormat(number: number) {
		const {
			currency,
		} = this.props.display;

		return this.toCurrencyNumber(number) + " " + currency;
	}

	toCurrencyNumber(number: number) {
		const {
			fxRate,
		} = this.props.display;

		const total = number * fxRate;

		if (total >= YI) {
			return Math.ceil(total / YI).toLocaleString() + "亿"
		} else if (total >= MILLION) {
			return Math.ceil(total / WAN).toLocaleString() + "万"
		}

		return Math.ceil(total).toLocaleString();
	}


	getDetailByANB(ANB: number) {
		const details = this.props.dataset.details;

		for (let index = 0; index < details.length; index++) {
			const detail = details[index];
			
			if (detail.ANB === ANB) {
				return detail;
			}
		}

		return null;
	}

	getDetailByYear(year: number) {
		const details = this.props.dataset.details;

		for (let index = 0; index < details.length; index++) {
			const detail = details[index];
			
			if (detail.year === year) {
				return detail;
			}
		}

		return null;
	}

	downloadSummaryCard = () => {

		var summary = document.getElementById(CARD_ID);

		console.log(summary);

		const {
			proposalName
		} = this.props.display;

		domtoimage.toBlob(summary)
    		.then(function (blob: any) {
    			return saveAs(blob, proposalName + ".png");
    		})
    		.catch(function (error: any) {
        		console.error('oops, something went wrong!', error);
    		});
	}

	renderScript() {
		const scriptTxt = this.getScript();

		console.log("script");
		console.log(scriptTxt);

		return scriptTxt.split("\n").map((item, i) => {
			return <div id={"script"+i}> {item} </div>
		});
	}

	getScript() {
		return "Script is coming soon..."
	}

	renderDetails() {
		return (

					<Table
						dataSource={this.getDetailTableDataSource()}
						columns={this.getDetailTableColumns()}
						size="middle"
						bordered
						pagination={false}
					/>

		)
	}

	renderFooter() {
		return (
			<div></div>
		)
	}

	render() {

		const {
			display,
			dataset
		} = this.props;

		return (
			<div>
			<SummaryCard
				cardID = {CARD_ID}
				{...display}
				{...dataset.summary}
			>
				<div style={{padding: "0px 23px 0px 23px"}}>
					{this.renderHighlight()}
				</div>

				<div style={{padding: "0px 23px 40px 23px"}}>
					{this.renderDetails()}
				</div>

				<div style={{padding: "0px 23px 40px 23px"}}>
					{this.renderFooter()}
				</div>

			</SummaryCard>
			<div style={{textAlign: "center", marginTop: "20px"}}>
				<Button onClick={this.downloadSummaryCard}> Download Image </Button>
			</div>
			<div style={{marginTop: "20px", marginLeft: "auto", marginRight: "auto"}}>
				<Card title="讲解话术" bordered={true} style={{ width: 500 }}>
				<div>
					{this.renderScript()}
				</div>
				</Card>
			</div>
			</div>
		)
	}
}
