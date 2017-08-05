import React from 'react';
import PropTypes from 'prop-types';
import { Radar as ChartRadar, defaults } from 'react-chartjs-2';

function getRadarData(dataObject) {
  const labels = [];
  const values = [];

  dataObject.forEach((ethnicity) => {
    labels.push(ethnicity.name);
    values.push(ethnicity.value);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Antigen Prevalence (%)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: values,
      },
    ],
  };

  return data;
}

class Radar extends React.PureComponent {
  render() {
    defaults.global.defaultFontFamily = 'Roboto';
    console.log(defaults.global.layout);
    const data = getRadarData(this.props.dataObject);
    return (
      <div>
        <h2>Demographic Data</h2>
        <ChartRadar data={data} />
      </div>
    );
  }
}

Radar.propTypes = {
  dataObject: PropTypes.array.isRequired,
};

export default Radar;
