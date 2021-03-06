
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

export default class CIR2SummaryView extends PruCCSummaryView {

	renderHighlight() {

		const {
			totalFreeInsuredYears,
			basicInsured,
			freeInsured
		} = this.props.summary;

		const firstYearAssured = basicInsured + freeInsured;

		return (
			<div>
			<Tag color="blue">严重病况单次理赔方案:</Tag>
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
				      	value={75}
				      	valueStyle={{
				      		"color": "rgb(154, 29, 73)",
    						"font-size": "30px"
				      	}}
				      />
				    </Col>
				    <Col span={8}>
				      <Statistic 
				      	title="末期病况，额外理赔"
				      	value={20}
				      	prefix={<Icon type="arrow-up" />}
				      	precision={2}
            			suffix="%"
				      	valueStyle={{
				      		"color": '#3f8600',
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