import React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('BasicProperty', theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  undertitle: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

function BasicProperty(props) {
  const classes = props.classes;
    return (
        <div>
            <Typography type="display3" component="h2">
                {`${props.antigen.label} antigen`}
            </Typography>
            <Typography type="display1" className={classes.undertitle} gutterBottom>
                {`System: ${props.antigen.system} | ISBT: ${props.antigen.isbt}`}
            </Typography>
            <Divider />
        </div>
    )
}

export default withStyles(styleSheet)(CardTitle);