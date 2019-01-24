import React from 'react';

import ProposalInputForm from './ProposalInputForm.jsx';
import ProposalSummaryView from './ProposalSummaryView.jsx';

import styles from 'antd/dist/antd.css';

import { Layout } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

export default class PruProposalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {proposalData: null};
    this.onProposalInputSubmitted = this.onProposalInputSubmitted.bind(this);
  }

  onProposalInputSubmitted(proposalData) {

    console.log(proposalData);

    this.setState({proposalData: proposalData});
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styles}} />
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