import React, { Component, useEffect, useState } from 'react';
import { Timeline } from 'react-twitter-widgets';
import {
  Container, Row, Col, Table, Alert, UncontrolledTooltip, Card, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, Button
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
  //this.setState({ fireCannon: true })
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
      GDPRender: false,
      fireCannon: false
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
          <Confetti active={ this.fireCannon } config={ config }/>
            <br />
            <Row>
              <Col><h1> Global Economic Disasters!!!!! </h1></Col>

            </Row><br /><br />
            <Row>
              <Col>
                <Row>
                  <Col><h2><Button color="secondary">Current US Debt</Button></h2></Col>
                  <Col xs="9">
                    <Alert id="debt-clock" color="danger"><h2><DebtClock /></h2></Alert>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto"><h3><Button color="secondary">U.S. Debt per Citizen</Button></h3></Col>
                  <Col>
                    <Alert color="danger" id="tooltip2" xs="1"><h2>$80,500</h2></Alert>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto"><h3><Button color="secondary">US Federal Debt to GDP Ratio</Button></h3></Col>
                  <Col>
                    <Alert color="danger" id="tooltip2" xs="auto"><h3>132.63%</h3></Alert>
                  </Col>
                </Row>
                <UncontrolledTooltip placement="right" target="debt-clock">Based on information from the U.S. Department of the Treasury</UncontrolledTooltip>

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
                  options={{ height: '400', theme:'dark' }}
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
Number.prototype.formatMoney = function (c, d, t) {
  var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function calculateDebt(startYear, startMonth, startDay, baseDebt, perSecondDebt, yearPop, monthPop, dayPop, basePop, perSecondPop) {
  //We pass start date (year, month, day), the base value, with the increase per second
  // then we figure the difference between days and multiply and add the base:
  // startYear = 2020
  // startMonth = 07
  // startDay = 14
  // baseDebt = 26488101200376.64,41693.92,2011,06,06,311496761,0.076923076923077
  var one_day_m = 1000 * 60 * 60 * 24;  //Get 1 day in milliseconds
  var one_day = 60 * 60 * 24;  //Get 1 day in seconds
  var one_sec = 1000;  // 1 second in milliseconds
  var one_tenthsec = 100;  // 1 10th second in milliseconds
  var one_fifthsec = 200;  // 1 5th second in milliseconds
  var one_halfsec = 500;  // 0.5 second in milliseconds
  //theTime=setTimeout('calculateDebt(2011,5,30,10000000,41234)',one_tenthsec);
  let theTime = setTimeout('calculateDebt(2020,07,14,26488101200376.64,41693.92,2011,06,06,311496761,0.076923076923077)', one_tenthsec);
  //The Date we are starting from in Javascript format based on parameters passed
  var startdate = new Date(startYear, startMonth - 1, startDay); //  Year/Month/Day - Month is 0-11 in JavaScript
  var startPopdate = new Date(yearPop, monthPop - 1, dayPop); //  Year/Month/Day - Month is 0-11 in JavaScript
  let currentUnfundedDebt = 1.14039E+14;
  let currentUnfundedDebtPerTenth = (155553.99) / 10;
  let currentUnfundedSSDebt = 15100000000000.00;
  let currentUnfundedSSDebtPerTenth = (38333.21) / 10;
  let currentUnfundedMediCareDebt = 79000000000000.00;
  let currentUnfundedMediCareDebtPerTenth = (98764.67) / 10;
  let currentUnfundedDrugDebt = 19939000000000.00;
  let currentUnfundedDrugDebtPerTenth = (18456.11) / 10;
  let currentUnfundedObamaCareDebt = 9200000000000.00;
  let currentUnfundedObamaCareDebtPerTenth = (7123.21) / 10;
  let currentUnfundedOtherDebt = 0.00;
  let currentUnfundedDebtOtherPerTenth = (0) / 10;
  let perTenthDebt = perSecondDebt / 10;
  let today = new Date();
  let elapsedSeconds = Math.ceil((today.getTime() - startdate.getTime()) / 1000);  //Seconds since start
  let elapsedTenths = Math.ceil((today.getTime() - startdate.getTime()) / 100);  //10ths of a second since start
  //currentDebt=Math.ceil((elapsedTenths*perTenthDebt)+baseDebt);
  let currentDebt = (elapsedTenths * perTenthDebt) + baseDebt;
  //currentUnfundedDebt = currentUnfundedDebt + (elapsedTenths*currentUnfundedDebtPerTenth);
  currentUnfundedSSDebt = currentUnfundedSSDebt + (elapsedTenths * currentUnfundedSSDebtPerTenth);
  currentUnfundedMediCareDebt = currentUnfundedMediCareDebt + (elapsedTenths * currentUnfundedMediCareDebtPerTenth);
  currentUnfundedDrugDebt = currentUnfundedDrugDebt + (elapsedTenths * currentUnfundedDrugDebtPerTenth);
  currentUnfundedObamaCareDebt = currentUnfundedObamaCareDebt + (elapsedTenths * currentUnfundedObamaCareDebtPerTenth);
  currentUnfundedOtherDebt = currentUnfundedOtherDebt + (elapsedTenths * currentUnfundedDebtOtherPerTenth);
  currentUnfundedDebt = currentUnfundedSSDebt + currentUnfundedMediCareDebt + currentUnfundedDrugDebt + currentUnfundedObamaCareDebt + currentUnfundedOtherDebt;
  let perTenthPop = perSecondPop / 10;
  elapsedSeconds = Math.ceil((today.getTime() - startPopdate.getTime()) / 1000);  //Seconds since start
  elapsedTenths = Math.ceil((today.getTime() - startPopdate.getTime()) / 100);  //10ths of a second since start
  let currentPop = Math.ceil((elapsedTenths * perTenthPop) + basePop);
  let currentPersonDebt = currentDebt / currentPop;
  let currentHouseholdDebt = (currentPersonDebt * 2.59);
  let currentUnfundedPersonDebt = currentUnfundedDebt / currentPop;
  let currentUnfHouseholdDebt = currentUnfundedPersonDebt * 2.59;
  return currentDebt.formatMoney(2, '.', ',');
}
const DebtClock = () => {
  const [state, setState] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setState(calculateDebt(2020, 7, 14, 26488101200376.64, 41693.92, 2011, 6, 6, 311496761, 0.076923076923077))
    }, 100)
  })
  return (
    <div>{`$${state}`}</div>
  )
}
export default App;


