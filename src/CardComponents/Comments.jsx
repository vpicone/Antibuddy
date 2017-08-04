import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class Comments extends React.PureComponent {
  render() {
    return (
      <Typography
        align="center"
        type="body2"
        gutterBottom
        style={{ marginTop: 12, maxWidth: '75%', margin: 'auto' }}
      >
        <br />
        {this.props.children}
      </Typography>
    );
  }
}

Comments.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Comments;
