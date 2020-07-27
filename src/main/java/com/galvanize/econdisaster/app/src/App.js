import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    zip: []
  };

  async componentDidMount() {
    const response = await fetch('/zip');
    const body = await response.json();
    this.setState({ zip: body, isLoading: false });
  }

  render() {
    const {zip, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

  return (
    <div className="App">
      <header className="App-header">
      <h2> Global Economic Disasters! </h2>
      <h3> USADebtClock </h3>
      <iframe src="http://www.USADebtClock.com/us-debt-clock-widget.php" height="80" width="350" scrolling="no" frameborder="0">
      </iframe>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-Intro">
            <h2>Global Growth Projections</h2>
            {zip.map(economic =>
                <div key={economic.id}>
                    {economic.country} {economic.percchange2018}{economic.percchange2019}{economic.percchange2020}{economic.percchange2021}
                </div>
            )}
        </div>
      </header>
    </div>
  );
}
}
export default App;
