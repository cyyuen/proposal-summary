import PruParser from "./PruParser.js"

export default class EGSP2WithdrawParser extends PruParser {

	constructor(ANB, data) {
		super(ANB, data);
		this.lastTotalWithdraw = 0;
	}

	parseDataLine(ANB, year, accumulatePremiun, dataline) {

		const withdrawValue = this.dataNumStringToNumber(dataline[4]);
		const remainingValue = this.dataNumStringToNumber(dataline[9]);

		const totalWithdraw = this.lastTotalWithdraw + withdrawValue;
		this.lastTotalWithdraw = totalWithdraw;

		const total = totalWithdraw + remainingValue;

		return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun,
			withdrawValue: withdrawValue,
			remainingValue: remainingValue,
			totalWithdraw: totalWithdraw,
			total: total 
		}
	}
}