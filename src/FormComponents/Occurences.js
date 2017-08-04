import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styleSheet = createStyleSheet(theme => ({
  container: {
    flex: "column",
    width: "80%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
      margin: theme.spacing.unit,
  }
}));

const initialOccurences = ["Caucasian", "Black", "Asian", "South-American", "Native American"];

class Occurences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occurences: initialOccurences,
      newOccurence: ""
    };
  }
  
  handleNewOccurence = () => {
      this.props.addNewOccurence(this.state.newOccurence)
      this.setState((prevState) => {
          return {
              occurences: prevState.occurences.concat(this.state.newOccurence),
              newOccurence: ""
          }
      });
  }
  
  clearOccurences = () => {
    this.props.clearOccurences();
    this.setState({occurences: initialOccurences});
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Occurences:</h2>
        {this.state.occurences.map(occurence => {
          return (
            <TextField
              key={occurence}
              id={occurence.toLowerCase().replace(" ", "")}
              label={occurence}
              value={this.props.values[occurence]}
              className={classes.textField}
              onChange={event => this.props.onOccurenceChange(occurence, event.target.value)}
              margin="normal"
            />
          )}
        )}
        <h2>Add Phenotype Occurence:</h2>
        <TextField
          id="newoccurence"
          label="New occurence"
          value={this.state.newOccurence}
          className={classes.textField}
          onChange={ event => this.setState( {newOccurence: event.target.value} ) }
          margin="normal"
        />
        <Button fab onClick={this.handleNewOccurence} color="primary" className={classes.button}>
            <AddIcon />
        </Button>
        <Button onClick={this.clearOccurences}>Clear Addl Occurences</Button>
      </div>
    );
  }
}

Occurences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Occurences);
