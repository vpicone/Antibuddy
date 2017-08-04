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

const initialCoreProperties = ['Label',
  'Name',
  'ISBT',
  'System'];

class CoreProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coreproperties: initialCoreProperties,
    };
  }
  
  

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Core Properties:</h2>
        {this.state.coreproperties.map(coreproperty => {
          return (
            <TextField
              required
              key={coreproperty}
              id={coreproperty.toLowerCase().replace(" ", "")}
              value={this.props.values[coreproperty]}
              label={coreproperty}
              className={classes.textField}
              onChange={event => this.props.onCorePropertyChange(coreproperty, event.target.value)}
              margin="normal"
            />
          )}
        )}
      </div>
    );
  }
}

CoreProperties.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(CoreProperties);
