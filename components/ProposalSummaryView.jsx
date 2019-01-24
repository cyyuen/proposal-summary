import { Input } from 'antd';
import React from 'react';

import EGSP2AccParser from '../parsers/EGSP2AccParser.js'
import EGSP2WithdrawParser from '../parsers/EGSP2WithdrawParser.js'
import MixedCCParser from '../parsers/MixedCCParser.js'
import PLCSParser from '../parsers/PLCSParser.js'
import PLP2Parser from '../parsers/PLP2Parser.js'
import SingleCCParser from '../parsers/SingleCCParser.js'

import EGSP2AccSummaryView from '../summary_views/EGSP2AccSummaryView.jsx'
import EGSP2WithdrawSummaryView from '../summary_views/EGSP2WithdrawSummaryView.jsx'
import MixedCCSummaryView from '../summary_views/MixedCCSummaryView.jsx'
import PLCSSummaryView from '../summary_views/PLCSSummaryView.jsx'
import PLP2SummaryView from '../summary_views/PLP2SummaryView.jsx'
import SingleCCSummaryView from '../summary_views/SingleCCSummaryView.jsx'

const { TextArea } = Input;

export default class ProposalSummaryView extends React.Component {

	render() {

		if (!this.props.proposalData) {
			return (<div></div>)
		}

		const {
			ANB,
			planSelect,
			fxRate,
			proposalName,
			currency,
			plan1,
			plan2,
		} = this.props.proposalData;

		const plan1Data = inputStringToData(plan1);
		let plan2Data = null;

		if (plan2) {
			plan2Data = inputStringToData(plan2);
		}
		
		let parser = null;
		let data = null;
		let view = null;

		switch(planSelect) {
			case "egsp2-acc": {
				parser = new EGSP2AccParser(ANB, plan1Data);
				view = EGSP2AccSummaryView;
				break;
			};
			case "egsp2": {
				parser = new EGSP2WithdrawParser(ANB, plan1Data);
				view = EGSP2WithdrawSummaryView;
				break;
			};
			case "plcs": {
				parser = new PLCSParser(ANB, plan1Data);
				view = PLCSSummaryView;
				break;
			};
			case "plp2": {
				parser = new PLP2Parser(ANB, plan1Data, plan2Data);
				view = PLP2SummaryView;
				break;
			};
			case "cc": {
				if (plan2Data) {
					parser = new MixedCCParser(ANB, plan1Data, plan2Data);
					view = MixedCCSummaryView;
				} else {
					parser = new SingleCCParser(ANB, plan1Data);
					view = SingleCCSummaryView;
				}
				
				break;
			};
			default: {

			}
		}

		let props = parser.parse();

		Object.assign(props, {
			display: {
				proposalName,
				fxRate,
				currency,
				ANB
			}
		});

		return React.createElement(view, props);
	}
}

function inputStringToData(input) {
	var buf = input.split("\n");

	var data = [];

	for (var i = 0, len = buf.length; i != len; i++) {
		data[i] = buf[i].split(' ');
	}

	return data;
}