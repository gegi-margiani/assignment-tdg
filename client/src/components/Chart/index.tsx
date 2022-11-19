import { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { usePeopleStore } from '../../stores/people';
import { StyledChartDiv } from './Chart.styled';

type ChartObj = {
  options: {};
  series: number[];
};

function Chart() {
  const [chartState, setChartState] = useState<ChartObj>({
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
    series: [],
  });
  const people = usePeopleStore((state) => state.people);

  useEffect(() => {
    const citiesObj: any = {};
    people.forEach((person) => {
      Object.keys(citiesObj).forEach((city) => {
        if (city === person.address.city) {
          citiesObj[person.address.city] += 1;
        } else if (!citiesObj[person.address.city]) {
          citiesObj[person.address.city] = 1;
        }
      });
      if (!citiesObj[person.address.city]) {
        citiesObj[person.address.city] = 1;
      }
    });
    const listOfCities = Object.keys(citiesObj).map((city) => {
      return city;
    });
    const numberOfPeople = Object.keys(citiesObj).map((city) => {
      return citiesObj[city];
    });
    setChartState({
      series: numberOfPeople,
      options: { ...chartState.options, labels: listOfCities },
    });
  }, [people]);

  return (
    <StyledChartDiv>
      <ApexChart
        options={chartState.options}
        series={chartState.series}
        type="pie"
        width={480}
      />
    </StyledChartDiv>
  );
}

export default Chart;
