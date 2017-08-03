import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import TextField from "material-ui/TextField";

const styleSheet = createStyleSheet(theme => ({
  container: {
    flex: "column",
    width: "80%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
}));

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {}
    };
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Features:</h2>
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
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
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
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
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
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
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
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
        <TextField
          id="system"
          label="System"
          className={classes.textField}
          value={this.state.system}
          onChange={event => this.setState({ system: event.target.value })}
          margin="normal"
        />
      </div>
    );
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Features);
