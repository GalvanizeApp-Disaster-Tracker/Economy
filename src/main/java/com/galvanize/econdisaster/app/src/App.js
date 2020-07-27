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
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-Intro">
            <h2>Zips</h2>
            {zip.map(economic =>
                <div key={economic.id}>
                    {economic.zip}
                </div>
            )}
        </div>
      </header>
    </div>
  );
}
}
export default App;
