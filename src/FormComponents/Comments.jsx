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
    width: 400,
  },
}));

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
    };
  }

  handleChangeMultiline = (event) => {
    this.props.onCommentsChange(event.target.value);
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <h2>Comments</h2>
        <TextField
          required
          id="comments"
          label="Comments"
          multiline
          rowsMax="4"
          value={this.props.value}
          onChange={this.handleChangeMultiline}
          className={classes.textField}
          margin="normal"
        />
      </div>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  onCommentsChange: PropTypes.Function.isRequired,
  value: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(Comments);
