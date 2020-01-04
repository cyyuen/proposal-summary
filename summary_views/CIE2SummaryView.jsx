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