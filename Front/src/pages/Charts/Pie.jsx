import React, { useEffect, useState } from 'react';
import PieChart from '../../components/PieChart';
import ChartsHeader from '../../components/ChartsHeader';
import { useLanguage } from '../../contexts/contextLanguage';


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
        const newData = alterarTextoEmIngles(data);
        setDataSource(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function alterarTextoEmIngles(data) {
    if (language === 'en') {
      const newData = data.map(item => {
        switch (item.x) {
          case "Em desenvolvimento":
            return { ...item, x: "In progress" };
          case "Concluído":
            return { ...item, x: "Completed" };
          case "Aprovado":
            return { ...item, x: "Approved" };
          case "Arquivado":
            return { ...item, x: "Archived" };
          case "Esperando aprovação":
            return { ...item, x: "Waiting for approval" };
          default:
            return item;
        }
      });
      return newData;
    } else {
      return data;
    }
  }

  useEffect(() => {
    fetchData();
  }, [language]); // Observa a variável "language"

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