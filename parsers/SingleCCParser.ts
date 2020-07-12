import PruParser from "./PruParser"
import {PruCCDataset, PruCCDataLine} from "../Dataset"

/**
 Single CC Parser
 suitable for CC plans: CIR2 / CIE / CIM2
 */
export default class SingleCCParser extends PruParser {
	protected totalFreeInsuredYears:number
	protected ct2Assured:number
	protected ct2Premiun:number
	protected ct2PaymentPeriod: number

	constructor(ANB: number, data: string[][], ct2Assured: string, ct2Premiun: string, ct2PaymentPeriod: string) {
		super(ANB, data);
		this.totalFreeInsuredYears = 0;

		this.ct2Assured = parseFloat(ct2Assured);
		this.ct2Premiun = parseFloat(ct2Premiun);
		this.ct2PaymentPeriod = parseFloat(ct2PaymentPeriod);
	}

	parse(): PruCCDataset {
		let parsedData = super.parse() as PruCCDataset;

		return new PruCCDataset({...parsedData.summary,
			totalFreeInsuredYears: this.totalFreeInsuredYears,
			basicInsured: parsedData.details[0].basicInsured,
			freeInsured: parsedData.details[0].freeInsured,
			premiun: parsedData.summary.premiun + this.ct2Premiun,
			totalPremiun: parsedData.summary.totalPremiun + this.ct2Premiun * this.ct2PaymentPeriod,
		}, parsedData.details);
	}

	parseDataLine(ANB: number, year: number, accumulatePremiun: number, dataline: string[], lastParsedDataline: PruCCDataLine|null): PruCCDataLine {

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

    let cashValue = this.dataNumStringToNumber(dataline[4]);
    let totalInsured = this.dataNumStringToNumber(dataline[8]) + ct2Assured;

	return {
			ANB: ANB,
			year: year,
			accumulatePremiun: accumulatePremiun + ct2AccPremiun,
			// 基本保额
			basicInsured: basicInsured,
			// 赠送保额
			freeInsured: freeInsured,
			// 现金价值
			cashValue: cashValue,
			// 总保额
			totalInsured: totalInsured,
			// 总收益率：现金价值 - 累计保费 / 累计保费
			totalYield: (cashValue - accumulatePremiun) / accumulatePremiun,
			// 
			insuredLever: totalInsured / accumulatePremiun
		}
	}
}
