// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import CardTitle from './CardComponents/CardTitle';
import BasicProperty from './CardComponents/BasicProperty';
import Comments from './CardComponents/Comments';
import Radar from './CardComponents/Radar';

const styleSheet = createStyleSheet('SimpleCard', theme => ({
  card: {
    minWidth: 275,
    width: '60%',
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
  },
}));

function SimpleCard(props) {
  const classes = props.classes;
  const antigen = props.selectedAntigen || null;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <CardTitle antigen={antigen} />
          {Object.getOwnPropertyNames(antigen.features).map(prop =>
            (<BasicProperty
              key={prop}
              antigenProperty={prop}
              propertyData={antigen.features[prop]}
            />),
          )}
          <Comments>
            {antigen.comments}
          </Comments>
        </CardContent>
        <CardMedia>
          <Radar dataObject={antigen.occurence} />
        </CardMedia>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.defaultProps = {
  selectedAntigen: null,
};

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedAntigen: PropTypes.object,
};

export default withStyles(styleSheet)(SimpleCard);
