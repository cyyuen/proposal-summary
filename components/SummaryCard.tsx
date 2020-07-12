import { Divider, Row, Col, Tag, Tabs } from 'antd';
import * as React from 'react';

const TabPane = Tabs.TabPane;

import {
  CARD_BORDER_COLOR, 
  PRU_COLOR
} from '../constants';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

interface SummaryCardProps {
  proposalName: any,
  ANB: any,
  premiun: any,
  currency: any,
  fxRate: any,
  totalPaymentYear: any,
  totalPremiun: any,
  children: any,
  cardID: any
}

export default class SummaryCard extends React.Component<SummaryCardProps> {
  render() {

    const {
      proposalName,
      ANB,
      premiun,
      currency,
      fxRate,
      totalPaymentYear,
      totalPremiun,
      children,
      cardID
    } = this.props

    console.log(this.props);

    const colStyle = {
      padding: "8px",
      color: "white",
      backgroundColor: PRU_COLOR,
      fontSize: "16px",
      textAlign: "center" as "center"
    }

    const borderStyle = "1px solid " + CARD_BORDER_COLOR;

    return (
      <Row>
        <Col offset={3} span={18}>
          <div style={{
            width: "650px", 
            marginLeft: "auto",
            marginRight: "auto",
          }}
          >
            <div 
              id={cardID}
              style={{
                borderRadius: "5px",
                border: "5px solid black",
                width: "100%",
                height: "100%",
                backgroundColor: "white"
              }}
            >

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
                {(premiun * fxRate).toLocaleString()}{currency}
              </Col>
              <Col style={colStyle} span={10}> 
                {totalPaymentYear}年共供款 {(totalPremiun * fxRate).toLocaleString()}{currency}
              </Col>
            </Row>
            {children}
          </div>
        </div>
        </Col>
      </Row>
      )
  }
}