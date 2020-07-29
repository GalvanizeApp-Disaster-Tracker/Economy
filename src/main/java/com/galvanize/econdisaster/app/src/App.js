import React, { Component, useState } from 'react';
import { Timeline } from 'react-twitter-widgets';
import { Container, Row, Col, Table, Alert, UncontrolledTooltip, Card, CardImg, CardText, CardBody, CardLink,
                                                                   CardTitle, CardSubtitle  } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    zip: [],
    bankruptcy: []
  };


  async componentDidMount() {
    const response = await fetch('/zip');
    const body = await response.json();
    const bankresponse = await fetch('/bankruptcy');
    const bankbody = await bankresponse.json();
    this.setState({ zip: body, isLoading: false });
    this.setState({ bankruptcy: bankbody, isLoading: false });
  }



  render() {
    const {zip, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

  return (
    <div className="App">
      <header className="App-header">
      <Container>
      <br/>
          <Row>
            <Col><h1> Global Economic Disasters! </h1></Col>
          </Row><br/><br/>
          <Row>
            <Col>
                <Row> US Debt Clock </Row>
                <Row><Alert id="tooltip1" color="danger"><iframe title="USDebtClock" src="http://www.USADebtClock.com/us-debt-clock-widget.php" height="50" width="330" scrolling="no" frameborder="0" /></Alert></Row>
                   <UncontrolledTooltip placement="right" target="tooltip1">Based on information from the U.S. Department of the Treasury</UncontrolledTooltip>
                <Row>Your Contribution</Row>

                <Row><Alert color="danger" id="tooltip2"> $80,500 </Alert></Row>
                   <UncontrolledTooltip placement="right" target="tooltip2">Number determined by dividing the number of US persons by the total US debt</UncontrolledTooltip>
                <Row>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardText>
                    At the end of 2019, COVID-19 hit and reeked havoc on the global economy.  All but 2 countries are estimating negative GDP growth for 2020. The tipping point for any country is when the debt intrerest begin out pacing income.  Since 1989 debt clocks have been established to remind the public of the current state of the economy.

                   As of today our debt exceeds 26 Trillion dollars.  Just to put this in reference, if you spent 1 million dollars per DAY for 2020 YEARS, you would have only spent 2% of our current debt.
                   </CardText>
                   </Card>
                </Row>
            </Col>
            <Col>
                   <Timeline
                          dataSource={{ sourceType: 'profile', screenName: 'USTreasury' }}
                          options={{ height: '400' }}
                        />
            </Col>
          </Row>
          <Row>
            <Col>Percent Change in Global Domestic Product Growth Projections</Col>
          </Row>

            <Table dark bordered hover size="sm">
                <thead>
                    <th>  </th>
                    <th colspan={2}> Recorded Growth </th>
                    <th colspan={2}> Projected Growth </th>
                </thead>
                <thead>
                    <th> Country </th>
                    <th> 2018 </th>
                    <th> 2019 </th>
                    <th> 2020 </th>
                    <th> 2021 </th>
                </thead>
                <tbody>
                    {zip.map(economic =>
                    <tr key={economic.id}>
                        <td>{economic.country} </td>
                        <td>{economic.percchange2018}%</td>
                        <td>{economic.percchange2019}%</td>
                        <td>{economic.percchange2020}%</td>
                        <td>{economic.percchange2021}%</td>
                    </tr>
                    )}
                </tbody>
            </Table>
                  <Row>
                    <Col>U.S. Bankruptcy filings</Col>
                  </Row>
                        <Table dark bordered hover size="sm">
                            <thead>
                                <th> Year </th>
                                <th> 1st Qtr </th>
                                <th> 2nd Qtr </th>
                                <th> 3rd Qtr </th>
                                <th> 4th Qtr </th>
                                <th> Total </th>
                            </thead>
                            <tbody>
                                {this.state.bankruptcy.map(bankruptcy =>
                                <tr key={bankruptcy.id}>
                                    <td>{bankruptcy.year} </td>
                                    <td>{bankruptcy.firstqtr}</td>
                                    <td>{bankruptcy.secondqtr}</td>
                                    <td>{bankruptcy.thirdqtr}</td>
                                    <td>{bankruptcy.fourthqtr}</td>
                                    <td>{bankruptcy.total}</td>
                                </tr>
                                )}
                            </tbody>
                        </Table>
                        <Row> Bankruptcy news is actually the good news in the global discussion.  Although several high visibility companies have declared bankruptcy, the total number is still substantially lower than historical records. </Row>
        </Container>
      </header>
    </div>
  );
}
}
export default App;
