import {PruPlanDataset, PruPlanDataLine} from "../Dataset"
const { irr } = require('node-irr')

/**
	Basic Pru Proposal Parser

	The fields below are in commom:
	1. Premiun per year
	2. Total premiun
	3. Total Payment years

	The fields below are per-proposal base:
	1. plan details
*/
export default abstract class PruParser {

	constructor(public ANB: number, public data: string[][]) {
		this.ANB = ANB;
		this.data = data;

		return this
	}

	parse(): PruPlanDataset{
		let parsedDetails:PruPlanDataLine[] = [];
		let ANBandYear = null;

		let totalPaymentYear = 0;
		let totalPremiun = 0;

		const premiun = this.dataNumStringToNumber(this.data[0][1]);

		for (let i = 0, len = this.data.length; i != len; i++) {

			ANBandYear = this.extractAgeAndYear(this.data[i]);

			const accumulatePremiun = this.dataNumStringToNumber(this.data[i][1]);

			let lastParsedDataline:PruPlanDataLine | null = null;

			/**
			The premiun will be increased in the beginning &
			will be dropdown till all premiuns are settled
			*/
			if (i > 0) {
				const accumulatePremiunLastYear = this.dataNumStringToNumber(this.data[i-1][1]);

				lastParsedDataline = parsedDetails[i-1];

				/**
					<IMPORTANT> the total payment year must be listed within the year-only column
				*/
				if (accumulatePremiun > accumulatePremiunLastYear && ANBandYear.isYearOnlyColumn ) {
					totalPaymentYear = ANBandYear.year;
					totalPremiun = accumulatePremiun;
				}
			}

			const parsedDataLine = this.parseDataLine(ANBandYear.ANB, ANBandYear.year, accumulatePremiun, this.data[i], lastParsedDataline);

			parsedDataLine.totalYield = parsedDataLine.cashValue / parsedDataLine.accumulatePremiun;

			parsedDataLine.cashflow = this.generateCashflowArray(premiun, ANBandYear.year, totalPaymentYear, parsedDataLine.cashValue);

			parsedDataLine.irr = irr(parsedDataLine.cashflow);

			parsedDataLine.singleRate = (parsedDataLine.cashValue - totalPremiun) / totalPremiun / ANBandYear.year;

			parsedDetails[i] = parsedDataLine;
		}

		return new PruPlanDataset({
			ANB: this.ANB,
			totalPaymentYear: totalPaymentYear,
			premiun: premiun,
			totalPremiun: totalPremiun
		}, parsedDetails)
	}

	generateCashflowArray(premiun: number, year: number, totalPaymentYear: number, cashValue: number): number[] {
			let cashflow = [], i = 0;

			while (i < totalPaymentYear) {
				cashflow[i++] = -1 * premiun;
			}

			while (i < year) {
				cashflow[i++] = 0;
			}

			cashflow[i] = cashValue;

			return cashflow;
	}

	/**
		To be overrided by subclasses
		@param ANB
		@param year
		@param accumulatePremiun
		@param dataline
		@param lastParsedDataline

		@return data line {
			ANB:
			premiun:
			totalPremiun:
			...{other pre-proposal based details}
		}
	*/
	abstract parseDataLine(ANB: number, year: number, accumulatePremiun: number, dataline: string[], lastParsedDataline: PruPlanDataLine|null): PruPlanDataLine

	dataNumStringToNumber(numString:string): number {
		return parseInt(numString.replace(/,/g,""));
	}

	numberToLocalString(number: number):string {
		return number.toLocaleString();
	}

	extractAgeAndYear(data: string[]) {
		/**
		 parsing format @ANB {XX}岁
		 */
		if (data[0] === "@ANB") {
			// remove the last charater '岁'
			// by extracting the first 2 charater
			var ANB = parseInt(data[1].substr(0,2));

			// Handle courter cases @ANB 101岁
			if (ANB === 10) ANB = 101;

			data.shift();

			return {
				ANB: ANB,
				year: ANB - this.ANB,
				isYearOnlyColumn: false
			}
		}

		/**
		parsing format {year}
		*/
		return {
			ANB: this.ANB + parseInt(data[0]),
			year: parseInt(data[0]),
			isYearOnlyColumn: true
		}
	}
}
