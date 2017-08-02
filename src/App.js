import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import createPalette from 'material-ui/styles/palette';
import cyan from 'material-ui/colors/cyan';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import AutoSuggest from './AutoSuggest';
import AntigenCard from './AntigenCard';
import logo from './logo.svg';
import './App.css';
import AntibodyForm from './AntibodyForm';
import fire from './fire';
import {Collapse} from 'react-collapse';
import GithubCorner from './GithubCorner'

const theme = createMuiTheme({
  palette: createPalette({
    primary: cyan, // Purple and green play nicely together.
    accent: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  }),
});


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
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <GithubCorner />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Antibuddy</h1>
          </div>
          <p className="App-intro">
            A red blood cell antigen resource.
          </p>
          <AutoSuggest fireSuggestions={ this.state.antigens } onSuggestionSelected={ this.onSuggestionSelected } />
          {selectedAntigen ? 
            <Collapse isOpened={true}>
              <AntigenCard selectedAntigen={selectedAntigen} />
            </Collapse>
            : ''}
          {/*<AntibodyForm />*/}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
