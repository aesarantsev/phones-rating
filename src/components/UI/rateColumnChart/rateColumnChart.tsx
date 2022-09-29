import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { renderToStaticMarkup } from 'react-dom/server';

interface Props {
  title: string;
  data: {
    name: string;
    y: number;
  }[];
}

const RateColumnChart: FC<Props> = ({ title, data }) => {
  const options: Highcharts.Options = {
    title: {
      text: title,
    },
    xAxis: {
      labels: {
        enabled: true,
        formatter: function () {
          return renderToStaticMarkup(<span>{data[this.pos].name}</span>);
        },
      },
    },
    yAxis: {
      title: { text: 'Рейтинг' },
    },
    series: [
      {
        type: 'column',
        name: title,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return renderToStaticMarkup(<span>{this.point.name}</span>);
          },
        },
        data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RateColumnChart;
