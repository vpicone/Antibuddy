// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import Button from "material-ui/Button";
import firebase from "firebase";
import Features from "./FormComponents/Features";
import Comments from "./FormComponents/Comments";
import CoreProperties from "./FormComponents/CoreProperties";
import Occurences from "./FormComponents/Occurences";
import fire from "./fire";

const styleSheet = createStyleSheet("AntigenForm", theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
}));

const initialstate = {
        "Enzyme reactivity":"",
        "Antigen expression":"",
        "Immunoglobulin class":"",
        "Optimal testing technique":"",
        "Neutralization":"",
        "Complement binding":"",
        "Transfusion Reactions":"",
        "HDFN":"",
        "Autoantibody formation":"",
        "Label": "",
        "Name": "",
        "ISBT": "",
        "System": "",
        "occurences": ["Caucasian" , "Black", "Asian", "South American", "Native American"],
        "addedOccurences": [],
        "Caucasian":"",
        "Black":"",
        "Asian":"",
        "South American":"",
        "Native American":"",
        "comments": ""
};

class AntigenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      ...initialstate
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  authenticate() {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(this.authHandler);
  }

  authHandler(authData, err) {
    if (err) {
      console.log(err);
      return;
    } else {
      this.setState({
        uid: authData.user.uid
      });
    }
  }

  logout() {
    fire.auth().signOut().then(() => {
      this.clearOccurences()
      this.setState(Object.assign({}, initialstate))
    }, function(error) {
      console.log(error);
    });
  }

  renderLogin() {
    return (
      <div>
        <h2>Add</h2>
        <p>Sign in to manage antibodies.</p>
        <Button className="google" onClick={() => this.authenticate()}>
          Log In with Google
        </Button>
      </div>
    );
  }

  onFeatureChange = (feature, value) => {
    this.setState({[feature] : value})
  };
  
  onCommentsChange = (value) => {
    this.setState({comments: value});
  }
  
  onCorePropertyChange = (coreproperty, value) => {
    this.setState({[coreproperty] : value})
  }
  
  addNewOccurence = (occurence) => {
    this.setState(prevState => {
      return {addedOccurences: prevState.addedOccurences.concat(occurence)}
    })
  }
  
  clearOccurences = () => {
    this.state.addedOccurences.forEach(addedOcc => {
      this.setState({[addedOcc]:undefined})
    })
    this.setState({occurences: initialstate.occurences, addedOccurences: initialstate.addedOccurences})
  }
  
  onOccurenceChange = (occurence, value) => {
    this.setState({[occurence] : value})
  }
  
  formatOccurences = () => {
    //TODO ONLY RETURN IF VALUABLE
    return this.state.occurences.map(occurence => {
      return {"name": occurence, "value": this.state[occurence]}
    })
  }
  
  readyForSubmission = () => {
    return (
      true
    // Object.getOwnPropertyNames(this.state).every(val => {
    //   return val;
    // }) && !!Object.keys(this.state.occurences).length && !!Object.keys(this.state.features).length && !!this.state.comments
    ) 
  }
  
  
  
  async handleSubmit() {
    
    //TODO ONLY SET VALUABLE FEATURES
    const features = {
      "Enzyme reactivity":this.state["Enzyme reactivity"],
      "Antigen expression": this.state["Antigen expression"],
      "Immunoglobulin class": this.state["Immunoglobulin class"],
      "Optimal testing technique": this.state["Optimal testing technique"],
      "Neutralization":this.state["Neutralization"],
      "Complement binding":this.state["Complement binding"],
      "Transfusion Reactions":this.state["Transfusion Reactions"],
      "HDFN": this.state["HDFN"],
      "Autoantibody formation":this.state["Autoantibody formation"],
    }
    
    //send data to basebase
    await fire.database().ref("antigens/" + this.state.Label).set({
      label: this.state.Label,
      name: this.state.Name,
      isbt: this.state.ISBT,
      system: this.state.System,
      occurence: this.formatOccurences() || null,
      features: features,
      comments: this.state.comments
    });
    
    this.clearOccurences();
    this.setState(Object.assign({}, initialstate));
    
  }
  
  render() {
    const classes = this.props.classes;
    
    const coreproperties = {
        Label: this.state.Label,
        Name: this.state.Name,
        ISBT: this.state.ISBT,
        System: this.state.System,
      }
    
    const features = {
      "Enzyme reactivity":this.state["Enzyme reactivity"],
      "Antigen expression": this.state["Antigen expression"],
      "Immunoglobulin class": this.state["Immunoglobulin class"],
      "Optimal testing technique": this.state["Optimal testing technique"],
      "Neutralization":this.state["Neutralization"],
      "Complement binding":this.state["Complement binding"],
      "Transfusion Reactions":this.state["Transfusion Reactions"],
      "HDFN": this.state["HDFN"],
      "Autoantibody formation":this.state["Autoantibody formation"],
    }
    
    const occurences = {
      "Caucasian":this.state["Caucasian"],
        "Black":this.state["Black"],
        "Asian":this.state["Asian"],
        "South-American":this.state["South-American"],
        "Native American":this.state["Native American"],
    }

    const logoutButton = (
      <Button onClick={() => this.logout()} className="logoutButton">
        Log Out
      </Button>
    );

    //check for login
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
      
      
      <div>
      <div className={classes.container}>
        <CoreProperties values={coreproperties} onCorePropertyChange={this.onCorePropertyChange} />
        <Features values={features} onFeatureChange={this.onFeatureChange} />
        <Comments value={this.state.comments} onCommentsChange={this.onCommentsChange} />
        <Occurences 
          values={occurences}
          clearOccurences={this.clearOccurences}
          addNewOccurence={this.addNewOccurence} 
          onOccurenceChange={this.onOccurenceChange} />
      </div>
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
      </div>
    );
  }
}

AntigenForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(AntigenForm);
