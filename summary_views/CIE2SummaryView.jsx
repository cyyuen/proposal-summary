import PruCCSummaryView from './PruCCSummaryView'
import {
	Tag,
	Timeline,
	Card,
	Statistic,
	Row,
	Col,
	Icon,
	Table,
	Divider
} from 'antd'

export default class CIE2SummaryView extends PruCCSummaryView {

	getScript() {
		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured,
			totalPremiun,
			keyYearDetails
		} = this.props.summary;

		const {
			ANB66,
			ANB81
		} = keyYearDetails;

		return `
		CIE 2，保诚新出的抗癌神器，针对癌症有这一款产品就足够了。癌症最高理赔基础保额500%。配置${this.toCurrencyFormat(basicInsured)}的基础保额，癌症治疗可享受最高${this.toCurrencyFormat(basicInsured * 5)}的保障。配合安心医海外医疗意见，亲子保费豁免等服务，提供从入院前到治疗的全周期重疾保障方案。

		安心医：专业个性化海外医疗咨询服务，当客户不幸患病，我们提供一站式专业医疗咨询服务，由语言相同的专业注册医生提供医疗咨询服务。同时安排最合适的海外医生并安排预约和医疗翻译服务。

		我们为117种病况提供保障，令您倍添安心，而常见的病况 如癌症、心脏病发作或中风等也列入受保障范围内。

		重大疾病保险的模式是有事赔钱，没事当存钱。

		① 有事赔钱：
		如果客户不幸得了保障表里的重大疾病或者身故，公司将一次性赔付一大笔保额让客户接受最好的治疗以及补足因重疾带来的资金缺口。

		与内地不同，香港重疾理赔金额是逐年递增的。因为公司前${totalFreeInsuredYears}年赠送50%的基础保额。所以在第一年的时候，客户就会有${this.toCurrencyFormat(basicInsured + freeInsured)}的保障。并且保额逐年递增，可以有非常好的抗通胀能力。

		到了真正大概率会用到的时候，比如65岁时，内地赔出来的还是${this.toCurrencyFormat(basicInsured)}。中间过去了${ANB66.year}年，那时候的${this.toCurrencyFormat(basicInsured)}已经贬值了，而香港则增值到${this.toCurrencyFormat(ANB66.totalInsured)}。

		② 没事理财：
		当然，我们最希望的是客户不需要用到理赔款。所以，如果客户到，比如说70多80岁，客户可以选择退保，不要这个保障了。直接把钱拿回来。

		与内地不同，香港重疾的退保金额是逐年递增的。内地一共交了${this.toCurrencyFormat(totalPremiun)}，假设在80岁(${ANB81.year}年后)，可以拿回来的钱只比${this.toCurrencyFormat(totalPremiun)}多一点。而香港可以拿回来的则是${this.toCurrencyFormat(ANB81.cashValue)}。

		收益率大概是3-4%，相当于把一部分在银行存的资金放到保险公司里，有增值保值的同时，还能多一个保障。

		具体各年份的数据可以看下面的图片哦。

		另外我还整理了一张表格，里面列明了同样是配置20万美金，不同供款年期下的不同保费是多少。
		`;
	}

	renderHighlight() {

		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured
		} = this.props.summary;

		const firstYearAssured = basicInsured + freeInsured;

		return (
			<div>
			<Tag color="blue">保诚新出的抗癌神器，癌症治疗可享受最高500%的保障，提供从入院前到治疗的全周期重疾保障方案</Tag>
			<div style={{"margin-top": "10px"}}>

			<Row gutter={16}>
				    <Col span={8}>
				      <Statistic
				      	title={"起始保额(" + this.toCurrencyFormat(firstYearAssured).split(" ")[1] + ")"}
				      	value={this.toCurrencyFormat(firstYearAssured).split(" ")[0]}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				    />
				    </Col>
				    <Col span={8}>
				      <Statistic
				      	title={"涵盖病种"}
				      	value={117}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic
				      	title="癌症9次额外理赔(400%)："
				      	value={this.toCurrencyFormat(basicInsured * 4).split(" ")[0]}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				</Row>
				<Row gutter={16}>
				    <Col span={8}>
				      <Statistic
				      	title="心脏病/中风2次额外理赔："
				      	value={this.toCurrencyFormat(basicInsured * 0.8 * 2).split(" ")[0]}

				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic
				      	title="安心医"
				      	value={"海外医疗"}

				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic
				      	title="夫妻互保，首10年人寿保额"
				      	value={"+50%"}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
			  </Row>
			</div>
			  <Divider />
			  <p style={{textAlign: 'center', marginTop: "-20px"}}>
			  	基本重疾保额{this.toCurrencyFormat(basicInsured)} | 前{totalFreeInsuredYears}赠送的重疾保额{this.toCurrencyFormat(freeInsured)}
			  </p>
			</div>
		)
	}
}
