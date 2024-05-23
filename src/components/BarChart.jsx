import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const jobTitleCounts = data.slice(1).reduce((acc, row) => {
    const jobTitle = row[3];
    if (acc[jobTitle]) {
      acc[jobTitle] += 1;
    } else {
      acc[jobTitle] = 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(jobTitleCounts), // Job Titles
    datasets: [{
      label: 'Count',
      data: Object.values(jobTitleCounts), // Count of each Job Title
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Job Titles by Count',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
