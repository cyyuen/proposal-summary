import PruParser from "./PruParser"

export default class EGSP2AccParser extends PruParser {

	parseDataLine(ANB: number, year: number, accumulatePremiun: number, dataline: string[], lastParsedDataline: PruPlanDataLine): PruPlanDataLine {

		const cashValue = this.dataNumStringToNumber(dataline[5]);

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun,
			cashValue: cashValue
		}
	}
}
