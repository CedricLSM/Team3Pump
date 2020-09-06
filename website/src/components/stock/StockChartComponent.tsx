
import Plot from 'react-plotly.js';
import React from 'react';

interface IProps {
  ticker: string,
  date: Date[],
  close: number[],
  open: number[],
  high: number[],
  low: number[]
}

const StockChartComponent = (props: IProps) => {
    
    return (
        <Plot
          data={[
            {
              x: props.date,
              open: props.open,
              close: props.close,
              high: props.high,
              low: props.low,
              type: 'candlestick'
            }
          ]}
          // layout={{width: 320, height: 240, title: `${props.ticker} price`}}
        />
      );
}

export default StockChartComponent;
