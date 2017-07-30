import React, { Component } from 'react';
import AutoSuggest from './AutoSuggest';
import AntigenCard from './AntigenCard';
import logo from './logo.svg';
import './App.css';
import AntibodyForm from './AntibodyForm';
import fire from './fire';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedAntigen: null,
      antigens:[]
    };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }
  
  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    this.setState({
      selectedAntigen: suggestion,
    });
  }
  
  componentWillMount() {
    let antigenRef = fire.database().ref();
    antigenRef.on("child_added", snapshot => {
      let antigen =  snapshot.val() ;
      this.setState({ antigens: [antigen].concat(this.state.antigens) });
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
        <AutoSuggest fireSuggestions={ this.state.antigens } onSuggestionSelected={ this.onSuggestionSelected } />
        {selectedAntigen ? <AntigenCard selectedAntigen={selectedAntigen} /> : ''}
        {/*<AntibodyForm />*/}
      </div>
    );
  }
}

export default App;
