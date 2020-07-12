import { Divider, Row, Col, Tag, Tabs } from 'antd';
import React from 'react';

const TabPane = Tabs.TabPane;

import {
  CARD_BORDER_COLOR, 
  PRU_COLOR
} from '../constants';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

export default class SummaryCard extends React.Component {
  render() {

    const {
      proposalName,
      ANB,
      premiun,
      currency,
      totalPaymentYear,
      totalPremiun,
      children
    } = this.props

    console.log(this.props);

    const colStyle = {
      padding: "8px",
      color: "white",
      backgroundColor: PRU_COLOR,
      fontSize: "16px",
      textAlign: "center"
    }

    const borderStyle = "1px solid " + CARD_BORDER_COLOR;

    return (
      <Row>
        <Col offset={3} span={18}>
          <div style={{
            width: "600px", 
            borderRadius: "5px",
            border: borderStyle,
            marginLeft: "auto",
            marginRight: "auto"
          }}>
          <h1 style={{
            marginTop: "20px",
            marginBottom: "10px",
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
          }}>
            {proposalName} <Tag color={PRU_COLOR} style={{marginLeft: "8px"}}>ANB {ANB}岁</Tag>  
          </h1>

          <Row style={{
            borderTop: borderStyle,
            borderBottom: borderStyle,
            marginBottom: "12px"
          }}>
            <Col style={colStyle} span={7}> 
              每年供款
            </Col>
            <Col 
              style={{
                borderLeft: borderStyle,
                borderRight: borderStyle,
                ...colStyle
              }}
              span={7}
              > 
              {premiun.toLocaleString()} {currency}
            </Col>
            <Col style={colStyle} span={10}> 
              {totalPaymentYear}年共供款 {totalPremiun.toLocaleString()} {currency}
            </Col>
          </Row>

          {children}
        </div>
        </Col>
      </Row>
      )
  }
}