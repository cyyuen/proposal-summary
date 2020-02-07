import PruParser from "./PruParser.js"

export default class EGSP2WithdrawParser extends PruParser {

	constructor(ANB, data) {
		super(ANB, data);
		this.lastTotalWithdraw = 0;
	}

	parse() {
		let parsedData = super.parse();

		Object.assign(parsedData.summary, {
			totalWithdraw: this.lastTotalWithdraw,
			totalValue: parsedData.details[parsedData.details.length - 1].total,
		});

		return parsedData;
	}

	/**
	@return EGSP2DataLine {
		ANB,
		year,
		accumulatePremiun,
		withdrawValue,
		totalWithdraw,
		remainingValue,
		total
	}
	*/
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
