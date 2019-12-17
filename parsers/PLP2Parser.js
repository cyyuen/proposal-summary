import PruParser from "./PruParser.js"

class PLP2CashValueParser extends PruParser {

	parseDataLine(ANB, year, accumulatePremiun, dataline, lastParsedDataline) {

		const cashValue = this.dataNumStringToNumber(dataline[5]);

		return {
			ANB,
			year,
			cashValue,
		}
	}
}

class PLP2AssuredParser extends PruParser {
	parseDataLine(ANB, year, accumulatePremiun, dataline, lastParsedDataline) {

		const assured = this.dataNumStringToNumber(dataline[7]);

		return {
			ANB,
			year,
			assured
		}
	}
}

/**
 PLP2 Parser
 suitable for CC plans: PLP2
 */
export default class PLP2Parser extends PruParser {

	constructor(ANB, data1,  data2, ct2Assured, ct2Premiun, ct2PaymentPeriod) {
		super(ANB, null);

		this.ANB = ANB;
		this.ct2Assured = parseFloat(ct2Assured);
		this.ct2Premiun = parseFloat(ct2Premiun);
		this.ct2PaymentPeriod = parseFloat(ct2PaymentPeriod);
	 	this.cashValueParser = new PLP2CashValueParser(ANB, data1);
		this.assuredParser = new PLP2AssuredParser(ANB, data2);
	}

	parse() {
		const cashValueData = this.cashValueParser.parse();
		const assuredData = this.assuredParser.parse();

		const assuredDataDetails = assuredData.details;

		const summary = cashValueData.summary;

		Object.assign(summary, {
			premiun: summary.premiun + this.ct2Premiun,
			totalPremiun: summary.totalPremiun + this.ct2Premiun * this.ct2PaymentPeriod,
			totalFreeInsuredYears: 20,
			basicInsured: assuredDataDetails[0].assured / 2,
			freeInsured: assuredDataDetails[0].assured / 2,
			ct2Assured: parseFloat(this.ct2Assured),
			ct2Premiun: parseFloat(this.ct2Premiun),
			ct2PaymentPeriod: parseFloat(this.ct2PaymentPeriod),
		})

		const details = [];

		for (let i = 0, len = cashValueData.details.length; i != len; ++i) {

			const {
				ANB,
				year,
				assured,
			} = assuredDataDetails[i];

			const {
				cashValue
			} = cashValueData.details[i];

			let totalAssured = assured;

			// if the year is longer then Payment Period, the CT2 expired
			if (year <= this.ct2PaymentPeriod) {
				totalAssured = assured + this.ct2Assured
			}

			details.push({
				ANB,
				year,
				assured: totalAssured,
				cashValue
			})
		}

		return {
			summary,
			details
		}
	}
}
