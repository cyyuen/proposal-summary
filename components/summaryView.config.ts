import EGSP2AccParser from '../parsers/EGSP2AccParser'
import EGSP2WithdrawParser from '../parsers/EGSP2WithdrawParser'
import MixedCCParser from '../parsers/MixedCCParser'
import PLCSParser from '../parsers/PLCSParser'
import PLP2Parser from '../parsers/PLP2Parser'
import SingleCCParser from '../parsers/SingleCCParser'

import EGSP2AccSummaryView from '../summary_views/EGSP2AccSummaryView'
import EGSP2WithdrawSummaryView from '../summary_views/EGSP2WithdrawSummaryView'
import PLCSSummaryView from '../summary_views/PLCSSummaryView'
import PLP2SummaryView from '../summary_views/PLP2SummaryView'
import PruCCSummaryView from '../summary_views/PruCCSummaryView'

import CIPSummaryView from '../summary_views/CIPSummaryView'
import CIR2SummaryView from '../summary_views/CIR2SummaryView'
import CIESummaryView from '../summary_views/CIESummaryView'
import CIE2SummaryView from '../summary_views/CIE2SummaryView'
import CIM2SummaryView from '../summary_views/CIM2SummaryView'

import CIExCIM2SummaryView from '../summary_views/CIExCIM2SummaryView'
import CIR2xCIESummaryView from '../summary_views/CIR2xCIESummaryView'
import CIPxCIESummaryView from '../summary_views/CIPxCIESummaryView'
import * as React from 'react';

import PruParser from "../parsers/PruParser"
import PruBaseSummaryView from "../summary_views/PruBaseSummaryView"
import { PruCCDataset } from '../Dataset'

class SummaryViewGenerator<TParser extends PruParser = any, TView extends PruBaseSummaryView = any> {
    constructor(
        public readonly ParserClass: (new (...args: any[]) => TParser), 
        public readonly ViewClass: new (...args: any[]) => TView
    ){}
}

interface SummaryViewConfig {
    generator: SummaryViewGenerator,
    isWithCCTerm?: boolean,
    isWith2ndData?: boolean
}

export const config: {[id: string] : SummaryViewConfig;} = {
    "cie2": {
        generator: new SummaryViewGenerator(SingleCCParser, CIE2SummaryView),
        isWithCCTerm: true,
        isWith2ndData: false
    },
}