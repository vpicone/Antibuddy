import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styleSheet = createStyleSheet(theme => ({
  container: {
    flex: 'column',
    width: '80%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

const initialOccurences = ['Caucasian', 'Black', 'Asian', 'South-American', 'Native American'];

class Occurences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occurences: initialOccurences,
      newOccurence: '',
    };
  }

  handleNewOccurence = () => {
    this.props.addNewOccurence(this.state.newOccurence);
    this.setState(prevState => ({
      occurences: prevState.occurences.concat(this.state.newOccurence),
      newOccurence: '',
    }));
  };

  clearOccurences = () => {
    this.props.clearOccurences();
    this.setState({ occurences: initialOccurences });
  };

  renderAddPhenotype = () => {
    const classes = this.props.classes;
    return (
      <div>
        <div>
          <TextField
            id="newoccurence"
            label="New demographic"
            value={this.state.newOccurence}
            className={classes.textField}
            onChange={event => this.setState({ newOccurence: event.target.value })}
            margin="normal"
          />
          <Button fab onClick={this.handleNewOccurence} color="primary" className={classes.button}>
            <AddIcon />
          </Button>
        </div>
        <Button raised style={{ margin: '10px' }} onClick={this.clearOccurences}>
          Clear extra occurences
        </Button>
      </div>
    );
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Occurences:</h2>
        {this.state.occurences.map(occurence =>
          (<TextField
            key={occurence}
            id={occurence.toLowerCase().replace(' ', '')}
            label={occurence}
            value={this.props.values[occurence]}
            className={classes.textField}
            onChange={event => this.props.onOccurenceChange(occurence, event.target.value)}
            margin="normal"
          />),
        )}
        {this.renderAddPhenotype()}
      </div>
    );
  }
}

Occurences.propTypes = {
  classes: PropTypes.object.isRequired,
  addNewOccurence: PropTypes.func.isRequired,
  clearOccurences: PropTypes.func.isRequired,
  onOccurenceChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Occurences);
