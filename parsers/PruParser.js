/**
	Basic Pru Proposal Parser

	The fields below are in commom:
	1. Premiun per year
	2. Total premiun
	3. Total Payment years
	
	The fields below are per-proposal base:
	1. plan details
*/
export default class PruParser {
	constructor(ANB, data) {
		this.ANB = ANB;
		this.data = data;
	}

	/**
		@return {
			summary: {
				ANB,
				premiun,
				totalPaymentYear,
				totalPremiun
			},
			details: {
				[Pre-proposal based details]
			}
		}
	*/
	parse() {
		let parsedDetails = [];
		let ANBandYear = null;

		let totalPaymentYear = 0;
		let totalPremiun = 0;
 
		const premiun = this.dataNumStringToNumber(this.data[0][1]);

		for (let i = 0, len = this.data.length; i != len; i++) {

			ANBandYear = this.extractAgeAndYear(this.data[i]);

			const accumulatePremiun = this.dataNumStringToNumber(this.data[i][1]);

			let lastParsedDataline = null;

			/**
			The premiun will be increased in the beginning &
			will be dropdown till all premiuns are settled
			*/
			if (i > 0) {
				const accumulatePremiunLastYear = this.dataNumStringToNumber(this.data[i-1][1]);

				lastParsedDataline = parsedDetails[i-1];

				if (accumulatePremiun > accumulatePremiunLastYear) {
					totalPaymentYear = ANBandYear.year;
					totalPremiun = accumulatePremiun;	
				}
			}


			parsedDetails[i] = this.parseDataLine(ANBandYear.ANB, ANBandYear.year, accumulatePremiun, this.data[i], lastParsedDataline);
		}

		return {
			summary: {
				totalPaymentYear: totalPaymentYear,
				premiun: premiun,
				totalPremiun: totalPremiun
			},
			details: parsedDetails
		}
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
	parseDataLine(ANB, year, accumulatePremiun, dataline, lastParsedDataline) {

	}

	dataNumStringToNumber(numString) {
		return parseInt(numString.replace(/,/g,""));
	}

	numberToLocalString(number) {
		return number.toLocaleString();
	}

	extractAgeAndYear(data) {
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
				year: ANB - this.ANB
			}
		}

		/**
		parsing format {year}
		*/
		return {
			ANB: this.ANB + parseInt(data[0]),
			year: parseInt(data[0])
		}
	}
}