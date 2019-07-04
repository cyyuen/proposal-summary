import PruParser from "./PruParser.js"

export default class EGSP2AccParser extends PruParser {

	parseDataLine(ANB, year, accumulatePremiun, dataline) {

		const total = this.dataNumStringToNumber(dataline[5]);

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun,
			total: total,
			increase: total / accumulatePremiun
		}
	}
}