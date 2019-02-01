
import SingleCCSummaryView from './SingleCCSummaryView'

export default class CIM2SummaryView extends SingleCCSummaryView {
	getPlanname() {
		return "CIM2"
	}

	getDiseaseNum() {
		return 125;
	}

	getClaimNum() {
		return 10;
	}
}