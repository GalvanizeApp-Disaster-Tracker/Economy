import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets';
import {
  Container, Row, Col, Table, Alert, UncontrolledTooltip, Card, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import Confetti from 'react-dom-confetti';
import { VectorMap } from "react-jvectormap";
// currently unused reactStrap imports....keeeping just incase i need later  & reduce the number of display errors
// CardImg, CardBody, CardLink, CardTitle, CardSubtitle,
import './App.css';
import './vectormap.css';


//hard coded the map data.  Not sure the best way to import hashMap JSON data. 
const { getCode, getName, getData } = require("country-list");
const mapData =     {
    AF: -3, AL: -5,  AO: -1.4,    AR: -5.7,    AM: -1.5,    AU: -6.7,    AT: -7,    AZ: -2.2,    BS: -8.3,
    BE: -6.9,    BZ: -12,   BJ: 4.5,    BT: 2.7,    BO: -2.9,    BA: -5,    BW: -5.4,    BR: -5.3,
    BN: 1.3,    BG: -4,    BF: 2,    BI: -5.5,    KH: -1.6,    CM: -1.2,    CA: -6.2,    CF: 1,
    TD: -0.2,    CL: -4.5,    CN: 1.2,    CO: -2.4,    CG: -2.3,    CR: -3.3,    HR: -9,    CY: -6.5,
    CZ: -6.5,    DK: -6.5,    DJ: 1,    DO: -1,    EC: -6.3,    EG: 2,    SV: -5.4,    GQ: -5.5,
    ER: 0.1,    EE: -7.5,    ET: 3.2,    FJ: -5.8,    FI: -6,    FR: -7.2,    GA: -1.2,    GM: 2.5,
    GE: -4,    DE: -7,    GH: 1.5,    GR: -10,    GT: -2,    GN: 2.9,    GW: -1.5,    GY: 52.8,
    HT: -4,    HN: -2.4,    HU: -3.1,    IS: -7.2,    IN: 1.9,    ID: 0.5,    IR: -6,    IQ: -4.7,
    IE: -6.8,    IL: -6.3,    IT: -9.1,    JM: -5.6,    JP: -5.2,    JO: -3.7,    KZ: -2.5,    KE: 1,
    KR: -1.2,    XK: -5,    KW: -1.1,    KG: -4,    LA: 0.7,    LV: -8.6,    LB: -12,    LS: -5.2,
    LR: -2.5,    LY: -58.7,    LT: -8.1,    LU: -4.9,    MK: -29.6,    MG: 0.4,    MW: 1,    MY: -1.7,
    ML: 1.5,    MR: -2,    MX: -6.6,    MD: -3,    MN: -1,    ME: -9,    MA: -3.7,    MZ: 2.2,
    MM: 1.8,    NA: -2.5,    NP: 2.5,    NL: -7.5,    NZ: -7.2,    NI: -6,    NE: 1,    NG: -3.4,
    NO: -6.3,    OM: -2.8,    PK: -1.5,    PS: -11.9,    PA: -2,    PG: -1,    PY: -1,    PE: -4.5,
    PH: 0.6,    PL: -4.6,    PT: -8,    PR: -6,    QA: -4.3,    RO: -5,    RU: -5.5,    RW: 3.5,
    SA: -2.3,    SN: 3,    RS: -3,    SL: -2.3,    SK: -6.2,    SI: -8,    SB: -2.1,    SO: -2.5,
    ZA: -5.8,    ES: -8,    LK: -0.5,    SD: -7.2,    SR: -4.9,    SE: -6.8,    CH: -6,    SY: 0,
    TW: -4,    TJ: 1,    TZ: 2,    TH: -6.7,    TL: -3,    TG: 1,    TT: -4.5,    TN: -4.3,
    TR: -5,    TM: 1.8,    UG: 3.5,    UA: -7.7,    AE: -3.5,    GB: -6.5,    US: -5.9,    UY: -3,
    UZ: 1.8,    VU: -3.3,    VE: -15,    VN: 2.7,    YE: -3,    ZM: -3.5,    ZW: -7.4
};
const config = { //confetti Cannon config
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
const handleClick = (e, countryCode) => {  //I think this converts contry code into the country name? 
  console.log(countryCode);
  return true;
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      zip: [],
      bankruptcy: [],
      dropdownOpen: false,
      setDropdownOpen: false,
      GDPMapRender: true,
      BankruptcyRender: false,
      GDPRender: false
    };
    this.toggle = this.toggle.bind(this);
    this.GDPRender = this.GDPRender.bind(this);
    this.BankruptcyRender = this.BankruptcyRender.bind(this);
    this.GDPMapRender = this.GDPMapRender.bind(this);
    this.checkSwitch = this.checkSwitch.bind(this);
  }

  checkSwitch = ({ currentTarget }) => {  //Use for dynamically mounting data using dropdown
    //console.log("In the case statement")
    if (currentTarget === undefined) {
      return true;
    }
    else { // closes everything but the active drop down choice
      switch (currentTarget.id) {
        case '1':
          this.setState({ GDPRender: true })
          this.setState({ BankruptcyRender: false })
          this.setState({ GDPMapRender: false })
          //this.GDPRender();
          break;

        case '2':
          //this.BankruptcyRender();
          this.setState({ BankruptcyRender: true })
          this.setState({ GDPRender: false })
          this.setState({ GDPMapRender: false })
          break;

        case '3':
          //this.GDPMapRender();
          this.setState({ GDPMapRender: true })
          this.setState({ BankruptcyRender: false })
          this.setState({ GDPRender: false })
          break;

        default:
          Alert.alert("Not found");
      }
    }
  }

  GDPRender() {  //Raw table data with statistics 
    //console.log("Attempting to render GDP table")
    return (
      <div>
        <Row>
          <Col>Percent Change in Global Domestic Product Growth Projections</Col>
        </Row>
        <Table dark bordered hover size="sm">
          <thead>
            <tr>
              <th>  </th>
              <th colSpan={2}> Recorded Growth </th>
              <th colSpan={2}> Projected Growth </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th> Country </th>
              <th> 2018 </th>
              <th> 2019 </th>
              <th> 2020 </th>
              <th> 2021 </th>
            </tr>
          </thead>

          <tbody>
            {this.state.zip.map(economic =>
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
      </div>
    );
  }
  BankruptcyRender() { //Raw table data with statistics 
    //console.log("Attempting to render Bankruptcy table")
    return (
      <div>
        <Row>
          <Col>U.S. Bankruptcy filings</Col>
        </Row>
        <Table dark bordered hover size="sm">
          <thead>
            <tr>
              <th> Year </th>
              <th> 1st Qtr </th>
              <th> 2nd Qtr </th>
              <th> 3rd Qtr </th>
              <th> 4th Qtr </th>
              <th> Total </th>
            </tr>
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
      </div>
    );
  }

//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css" type="text/css" media="screen"/>
// Created a local CSS using the above style sheet as reference. 

  GDPMapRender() { /// Cool Map render -- Not sure if it useful on a large scale.  Bulky implmenentation
    //console.log("Attempting to render GDP Map table")
    return (
      
    <Container>

      <br />
      <link rel="stylesheet" href="./vectormap.css" type="text/css" media="screen"/>
      <h1> Estimated Change in Country GDP for 2020 </h1>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "1000px"
        }}
        onRegionClick={handleClick} //gets the country code              
        onRegionTipShow={function(event, label, code){
          label.text(label.text() + " (GDP " + mapData[code] + "%)"); //Displays the data with country name
        }}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#F01717", "#17F031"], //your color game's here
              min: -8, //Bottom color   If this is set too low everything comes back brown--too high everything is black
              max: 5, //Top Color   Opposite problem with this one 
              normalizeFunction: "linial",  //options are polymonial & linial. Poly does not deal with negative numbers  

            }
          ]
        }}

      />

    </Container>
      )
  }
  async componentDidMount() {
    const response = await fetch('/zip'); //retrieves Postman data
    const body = await response.json();
    const bankresponse = await fetch('/bankruptcy');
    const bankbody = await bankresponse.json();
    //var setDropdownOpen = false; 

    this.setState({ zip: body, isLoading: false }); //sets initial state 
    this.setState({ bankruptcy: bankbody, isLoading: false });
    this.setState({ setDropdownOpen: false, isLoading: false });
    // console.log(this.setDropdownOpen)
  }

  toggle() {
    this.setState({ setDropdownOpen: !this.state.setDropdownOpen });
  } //reverses the current state of the drop down menu.  Can be used for any ON/OFF toggling need. 

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    } //shrug

    return (
      <div className="Bg">
        <header className="App-header">
          <Container>
          <Confetti active={ handleClick } config={ config }/>
            <br />
            <Row>
              <Col><h1> Global Economic Disasters!!!!! </h1></Col>

            </Row><br /><br />
            <Row>
              <Col>
                <Row>
                  <Col><h2>Current US Debt</h2></Col>
                  <Col xs="auto">
                    <Alert id="tooltip1" width="300px" color="danger"><iframe title="USDebtClock" src="http://www.USADebtClock.com/us-debt-clock-widget.php" height="40" width="325px" scrolling="no" frameBorder="0" /></Alert>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto"><h3>U.S. Debt per Citizen</h3></Col>
                  <Col>
                    <Alert color="danger" id="tooltip2" xs="auto"> $80,500 </Alert>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto"><h3>US Federal Debt to GDP Ratio</h3></Col>
                  <Col>
                    <Alert color="danger" id="tooltip2" xs="auto"> 132.63% </Alert>
                  </Col>
                </Row>
                <UncontrolledTooltip placement="right" target="tooltip1">Based on information from the U.S. Department of the Treasury</UncontrolledTooltip>

                <UncontrolledTooltip placement="right" target="tooltip2">Number determined by dividing the number of US persons by the total US debt</UncontrolledTooltip>
                <Row>
                  <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardText>
                      In 1989 the first debt clocks was been established to remind the public of the current state of the economy.

                      As of today our debt exceeds 26 Trillion dollars.  As reference, if you spent <b><i>1 million dollars per day for 2020 years</i></b>, you would have only spent 2% of the current U.S. debt.
                   </CardText>
                  </Card>
                </Row>
              </Col>
              <Col>
                <Timeline
                  dataSource={{ sourceType: 'profile', screenName: 'USTreasury' }}
                  options={{ height: '360' }}
                />
              </Col>
            </Row>

            <Dropdown isOpen={this.state.setDropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                Economic Data Charts
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem id="1" onClick={this.checkSwitch}>Global GDP Projections</DropdownItem>
                <DropdownItem id="2" onClick={this.checkSwitch}>U.S. Bankruptcies Overtime</DropdownItem>
                <DropdownItem id="3" onClick={this.checkSwitch}>GDP Maps</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {this.state.GDPRender ? this.GDPRender() : null}
            {this.state.GDPMapRender ? this.GDPMapRender() : null}
            {this.state.BankruptcyRender ? this.BankruptcyRender() : null}
          </Container>
        </header>
      </div>
    );
  }
}
export default App;
