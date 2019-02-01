
import SingleCCSummaryView from './SingleCCSummaryView'

export default class CIR2SummaryView extends SingleCCSummaryView {
	getPlanname() {
		return "CIR2"
	}

	getDiseaseNum() {
		return 75
	}

	getClaimNum() {
		return 1;
	}
}