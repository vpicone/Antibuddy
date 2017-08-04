import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/ModeEdit';
import ReplyIcon from 'material-ui-icons/Reply';
import createPalette from 'material-ui/styles/palette';
import cyan from 'material-ui/colors/cyan';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import { Collapse } from 'react-collapse';
import AutoSuggest from './AutoSuggest';
import AntigenCard from './AntigenCard';
import logo from './logo.svg';
import './App.css';
import AntigenForm from './AntigenForm';
import GithubCorner from './GithubCorner';
import base from './base';

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

const styleSheet = createStyleSheet('App', styleTheme => ({
  'App-header': {
    position: 'relative',
    backgroundColor: '#00b8d4',
    height: '160px',
    padding: '20px',
    color: 'white',
  },
  Icon: {
    width: '60',
    height: '60',
  },
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAntigen: null,
      antigens: [],
    };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  componentWillMount() {
    this.ref = base.syncState('antigens', {
      context: this,
      state: 'antigens',
      asArray: true,
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    this.setState({
      selectedAntigen: suggestion,
    });
  }

  render() {
    const selectedAntigen = this.state.selectedAntigen;
    const searchAndView = () =>
      (<div style={{ position: 'relative' }}>
        <Link to="/data">
          <IconButton
            style={{
              position: 'absolute',
              top: '-55px',
              right: '10px',
            }}
            aria-label="Edit Database"
          >
            <EditIcon
              style={{
                width: '60px',
                height: '60px',
              }}
            />
          </IconButton>
        </Link>
        <AutoSuggest
          fireSuggestions={this.state.antigens}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        {selectedAntigen ? <AntigenCard selectedAntigen /> : ''}
      </div>);

    const dataEntry = () =>
      (<div style={{ position: 'relative' }}>
        <Link to="/">
          <IconButton
            style={{
              position: 'absolute',
              top: '-55px',
              right: '10px',
            }}
            aria-label="Back to antibody viewer"
          >
            <ReplyIcon
              style={{
                width: '60px',
                height: '60px',
              }}
            />
          </IconButton>
        </Link>
        <AntigenForm />
      </div>);

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <GithubCorner />
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Antibuddy</h2>
            </div>
            <p className="App-intro">A red blood cell antigen resource.</p>
            <div>
              <Route exact path="/" component={searchAndView} />
              <Route path="/data" component={dataEntry} />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styleSheet)(App);
