import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import ChartsHeader from '../../components/ChartsHeader';
import { useLanguage } from '../../contexts/contextLanguage';
import barTranslate from '../../utils/tradutor/chart/tradutorBar';

const Bar = () => {
  const { currentMode, currentColor } = useStateContext();
  const [dataSource, setDataSource] = useState([]);
  const { language } = useLanguage();

  function fetchData() {
    fetch("/chart/bar", {
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

  const updatedCustomSeries = barCustomSeries.map((series) => {
    return {
      ...series,
      dataSource: dataSource,
      name: barTranslate[language].legendaGrafico,
      fill: currentColor,
    };
  });

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader tipo={barTranslate[language].tipopag} category={barTranslate[language].titulopag} title={barTranslate[language].nomeGrafico} />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            {updatedCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;
