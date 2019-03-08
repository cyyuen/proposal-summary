import { Input, Form, InputNumber, Select, Button } from 'antd';
import { Row, Col } from 'antd';
import React from 'react';

const { TextArea } = Input;
const { Option } = Select;

class ProposalInputForm extends React.Component {

	handleSubmit = (e) => {
	    e.preventDefault();

	    this.props.form.validateFields((err, values) => {
	      if (!err) {


	        this.props.onSubmit(values);
	      }
	    });
  	}

	render() {

		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
	      labelCol: { span: 4 },
	      wrapperCol: { span: 14 },
	    };
	    const buttonItemLayout = {
	      wrapperCol: { span: 14, offset: 4 },
	    }
		
		return (
			<div>
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Form.Item
		          label="计划名称"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('proposalName', { initialValue: "完美的计划" })(
		            <Input />
		          )}
		          
	        	</Form.Item>


				<Form.Item
		          label="ANB"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('ANB', { initialValue: 1 })(
		            <InputNumber min={1} max={101} />
		          )}
		          
	        	</Form.Item>

				<Form.Item
		          label="汇率"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('fxRate', { initialValue: 1 })(
		            <InputNumber />
		          )}
	        	
	        	</Form.Item>

	        	<Form.Item
		          label="货币单位"
		          hasFeedback
		          {...formItemLayout}
		        >
		          {getFieldDecorator('currency', {
		          	initialValue: "美金",
		            rules: [
		              { required: true, message: 'Please currency!'}
		            ],
		          })(
		            <Select>
		              <Option value="美金">美金</Option>
		              <Option value="港币">港币</Option>
		              <Option value="人民币">人民币</Option>
		            </Select>
		          )}
		        </Form.Item>

	        	<Form.Item
		          label="计划类别"
		          hasFeedback
		          {...formItemLayout}
		        >
		          {getFieldDecorator('planSelect', {
		          	initialValue: "egsp2-acc",
		            rules: [
		              { required: true, message: 'Please select your plan!'}
		            ],
		          })(
		            <Select placeholder="Please select a plan">
		              <Option value="egsp2-acc">EGSP2 整取方案</Option>
		              <Option value="plp2">PLP2</Option>
		              <Option value="cir2"> CIR2 </Option>
		              <Option value="cie"> CIE </Option>
		              <Option value="cim2"> CIM2 </Option>
		              
		              <Option value="cir2+cie"> CIR2 & CIE混合方案 (In progress) </Option>
		              <Option value="cie+cim2"> CIE & CIM2混合方案 (In progress) </Option>
		              <Option value="egsp2">EGSP2 (In progress)</Option>
		              <Option value="plcs">PLCS (In progress)</Option>
		              
		            </Select>
		          )}
		        </Form.Item>

		        <Form.Item
		          label="CT2保额"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('ct2Assured', { initialValue: 0 })(
		            <InputNumber />
		          )}
	        	
	        	</Form.Item>
	        	<Form.Item
		          label="CT2保费"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('ct2Premiun', { initialValue: 0 })(
		            <InputNumber />
		          )}
	        	
	        	</Form.Item>
	        	<Form.Item
		          label="CT2保障年份"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('ct2PaymentPeriod', { initialValue: 0 })(
		            <InputNumber />
		          )}
	        	
	        	</Form.Item>
				<Form.Item
		          label="计划1数据"
		          {...formItemLayout}
		        >
		       	  {getFieldDecorator('plan1', {
		            rules: [
		              { required: true, message: '计划1数据' }
		            ],
		          })(
		        	<TextArea rows={5} placeholder="计划1数据。填写EGSP2, PLCS, 单个CC计划 | 混合CC计划的计划1数据 | PLP2 的退保价值部分数据"/>
		          )}
		        </Form.Item>
				
				<Form.Item
		          label="计划2数据"
		          {...formItemLayout}
		        >
		        	{getFieldDecorator('plan2', {
		            rules: [
		              { required: false, message: 'Plan 2' }
		            ],
		          })(
		    		<TextArea rows={5} placeholder="混合CC计划的计划2数据 | PLP2 的保额部分数据"/>
		        	)}
		        </Form.Item>

		        <Form.Item {...buttonItemLayout}>
			        <Button type="primary" htmlType="submit" className="proposal-input-form-button">
	            		Generate
	          		</Button>
          		</Form.Item>
			</Form>
			</div>
		)
	}
}


const WrappedProposalInputForm = Form.create({ name: 'proposal_input' })(ProposalInputForm)

export default WrappedProposalInputForm

