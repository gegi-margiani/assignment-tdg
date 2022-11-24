import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { usePeopleStore } from '../../stores/people';
import { StyledChartDiv } from './Chart.styled';

type ChartObj = {
  type: string;
  value: number;
};

function Chart() {
  const [data, setData] = useState<ChartObj[]>([]);
  const config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
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
      return +citiesObj[city];
    });
    const newData = listOfCities.map((city, i) => {
      return { type: city, value: numberOfPeople[i] };
    });
    console.log(listOfCities, numberOfPeople);
    setData([...newData]);
  }, [people]);

  return (
    <StyledChartDiv>
      <Pie {...config} />
    </StyledChartDiv>
  );
}

export default Chart;
