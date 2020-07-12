import { Input } from 'antd';
import * as React from 'react';

import EGSP2AccParser from '../parsers/EGSP2AccParser'
import EGSP2WithdrawParser from '../parsers/EGSP2WithdrawParser'
import MixedCCParser from '../parsers/MixedCCParser'
import PLCSParser from '../parsers/PLCSParser'
import PLP2Parser from '../parsers/PLP2Parser'
import SingleCCParser from '../parsers/SingleCCParser'

import EGSP2AccSummaryView from '../summary_views/EGSP2AccSummaryView'
import EGSP2WithdrawSummaryView from '../summary_views/EGSP2WithdrawSummaryView'
import PLCSSummaryView from '../summary_views/PLCSSummaryView'
import PLP2SummaryView from '../summary_views/PLP2SummaryView'
import PruCCSummaryView from '../summary_views/PruCCSummaryView'

import CIPSummaryView from '../summary_views/CIPSummaryView'
import CIR2SummaryView from '../summary_views/CIR2SummaryView'
import CIESummaryView from '../summary_views/CIESummaryView'
import CIE2SummaryView from '../summary_views/CIE2SummaryView'
import CIM2SummaryView from '../summary_views/CIM2SummaryView'

import CIExCIM2SummaryView from '../summary_views/CIExCIM2SummaryView'
import CIR2xCIESummaryView from '../summary_views/CIR2xCIESummaryView'
import CIPxCIESummaryView from '../summary_views/CIPxCIESummaryView'

const { TextArea } = Input;

import {ProposalInputData} from "./PruProposalApp"

export interface PruPlanDisplaySetting {
	proposalName,
	fxRate,
	currency,
	ANB,
	fullDataDisplay
}

export default class ProposalSummaryView extends React.Component<ProposalInputData> {

	render() {

		console.log(this.props.proposalData);

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
			ct2Assured,
			ct2Premiun,
			ct2PaymentPeriod,
			fullDataDisplay
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
				parser = new PLP2Parser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = PLP2SummaryView;
				break;
			};
			case "cip": {
				parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIPSummaryView;
				
				break;
			};
			case "cir2": {
				parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIR2SummaryView;
				
				break;
			};
			case "cie": {
				parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIESummaryView;

				break;
			};
			case "cie2": {
				parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIE2SummaryView;

				break;
			};
			case "cim2": {
				parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIM2SummaryView;
				
				break;
			};
			case "cie+cim2": {
				parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIExCIM2SummaryView;
				
				break;
			};
			case "cir2+cie": {
				parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIR2xCIESummaryView;

				break;
			};
			case "cip+cie": {
				parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
				view = CIPxCIESummaryView;

				break;
			};
			default: {

			}
		}

		let props = parser.parse();

		return React.createElement(view, {
			dataset: props,
			display: {
				proposalName,
				fxRate,
				currency,
				ANB,
				fullDataDisplay
			}
		});
	}
}

function inputStringToData(input:string) {

	var buf = input.split("\n");

	var data = [];

	for (var i = 0, len = buf.length; i != len; i++) {
		data[i] = buf[i].split(' ');
	}

	return data;
}