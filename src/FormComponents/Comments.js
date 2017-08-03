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
    width: 400
  }
}));

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: ""
    };
  }

  handleChangeMultiline = event => {
    this.setState({
      comments: event.target.value
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <TextField
          id="comments"
          label="Comments"
          multiline
          rowsMax="4"
          value={this.state.comments}
          onChange={this.handleChangeMultiline}
          className={classes.textField}
          margin="normal"
        />
      </div>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Comments);
