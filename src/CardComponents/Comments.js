import React from 'react';
import Typography from 'material-ui/Typography';

class Comments extends React.PureComponent {
  render() {
    return (
        <Typography
          align='center'
          type='body2'
          gutterBottom
          style={{marginTop: 12, maxWidth:'75%', margin:'auto'}}><br />{this.props.children}
        </Typography>
    );
  }
}

export default Comments;