import React, { Component } from 'react';
import AutoSuggest from './AutoSuggest';
import AntibodyCard from './AntibodyCard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedAntigen: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (event, { newValue }) => {
    this.setState({
      selectedAntigen: newValue,
    });
  };
  
  
  
  render() {
    const selectedAntigen = this.state.selectedAntigen;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AutoSuggest style={{flex: 1}} handleAppChange={ this.handleChange } />
        {selectedAntigen ? <AntibodyCard selectedAntigen={selectedAntigen} /> : ''}
      </div>
    );
  }
}

export default App;
