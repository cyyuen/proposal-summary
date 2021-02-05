import SingleCCParser from './SingleCCParser'
import {PruMixedCCDataset} from "../Dataset"

/**
 Mixed CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class MixedCCParser extends SingleCCParser {

	protected plan1Parser: SingleCCParser
	protected plan2Parser: SingleCCParser
	protected mixedParser: SingleCCParser
	

	constructor(ANB: number, data1: string[][],  data2: string[][], ct2Assured: string, ct2Premiun: string, ct2PaymentPeriod: string) {
		super(ANB);

	 	this.plan1Parser = new SingleCCParser(ANB, data1);
		this.plan2Parser = new SingleCCParser(ANB, data2);

		this.mixedParser = new SingleCCParser(ANB, this.mixCCDetails(data1, data2), ct2Assured, ct2Premiun, ct2PaymentPeriod);
	}

	parse(): PruMixedCCDataset {
		const parsedData1 = this.plan1Parser.parse();
		const parsedData2 = this.plan2Parser.parse();

		let parsedMixedData = this.mixedParser.parse() as PruMixedCCDataset;
		parsedMixedData.plan1dataset = parsedData1;
		parsedMixedData.plan2dataset = parsedData2;

		return parsedMixedData;
	}

	mixCCDetails(ccDetails1: string[][], ccDetails2: string[][]): string[][] {
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
