import React, { useEffect, useState } from 'react';
import PieChart from '../../components/PieChart';
import ChartsHeader from '../../components/ChartsHeader';
import { useLanguage } from '../../contexts/contextLanguage';
import pieTranslate from '../../utils/tradutor/chart/tradutorPie';

function Pie() {
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
        const newData = translateLabels(data);
        setDataSource(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function translateLabels(data) {
    const translation = pieTranslate[language];

    const newData = data.map(item => {
      const translatedLabel = translation.labels[item.x] || item.x;
      return { ...item, x: translatedLabel };
    });

    return newData;
  }

  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader tipo={pieTranslate[language].tipopag} category={pieTranslate[language].titulopag} title={pieTranslate[language].nomeGrafico} />
      <div className="w-full">
        <PieChart id="chart-pie" legenda={pieTranslate[language].legenda} data={dataSource} legendVisiblity height="full" />
      </div>
    </div>
  )
};

export default Pie;
