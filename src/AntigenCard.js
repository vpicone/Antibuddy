// @flow

import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from './CardComponents/CardTitle';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet('SimpleCard', theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  undertitle: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  property: {
    marginTop: 12,
  }
}));



function SimpleCard(props) {
  const classes = props.classes;
  const antigen = props.selectedAntigen;
  function renderExpression() {
    return Object.getOwnPropertyNames(antigen.expression).map(property => {
      return (
        <span key={property}><b>{property}: </b>{antigen.expression[property]}<br /></span>
      )
    });
  }
  
  
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <CardTitle antigen={antigen} />
          <Typography 
            align='left' 
            type="subheading" 
            className={classes.property}><b>Antigen Expression</b>
          </Typography>
          <Typography
            align='left'
            type="body1" 
            gutterBottom>{renderExpression()}
          </Typography>
          <Divider inset />
          <Typography type="subheading" className={classes.property}><b>Enzyme Reactions</b></Typography>
          <Typography type="body1" gutterBottom>{antigen.enzymes}</Typography>
          <Divider inset />
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleCard);