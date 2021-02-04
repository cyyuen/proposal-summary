import { Input } from 'antd';
import * as React from 'react';

const { TextArea } = Input;

import {ProposalInputData} from "./PruProposalApp"
import PruParser from '../parsers/PruParser';

export interface PruPlanDisplaySetting {
	proposalName: string,
	fxRate: number,
	currency: string,
	ANB: string,
	fullDataDisplay: boolean
}

import {config as summaryViewConfig} from "./summaryView.config"

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

		let displayProps = {
			proposalName,
			fxRate,
			currency,
			ANB,
			fullDataDisplay
		}

		const plan1Data = inputStringToData(plan1);
		let plan2Data = null;

		if (plan2) {
			plan2Data = inputStringToData(plan2);
		}
		
		const viewConfig = summaryViewConfig[planSelect]
		
		if (!viewConfig) {
			throw "Plan select error"
		}

		const viewGenerator = viewConfig.generator;
		
		let args: any[] = [ANB, plan1Data];

		if (viewConfig.isWith2ndData) {
			args.push(plan2Data)
		} 
		if (viewConfig.isWithCCTerm) {
			args = args.concat([ct2Assured, ct2Premiun, ct2PaymentPeriod])
		}

		const parser = new viewGenerator.ParserClass(...args);
		return React.createElement(viewGenerator.ViewClass, {
			dataset: parser.parse(),
			display: displayProps
		});

		// switch(planSelect) {
		// 	case "egsp2-acc": {
		// 		parser = new EGSP2AccParser(ANB, plan1Data);

		// 		return React.createElement(EGSP2AccSummaryView, {
		// 			dataset: parser.parse(),
		// 			display: displayProps
		// 		});
		// 	};
		// 	case "egsp2": {
		// 		parser = new EGSP2WithdrawParser(ANB, plan1Data);

		// 		return React.createElement(EGSP2WithdrawSummaryView, {
		// 			dataset: parser.parse(),
		// 			display: displayProps
		// 		});
		// 	};
		// 	case "plcs": {
		// 		parser = new PLCSParser(ANB, plan1Data);
				
		// 		return React.createElement(PLCSSummaryView, {
		// 			dataset: parser.parse(),
		// 			display: displayProps
		// 		});
		// 	};
		// 	case "plp2": {
		// 		parser = new PLP2Parser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = PLP2SummaryView;
		// 		break;
		// 	};
		// 	case "cip": {
		// 		parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIPSummaryView;
				
		// 		break;
		// 	};
		// 	case "cir2": {
		// 		parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIR2SummaryView;
				
		// 		break;
		// 	};
		// 	case "cie": {
		// 		parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIESummaryView;

		// 		break;
		// 	};
		// 	case "cie2": {
		// 		parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIE2SummaryView;

		// 		break;
		// 	};
		// 	case "cim2": {
		// 		parser = new SingleCCParser(ANB, plan1Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIM2SummaryView;
				
		// 		break;
		// 	};
		// 	case "cie+cim2": {
		// 		parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIExCIM2SummaryView;
				
		// 		break;
		// 	};
		// 	case "cir2+cie": {
		// 		parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIR2xCIESummaryView;

		// 		break;
		// 	};
		// 	case "cip+cie": {
		// 		parser = new MixedCCParser(ANB, plan1Data, plan2Data, ct2Assured, ct2Premiun, ct2PaymentPeriod);
		// 		view = CIPxCIESummaryView;

		// 		break;
		// 	};
		// 	default: {

		// 	}
		// }

		// let props = parser.parse();

		// return React.createElement(view, {
		// 	dataset: props,
		// 	display: {
		// 		proposalName,
		// 		fxRate,
		// 		currency,
		// 		ANB,
		// 		fullDataDisplay
		// 	}
		// });
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