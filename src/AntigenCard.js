// @flow

import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from './CardComponents/CardTitle';
import BasicProperty from './CardComponents/BasicProperty';
import Comments from './CardComponents/Comments';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';


const styleSheet = createStyleSheet('SimpleCard', theme => ({
  card: {
    minWidth: 275,
    width: "60%",
    maxWidth: 800,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 5,
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
  
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <CardTitle antigen={antigen} />
          {Object.getOwnPropertyNames(antigen.features).map((prop) => (
            <BasicProperty key={prop} antigenProperty={prop} propertyData={antigen.features[prop]} />
          ))}
          <Comments>{antigen.comments}</Comments>
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