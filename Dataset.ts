interface PruPlanSummary {
    ANB: number,
    premiun: number,
    totalPaymentYear: number,
    totalPremiun:number
}

export interface PruPlanDataLine extends PruRawDataLine {
    ANB: number,
    year: number,
    // 累计保费
    accumulatePremiun: number,
    cashValue: number
    totalYield: number,
    cashflow: number[],
    irr: number,
    singleRate: number
}

export class PruPlanDataset {
    summary: PruPlanSummary
    details: PruPlanDataLine[]

    constructor(summary: PruPlanSummary, details:PruPlanDataLine[]) {
        this.summary = summary
        this.details = details
    }

    getDataLinebyANB(ANB: number): PruPlanDataLine {
        for (let i = 0, len = this.details.length; i != len; i ++) {
            if (this.details[i].ANB == ANB) {
                return this.details[i];
            }
        }

        throw "ANB Not Found"
    }

    getDataLinebyYear(year: number): PruPlanDataLine {
        for (let i = 0, len = this.details.length; i != len; i ++) {
            if (this.details[i].year == year) {
                return this.details[i];
            }
        }

        throw "year Not Found"
    }

    getDataLinesbyYears(years: number[]): PruPlanDataLine[] {
        let getDataLinebyYear = this.getDataLinebyYear.bind(this);

        return years.map(year => getDataLinebyYear(year));
    }

    getDataLinesbyANBs(ANBs: number[]): PruPlanDataLine[] {
        let getDataLinebyANB = this.getDataLinebyANB.bind(this);

        return ANBs.map(ANB => getDataLinebyANB(ANB));
    }

    /**
     * Get first 1st, 11st, 20, 25, 30 years datalines
     * And ANB 66, ANB 76, ANB 86, ANB 101 with overlap earsed
     */
    getDataLinesInEvery10Years(): PruPlanDataLine[] {
        let datalines:PruPlanDataLine[] = [];

        datalines = this.getDataLinesbyYears([1, 11, 20, 25, 30])

        datalines = datalines.concat(this.getDataLinesbyANBs([66, 76, 86, 101]).filter(dataline => {
            return datalines[datalines.length - 1].ANB < dataline.ANB
        }));

        return datalines;
    }
}

export interface PruCCDataLine extends PruPlanDataLine {
    // 基本保额
    basicInsured: number,

    // 赠送保额
    freeInsured: number,

    // 现金价值
    cashValue: number,

    // 总保额
    totalInsured: number,

    insuredLever: number
}

interface PruCCSummary extends PruPlanSummary {
    basicInsured: number,
    freeInsured: number,
    totalFreeInsuredYears: number,
}

export class PruCCDataset extends PruPlanDataset {
    summary: PruCCSummary
    details: PruCCDataLine[]

    constructor(summary: PruCCSummary, details:PruCCDataLine[]) {
        super(summary, details);

        this.summary = summary
        this.details = details
    }
}
