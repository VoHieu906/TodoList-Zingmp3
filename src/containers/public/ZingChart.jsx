import React, { useEffect, useState } from "react";
import { apiGetChartHome } from "../../apis";
const ZingChart = () => {
  const [chartData, setChartData] = useState();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) {
        setChartData(response.data.data);
      }
    };
    fetchChartData();
  }, []);
  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#503ec2" : "#e35050",
          tension: 0.2,
          BorderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#503ec2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);
  console.log(data);

  return (
    <div className="px-3 d-flex flex-column">
      <div className="d-flex align-items-center">
        <h3>#zingchart</h3> <span>icon</span>
      </div>
      <div>chart</div>
    </div>
  );
};

export default ZingChart;
