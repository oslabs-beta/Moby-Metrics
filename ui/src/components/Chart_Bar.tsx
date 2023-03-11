import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart_Bar(barOptions: object,barData: object) {
  const options = {
    responsive: true,
  };

  return (
      <Bar options={barOptions} data={barData} />
  );
}

export default Chart_Bar;
