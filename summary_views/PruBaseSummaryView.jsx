import React from 'react';
import SummaryCard from '../components/SummaryCard.jsx';
import { Divider, Table, Timeline, Icon, Button } from 'antd'

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const WAN = 10000
const MILLION = 1000000
const YI = 100000000

const CARD_ID = "summary-card-id";

export default class PruBaseSummaryView extends React.Component {

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

	createHighlight(content, icon) {
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
	getProposalHighlights() {

	}

	getDetailTableColumns() {

	}

	getDetailTableDataSource() {

	}

	getCurrency() {
		return this.props.display.currency;
	}

	toCurrencyFormat(number) {
		const {
			currency,			
		} = this.props.display;

		return this.toCurrencyNumber(number) + " " + currency;
	}

	toCurrencyNumber(number) {
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

	downloadSummaryCard = () => {

		var summary = document.getElementById(CARD_ID);

		console.log(summary);

		const {
			proposalName
		} = this.props.display;

		domtoimage.toBlob(summary)
    		.then(function (blob) {
    			return saveAs(blob, proposalName + ".png");
    		})
    		.catch(function (error) {
        		console.error('oops, something went wrong!', error);
    		});
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
			summary
		} = this.props;

		return (
			<div>
			<SummaryCard
				cardID = {CARD_ID}
				{...display}
				{...summary}
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
			<div style={{textAlign: "center", marginTop: "20px"}}><Button onClick={this.downloadSummaryCard}> Download Image </Button></div>
			</div>
		)
	}
}