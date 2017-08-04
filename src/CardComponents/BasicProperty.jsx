import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

class BasicProperty extends React.PureComponent {
  render() {
    return (
      <div>
        <Typography align="left" type="subheading" gutterBottom style={{ marginTop: 12 }}>
          <b>
            {this.props.antigenProperty}:{' '}
          </b>
          {this.props.propertyData}
        </Typography>
        <Divider inset />
      </div>
    );
  }
}

BasicProperty.propTypes = {
  antigenProperty: PropTypes.string.isRequired,
  propertyData: PropTypes.string.isRequired,
};

export default BasicProperty;
