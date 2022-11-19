import { useEffect } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import { usePeopleStore } from './stores/people';

function App() {
  const initPeople = usePeopleStore((state) => state.initPeople);

  useEffect(() => {
    initPeople();
  }, []);
  return (
    <>
      <Table />
      <Chart />
    </>
  );
}

export default App;
