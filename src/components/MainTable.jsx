import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';

const MainTable = () => {
//   const data = [
//     { id: 1, name: "John Doe", age: 28, occupation: "Software Engineer" },
//     { id: 2, name: "Jane Smith", age: 34, occupation: "Project Manager" },
//     { id: 3, name: "Mike Johnson", age: 45, occupation: "Product Owner" },
//   ];
//   const [data, setdata] = useState([]);
//   const url = "https://script.google.com/macros/s/AKfycbyPKlFts8A4ctwiEUfPZK1Xn-0WWzjD0HIN3StFaN1MgAsSDCW-o9ahQxGgtTh61Lo4iA/exec";

const [data, setData] = useState([]);
const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');  // Fetching from public/data.json
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const sheetData = await response.json();
        setData(sheetData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (columnIndex) =>{
    let direction = 'ascending';
    if (sortConfig.key === columnIndex && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: columnIndex, direction });

    const sortedData = [...data.slice(1)].sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) {
        return direction === 'ascending'? -1 : 1;
      }
      if (a[columnIndex] > b[columnIndex]) {
        return direction === 'ascending'? 1 : -1;
      }
      return 0;
    });
    setData([data[0], ...sortedData]);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="m-20">
      <h2 className="text-3xl bg-slate-600 text-center text-white py-2">Main Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr>
            {data[0]?.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 1 && <BarChart data={data} />}
    </div>
  );
};

export default MainTable;
