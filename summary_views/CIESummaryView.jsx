
import SingleCCSummaryView from './SingleCCSummaryView'

export default class CIESummaryView extends SingleCCSummaryView {
	getPlanname() {
		return "CIE"
	}

	getDiseaseNum() {
		return 108;
	}

	getClaimNum() {
		return 5;
	}
}