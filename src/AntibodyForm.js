// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import firebase from "firebase";
import Features from "./FormComponents/Features";
import Comments from "./FormComponents/Comments";
import fire from "./fire";

const styleSheet = createStyleSheet("AntibodyForm", theme => ({
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

const initialState = {
  label: "",
  name: "",
  isbt: "",
  occurence: "",
  system: "",
  features: "",
  comments: ""
};

class AntibodyForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.onFeatureChange = this.onFeatureChange.bind(this);
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
      console.log("clicked");
      this.setState({
        uid: null
      });
      alert("Signed Out");
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

  onFeatureChange = event => {
    this.setState({ [event.target.label]: event.target.value });
  };

  async handleSubmit() {
    //send data to basebase
    await fire.database().ref("/antigens/" + this.state.label).set({
      label: this.state.label,
      name: this.state.name,
      isbt: this.state.isbt,
      occurence: this.state.occurence,
      system: this.state.system,
      features: this.state.features,
      comments: this.state.comments
    });

    //clear state
    this.setState(initialState);
  }

  render() {
    const classes = this.props.classes;

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
      <div className={classes.container}>
        <TextField
          id="label"
          label="Label"
          className={classes.textField}
          value={this.state.label}
          onChange={event => this.setState({ label: event.target.value })}
          margin="normal"
        />
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
          margin="normal"
        />
        <TextField
          id="isbt"
          label="ISBT"
          className={classes.textField}
          value={this.state.isbt}
          onChange={event => this.setState({ isbt: event.target.value })}
          margin="normal"
        />
        <TextField
          id="occurence"
          label="Occurence"
          className={classes.textField}
          value={this.state.occurence}
          onChange={event => this.setState({ occurence: event.target.value })}
          margin="normal"
        />
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
          margin="normal"
        />
        <Features onFeatureChange={this.onFeatureChange} />
        <Comments />
        <Button
          raised
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

AntibodyForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(AntibodyForm);
