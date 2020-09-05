
import Plot from 'react-plotly.js';
import React from 'react';

interface IProps {
    data?: any
}

const StockChartComponent = (props: IProps) => {
    
    return (
        <Plot
          data={[
            {
              x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
              y: [1, 3, 6],
              type: 'scatter'
            }
          ]}
          layout={{width: 320, height: 240, title: 'Sample Plot'}}
        />
      );
}

export default StockChartComponent;
