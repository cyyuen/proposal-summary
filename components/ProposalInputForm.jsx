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
		          label="ANB"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('ANB', { initialValue: 1 })(
		            <InputNumber min={1} max={101} />
		          )}
		          
	        	</Form.Item>

				<Form.Item
		          label="FX Rate"
		          {...formItemLayout}
		        >

		          {getFieldDecorator('fxRate', { initialValue: 1 })(
		            <InputNumber />
		          )}
	        	
	        	</Form.Item>

	        	<Form.Item
		          label="Plan"
		          hasFeedback
		          {...formItemLayout}
		        >
		          {getFieldDecorator('planSelect', {
		            rules: [
		              { required: true, message: 'Please select your plan!' }
		            ],
		          })(
		            <Select placeholder="Please select a plan">
		              <Option value="egsp2">EGSP2</Option>
		              <Option value="egsp2-acc">EGSP2 Accumulate</Option>
		              <Option value="plcs">PLCS</Option>
		              <Option value="plp2">PLP2</Option>
		              <Option value="cc">CC</Option>
		            </Select>
		          )}
		        </Form.Item>

				<Form.Item
		          label="plan1"
		          {...formItemLayout}
		        >
		       	  {getFieldDecorator('plan1', {
		            rules: [
		              { required: true, message: 'Plan 1' }
		            ],
		          })(
		        	<TextArea rows={5} placeholder="Proposal details data for Single Proposal / CC plan 1 / PLP plan assured data"/>
		          )}
		        </Form.Item>
				
				<Form.Item
		          label="plan2"
		          {...formItemLayout}
		        >
		        	{getFieldDecorator('plan2', {
		            rules: [
		              { required: false, message: 'Plan 2' }
		            ],
		          })(
		    		<TextArea rows={5} placeholder="Proposal details data for CC plan 2 / PLP plan cash value data"/>
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

