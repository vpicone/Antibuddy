import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

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
}));

const initialFeatures = [
  'Enzyme reactivity',
  'Antigen expression',
  'Immunoglobulin class',
  'Optimal testing technique',
  'Neutralization',
  'Complement binding',
  'Transfusion Reactions',
  'HDFN',
  'Autoantibody formation',
];

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: initialFeatures,
    };
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Features:</h2>
        {this.state.features.map(feature => (
          <TextField
            key={feature}
            id={feature.toLowerCase().replace(' ', '')}
            value={this.props.values[feature]}
            label={feature}
            className={classes.textField}
            onChange={event => this.props.onFeatureChange(feature, event.target.value)}
            margin="normal"
          />
          ))}
      </div>
    );
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  onFeatureChange: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Features);
