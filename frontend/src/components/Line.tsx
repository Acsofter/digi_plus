import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import "chartjs-adapter-date-fns";
import { ReactChart } from "chartjs-react";
import { useUserServices } from "../services/user.services";
import { Contexts } from "../services/Contexts";
import React from "react";

ChartJS.register(...registerables);

const chartOption = {
  responsive: true,
  maintainAspectRatio: true,

  plugins: {
    legend: {
      // display: false,
    },
  },
};

export const Line = () => {
  const { get_graph } = useUserServices();
  const { state } = React.useContext(Contexts);
  const [chartData, setChartData] = useState<any>({
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await get_graph({ graphname: "line" });
      if (response)
        setChartData((prev: any) => ({ ...prev, ...{ datasets: response } }));
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);
  return <ReactChart type="line" data={chartData} options={chartOption} />;
};