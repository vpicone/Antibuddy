// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Features from './FormComponents/Features';
import Comments from './FormComponents/Comments';
import CoreProperties from './FormComponents/CoreProperties';
import Occurences from './FormComponents/Occurences';
import fire from './fire';


const TabContainer = props =>
  (<div style={{ display: 'flex', padding: 24, justifyContent: 'center' }}>
    {props.children}
  </div>);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('AntigenForm', theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginBottom: '5%',
  },
  root: {
    margin: 'auto',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit * 10,
  },
  paper: {
    marginBottom: '10px',
  },
}));

const initialstate = {
  'Enzyme reactivity': '',
  'Antigen expression': '',
  'Immunoglobulin class': '',
  'Optimal testing technique': '',
  Neutralization: '',
  'Complement binding': '',
  'Transfusion reactions': '',
  HDFN: '',
  'Autoantibody formation': '',
  featureList: ['Enzyme reactivity',
      'Antigen expression',
      'Immunoglobulin class',
      'Optimal testing technique',
      "Neutralization",
      'Complement binding',
      'Transfusion reactions',
      "HDFN",
      'Autoantibody formation'],
  Label: '',
  Name: '',
  ISBT: '',
  System: '',
  occurences: ['Caucasian', 'Black', 'Asian', 'South American', 'Native American'],
  addedOccurences: [],
  Caucasian: '',
  Black: '',
  Asian: '',
  'South American': '',
  'Native American': '',
  comments: '',
};

class AntigenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      index: 0,
      ...initialstate,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
    // this.authHandler = this.authHandler.bind(this);
    // this.authenticate = this.authenticate.bind(this);
    // this.logout = this.logout.bind(this);
  }

  onFeatureChange = (feature, value) => {
    this.setState({ [feature]: value });
  };

  onCommentsChange = (value) => {
    this.setState({ comments: value });
  };

  onCorePropertyChange = (coreproperty, value) => {
    this.setState({ [coreproperty]: value });
  };

  onOccurenceChange = (occurence, value) => {
    this.setState({ [occurence]: value });
  };

  clearOccurences = () => {
    this.state.addedOccurences.forEach((addedOcc) => {
      this.setState({ [addedOcc]: undefined });
    });
    this.setState({
      occurences: initialstate.occurences,
      addedOccurences: initialstate.addedOccurences,
    });
  };
  
  logout = () => {
    fire.auth().signOut().then(
      () => {
        this.setState({uid: null});
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  }
  
  addNewOccurence = (occurence) => {
    this.setState(prevState => ({ addedOccurences: prevState.addedOccurences.concat(occurence) }));
  };

  // logout() {
  //   fire.auth().signOut().then(
  //     () => {
  //       this.setState({uid: null});
  //     },
  //     (error) => {
  //       // eslint-disable-next-line no-console
  //       console.log(error);
  //     }
  //   );
  // }

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleChangeIndex = (index) => {
    this.setState({ index });
  };

  // authHandler(authData, err) {
  //   if (err) {
  //     // eslint-disable-next-line no-console
  //     console.log(err);
  //     return;
  //   }
  //   this.setState({
  //     uid: authData.user.uid,
  //   });
  // }

  // authenticate() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   fire.auth().signInWithPopup(provider).then(this.authHandler);
  // }

  formatOccurences = () => {
    let occurences = [];
    this.state.occurences.forEach(occurence => {
      if(this.state[occurence])
        occurences.push({ name: occurence, value: this.state[occurence] });
    });
    console.log(occurences);
    return occurences;
  }
  
  formatFeatures = () => {
    let features={}
    this.state.featureList.forEach(feat => {
      if(this.state[feat]) 
        features[feat] = this.state[feat]
    })
    return features;
  }

  readyForSubmission = () => 
  [this.state.Label, this.state.Name, this.state.ISBT, this.state.System]
  .every(req=>req);

  async handleSubmit() {

    // send data to basebase
    await fire.database().ref(`antigens/${this.state.Label}`).set({
      label: this.state.Label,
      name: this.state.Name,
      isbt: this.state.ISBT,
      system: this.state.System,
      occurence: this.formatOccurences(),
      features: this.formatFeatures(),
      comments: this.state.comments,
    })
    
    //this.clearOccurences();
    this.setState((prevState) => {
      return Object.assign(prevState, initialstate);
    });

  }

  // renderLogin() {
  //   return (
  //     <div>
  //       <h2>Add</h2>
  //       <p>Sign in to manage antibodies.</p>
  //       <Button className="google" onClick={() => this.authenticate()}>
  //         Log In with Google
  //       </Button>
  //     </div>
  //   );
  // }

  render() {
    const classes = this.props.classes;

    const coreproperties = {
      Label: this.state.Label,
      Name: this.state.Name,
      ISBT: this.state.ISBT,
      System: this.state.System,
    };

    const features = {
      'Enzyme reactivity': this.state['Enzyme reactivity'],
      'Antigen expression': this.state['Antigen expression'],
      'Immunoglobulin class': this.state['Immunoglobulin class'],
      'Optimal testing technique': this.state['Optimal testing technique'],
      Neutralization: this.state.Neutralization,
      'Complement binding': this.state['Complement binding'],
      'Transfusion reactions': this.state['Transfusion reactions'],
      HDFN: this.state.HDFN,
      'Autoantibody formation': this.state['Autoantibody formation'],
    };

    const occurences = {
      Caucasian: this.state.Caucasian,
      Black: this.state.Black,
      Asian: this.state.Asian,
      'South-American': this.state['South-American'],
      'Native American': this.state['Native American'],
    };

    const logoutButton = (
      <Button onClick={() => this.logout()} className="logoutButton">
        Log Out
      </Button>
    );

    // //check for login
    // if (!this.state.uid) {
    //   return (
    //     <div>
    //       {this.renderLogin()}
    //     </div>
    //   );
    // }

    // if (!(this.state.uid === "S26YUuEaLMZW1HMXr92cb2ur6RW2")) {
    //   return (
    //     <div>
    //       <h2>Management requires admin priveledges</h2>
    //       {logoutButton}
    //     </div>
    //   );
    // }

    return (
      <div className={classes.root} style={{ width: 800 }}>
        <Paper className="paper" elevation={4}>
          <AppBar position="static" color="default">
            <Tabs
              index={this.state.index}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Core Properties" />
              <Tab label="Features" />
              <Tab label="Comments" />
              <Tab label="Occurences" />
            </Tabs>
          </AppBar>
          <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            <TabContainer>
              <CoreProperties
                values={coreproperties}
                onCorePropertyChange={this.onCorePropertyChange}
              />
            </TabContainer>
            <TabContainer>
              <Features values={features} onFeatureChange={this.onFeatureChange} />
            </TabContainer>
            <TabContainer>
              <Comments value={this.state.comments} onCommentsChange={this.onCommentsChange} />
            </TabContainer>
            <TabContainer>
              <Occurences
                values={occurences}
                clearOccurences={this.clearOccurences}
                addNewOccurence={this.addNewOccurence}
                onOccurenceChange={this.onOccurenceChange}
              />
            </TabContainer>
          </SwipeableViews>
          <Button
            raised
            disabled={!this.readyForSubmission()}
            color="primary"
            onClick={this.handleSubmit}
            className={classes.button}
          >
            Submit
          </Button>
          {logoutButton}
        </Paper>
      </div>
    );
  }
}

AntigenForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AntigenForm);
