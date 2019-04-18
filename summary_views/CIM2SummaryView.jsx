
import PruCCSummaryView from './PruCCSummaryView'

export default class CIM2SummaryView extends PruCCSummaryView {
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