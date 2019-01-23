import PruParser from "./PruParser.js"

/**
 Single CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class SingleCCParser extends PruParser {

	constructor(ANB, data) {
		super(ANB, data);
		this.totalFreeInsuredYears = 0;
	}

	parse() {
		let parsedData = super.parse();

		Object.assign(parsedData.summary, {
			totalFreeInsuredYears: this.totalFreeInsuredYears,
			basicInsured: parsedData.details[0].basicInsured,
			freeInsured: parsedData.details[0].freeInsured,
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

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun,
			// 基本保额
			basicInsured: basicInsured,
			// 赠送保额
			freeInsured: freeInsured,
			// 现金价值
			cashValue: this.dataNumStringToNumber(dataline[4]),
			// 总保额
			totalInsured: this.dataNumStringToNumber(dataline[8])
		}
	}
}