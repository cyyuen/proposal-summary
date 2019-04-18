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

export default class CIR2xCIESummaryView extends PruCCSummaryView {

	renderHighlight() {

		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured
		} = this.props.summary;

		const { 
			subplan2 
		} = this.props

		const firstYearAssured = basicInsured + freeInsured;

		return (
			<div>
			<Tag color="blue">"单次理赔 & 5次理赔"组合方案:</Tag>
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
				      	value={118}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title={"严重病况最多理赔"} 
				      	value={5}
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
				      	title="癌症2次额外理赔："
				      	value={this.toCurrencyFormat(subplan2.summary.basicInsured * 0.8).split(" ")[0]}
            			
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title="心脏病/中风2次额外理赔："
				      	value={this.toCurrencyFormat(subplan2.summary.basicInsured * 0.8).split(" ")[0]}
            			
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title="良性肿瘤，额外理赔："
				      	value={this.toCurrencyFormat(subplan2.summary.basicInsured * 0.1).split(" ")[0]}
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