import PruParser from "./PruParser.js"
import SingleCCParser from './SingleCCParser.js'

/**
 Mixed CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class MixedCCParser extends PruParser {

	constructor(ANB, data1,  data2) {
		super(ANB, null);

		this.ANB = ANB;
	 	this.ccParser1 = new SingleCCParser(ANB, data1);
		this.ccParser2 = new SingleCCParser(ANB, data2);
		this.mixParser = new SingleCCParser(ANB, this.mixCCDetails(data1, data2));
	}

	parse() {
		const parsedData1 = this.ccParser1.parse();
		const parsedData2 = this.ccParser2.parse();

		const parsedMixedData = this.mixParser.parse();

		return {
			subplan1: parsedData1,
			subplan2: parsedData2,

			summary: parsedMixedData.summary,
			details: parsedMixedData.details
		}
	}

	mixCCDetails(ccDetails1, ccDetails2) {
		let data = [];

		for (var i = 0, len = ccDetails1.length; i != len; ++i) {

		var plan1 = ccDetails1[i];
		var plan2 = ccDetails2[i];

		// first few rows
		if (plan1.length === 9) {
			data[i] = [
				plan1[0],
				this.numberToLocalString(this.dataNumStringToNumber(plan1[1]) + this.dataNumStringToNumber(plan2[1])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[2]) + this.dataNumStringToNumber(plan2[2])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[3]) + this.dataNumStringToNumber(plan2[3])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[4]) + this.dataNumStringToNumber(plan2[4])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[5]) + this.dataNumStringToNumber(plan2[5])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[6]) + this.dataNumStringToNumber(plan2[6])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[7]) + this.dataNumStringToNumber(plan2[7])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[8]) + this.dataNumStringToNumber(plan2[8])),
			];
		} else if (plan1.length === 10) {
			// @ANB rows
			data[i] = [
				plan1[0],
				plan1[1],
				this.numberToLocalString(this.dataNumStringToNumber(plan1[2]) + this.dataNumStringToNumber(plan2[2])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[3]) + this.dataNumStringToNumber(plan2[3])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[4]) + this.dataNumStringToNumber(plan2[4])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[5]) + this.dataNumStringToNumber(plan2[5])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[6]) + this.dataNumStringToNumber(plan2[6])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[7]) + this.dataNumStringToNumber(plan2[7])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[8]) + this.dataNumStringToNumber(plan2[8])),
				this.numberToLocalString(this.dataNumStringToNumber(plan1[9]) + this.dataNumStringToNumber(plan2[9])),
			];
		} else {
			throw "Wrong Plan! Please your data format";
		}
	}

	return data;
	}
}
