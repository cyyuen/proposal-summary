import * as React from 'react';

import ProposalInputForm from './ProposalInputForm';
import ProposalSummaryView from './ProposalSummaryViewContainer';

import { Layout } from 'antd';

const {
  Header, Content,
} = Layout;

export interface ProposalInputData {
  proposalData?: {
    ANB?: any,
    planSelect?: any,
    fxRate?: any,
    proposalName?: any,
    currency?: any,
    plan1?: any,
    plan2?: any,
    ct2Assured?: any,
    ct2Premiun?: any,
    ct2PaymentPeriod?: any,
    fullDataDisplay?: any
  }
}

export default class PruProposalApp extends React.Component<ProposalInputData, ProposalInputData> {
  constructor(props: Readonly<ProposalInputData>) {
    super(props);
    this.state = {proposalData: undefined};
    this.onProposalInputSubmitted = this.onProposalInputSubmitted.bind(this);
  }

  onProposalInputSubmitted(proposalData: any) {
    console.log(proposalData);
    this.setState({proposalData: proposalData});
  }

  render() {
    return (
      <div>
        <style/>
        <Layout>
          <Header> 
            <h2 style={{color: "white", textAlign: "center"}}> Pru Proposal Summary Generater </h2> 
          </Header>
          
          <Content style={{backgroundColor: "white"}}>
            <ProposalInputForm onSubmit={this.onProposalInputSubmitted} />
            <ProposalSummaryView proposalData={this.state.proposalData} />
          
            <div style={{height: "200px"}}></div>
          </Content>
        </Layout>
      </div>
      )
  }
}