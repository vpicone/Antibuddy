import React, { Component } from 'react';
import AutoSuggest from './AutoSuggest';
import AntigenCard from './AntigenCard';
import logo from './logo.svg';
import './App.css';
import fire from './fire'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedAntigen: null,
      items:[]
    };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }
  
  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    this.setState({
      selectedAntigen: suggestion,
    });
  }
  
  componentWillMount() {
    let itemRef = fire.database().ref();
    itemRef.on("child_added", snapshot => {
      let item = { antigen: snapshot.val(), id: snapshot.key };
      this.setState({ items: [item].concat(this.state.items) });
    });
  }
  
  
  render() {
    const selectedAntigen = this.state.selectedAntigen;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Antibuddy</h2>
        </div>
        <p className="App-intro">
          A red blood cell antigen resource.
        </p>
        <AutoSuggest onSuggestionSelected={ this.onSuggestionSelected } />
        {selectedAntigen ? <AntigenCard selectedAntigen={selectedAntigen} /> : ''}
      </div>
    );
  }
}

export default App;
