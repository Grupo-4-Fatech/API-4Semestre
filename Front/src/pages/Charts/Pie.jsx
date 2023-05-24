import React, { useEffect, useState } from 'react';

import { pieChartData } from '../../data/dummy';
import PieChart from '../../components/PieChart';
import ChartsHeader from '../../components/ChartsHeader';
import { useStateContext } from '../../contexts/ContextProvider';
import { useLanguage } from '../../contexts/contextLanguage';


function Pie() {
  const { currentMode, currentColor } = useStateContext();
  const [dataSource, setDataSource] = useState([]);
  const { language } = useLanguage();

  function fetchData() {
    fetch("/chart/pie", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader tipo='Gráfico' category="Pie" title="Quantidade de tickets por status" />
      <div className="w-full">
        <PieChart id="chart-pie" data={dataSource} legendVisiblity height="full" />
      </div>
    </div>
  )
};

export default Pie;