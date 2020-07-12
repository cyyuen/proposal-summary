import PruParser from "./PruParser"

export default class EGSP2AccParser extends PruParser {

	/**
	@return EGSP2DataLine {
		ANB,
		year,
		accumulatePremiun,
		total,
		increase
	}
	*/
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
