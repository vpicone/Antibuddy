import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/ModeEdit';
import AccountIcon from 'material-ui-icons/AccountCircle';
import CheckIcon from 'material-ui-icons/CheckCircle';
import ReplyIcon from 'material-ui-icons/Reply';
import createPalette from 'material-ui/styles/palette';
import cyan from 'material-ui/colors/cyan';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import AutoSuggest from './AutoSuggest';
import AntigenCard from './AntigenCard';
import logo from './logo.svg';
import './App.css';
import AntigenForm from './AntigenForm';
import GithubCorner from './GithubCorner';
import base from './base';
import fire from './fire';

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
      snackbarOpen: false,
      antigens: [],
    };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  componentWillMount() {
    this.ref = base.syncState('antigens', {
      context: this,
      state: 'antigens',
      asArray: true,
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    this.setState({ selectedAntigen: suggestion });
  }

  authHandler(authData, err) {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
    this.setState({
      uid: authData.user.uid,
      snackbarOpen: true,
    });
  }

  authenticate() {
    const provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(this.authHandler);
  }

  renderLogin() {
    return (
      <div>
        <IconButton
          style={{ position: 'absolute', top: '20px', left: '20px' }}
          className="google"
          onClick={() => this.authenticate()}
        >
          <AccountIcon
            color="white"
            style={{
              width: '60px',
              height: '60px',
            }}
          />
        </IconButton>
      </div>
    );
  }

  renderLoggedIn() {
    return (
      <div>
        <IconButton style={{ position: 'absolute', top: '20px', left: '20px' }} className="google">
          <CheckIcon
            color="white"
            style={{
              width: '60px',
              height: '60px',
            }}
          />
        </IconButton>
      </div>
    );
  }

  render() {
    const searchAndView = () => (
      <div style={{ position: 'relative' }}>
        <Link to="/data">
          <IconButton
            style={{
              position: 'absolute',
              top: '-305px',
              right: '20px',
            }}
            aria-label="Edit Database"
          >
            <EditIcon
              color="white"
              style={{
                position: 'absolute',
                top: '-30px',
                width: '50px',
                height: '50px',
              }}
            />
          </IconButton>
        </Link>
        {this.state.selectedAntigen ? (
          <AntigenCard selectedAntigen={this.state.selectedAntigen} />
        ) : (
          ''
        )}
      </div>
    );

    const dataEntry = () => (
      <div style={{ position: 'relative' }}>
        <Link to="/">
          <IconButton
            style={{
              position: 'absolute',
              top: '-305px',
              right: '20px',
            }}
            aria-label="Back to antibody viewer"
          >
            <ReplyIcon
              color="white"
              style={{
                width: '60px',
                height: '60px',
              }}
            />
          </IconButton>
        </Link>
        <AntigenForm uid={this.state.uid} />
      </div>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <GithubCorner />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Antibuddy</h2>
            <p>Data entry in progress... Try searching 'A' or 'B' for examples.</p>
          </div>
          <p className="App-intro">A red blood cell antigen resource.</p>
          <AutoSuggest
            fireSuggestions={this.state.antigens}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          <div>
            <Router>
              <div>
                <Route exact path="/" component={searchAndView} />
                <Route path="/data" component={dataEntry} />
              </div>
            </Router>
            {!this.state.uid ? this.renderLogin() : this.renderLoggedIn()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styleSheet)(App);
