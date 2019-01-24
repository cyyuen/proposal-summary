import React from 'react';
import SummaryCard from '../components/SummaryCard.jsx';
import { Divider, Table, Timeline, Icon } from 'antd'

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

	toCurrencyFormat(number) {
		const {
			fxRate,
			currency,			
		} = this.props.display;

		return (number * fxRate).toLocaleString() + " " + currency;
	}

	render() {
		const {
			display,
			summary
		} = this.props;

		return (
			<SummaryCard
				{...display}
				{...summary}
			>	
				<Divider style={{marginTop: "-10px"}} /> 
				<div style={{padding: "0px 23px 0px 23px"}}>
					{this.renderHighlight()}
				</div>
				<Divider orientation="left" style={{marginTop: "-35px"}}> 方案关键年份数据 </Divider> 
				<div style={{padding: "0px 23px 40px 23px"}}>
					<Table 
						dataSource={this.getDetailTableDataSource()} 
						columns={this.getDetailTableColumns()}
						size="middle"
						bordered
						pagination={false}
					/>
				</div>
			</SummaryCard>
		)
	}
}