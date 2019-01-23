import PruParser from "./PruParser.js"

/**
 Single CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class SingleCCParser extends PruParser {

	parseDataLine(ANB, year, accumulatePremiun, dataline) {

		const total = this.dataNumStringToNumber(dataline[5]);

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun,
			// 基本保额
			basicInsured: this.dataNumStringToNumber(data[i][5]),
			// 赠送保额
			freeInsured: this.dataNumStringToNumber(data[i][6]),
			// 现金价值
			cashValue: this.dataNumStringToNumber(data[i][4]),
			// 总保额
			totalInsured: this.dataNumStringToNumber(data[i][8])
		}
	}
}