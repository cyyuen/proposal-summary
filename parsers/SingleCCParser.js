import PruParser from "./PruParser.js"

/**
 Single CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class SingleCCParser extends PruParser {

	constructor(ANB, data, ct2Assured, ct2Premiun, ct2PaymentPeriod) {
		super(ANB, data);
		this.totalFreeInsuredYears = 0;

		this.ct2Assured = parseFloat(ct2Assured);
		this.ct2Premiun = parseFloat(ct2Premiun);
		this.ct2PaymentPeriod = parseFloat(ct2PaymentPeriod);
	}

	parse() {
		let parsedData = super.parse();

		Object.assign(parsedData.summary, {
			totalFreeInsuredYears: this.totalFreeInsuredYears,
			basicInsured: parsedData.details[0].basicInsured,
			freeInsured: parsedData.details[0].freeInsured,
			premiun: parsedData.summary.premiun + this.ct2Premiun,
			totalPremiun: parsedData.summary.totalPremiun + this.ct2Premiun * this.ct2PaymentPeriod,
		});

		return parsedData;
	}

	parseDataLine(ANB, year, accumulatePremiun, dataline, lastParsedDataline) {

		const basicInsured = this.dataNumStringToNumber(dataline[5]);
		const freeInsured = this.dataNumStringToNumber(dataline[6]);

		if (lastParsedDataline) {
			if (freeInsured == 0 && lastParsedDataline.freeInsured != 0) {
				this.totalFreeInsuredYears = year - 1;
			}
		}

		var ct2Assured = 0;
		var ct2AccPremiun = 0;

		if (year <= this.ct2PaymentPeriod) {
			ct2Assured = this.ct2Assured
			ct2AccPremiun = this.ct2Premiun * year;
		} else {
			ct2AccPremiun = this.ct2Premiun * year;
		}

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun + ct2AccPremiun,
			// 基本保额
			basicInsured: basicInsured,
			// 赠送保额
			freeInsured: freeInsured,
			// 现金价值
			cashValue: this.dataNumStringToNumber(dataline[4]),
			// 总保额
			totalInsured: this.dataNumStringToNumber(dataline[8]) + ct2Assured
		}
	}
}