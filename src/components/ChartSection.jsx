import React, { useEffect, useState } from "react";
import { memo } from "react";
import "./css/ChartSection.css";
import { Line } from "react-chartjs-2";
import { Chart, scales } from "chart.js/auto";
import { useSelector } from "react-redux";
const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: { display: false },
        grid: { borderDash: [1, 4], color: "gray" },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
  };
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => item.hour);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "blue" : i === 1 ? "yellow" : "red",
          tension: 0.2,
          BorderWidth: 2,
        });
      }
      console.log({ labels, datasets });
      setData({ labels, datasets });
    }
  }, [chart]);

  return (
    <div
      className="position-relative px-4"
      style={{
        marginTop: 24,
        zIndex: 0, // Đảm bảo cha không gây cản trở stacking context của con
      }}
    >
      <div
        className="position-absolute top-0 bottom-0 right-0 left-0 bg-gradient"
        style={{
          backgroundColor: "rgba(51, 16, 76, 0.95)",
          zIndex: 1, // Cha có z-index thấp hơn con
          width: "calc(100% - 3rem)",
        }}
      ></div>
      <div className="p-3" style={{ zIndex: 3, position: "relative" }}>
        {/* Đảm bảo con có stacking context */}
        <div className="">
          <h3 className="fs-2 text-light fw-bold">#zingchart</h3>
        </div>
        <div className=" text-light row">
          <div className="col-md-5 border border-danger">Rank</div>
          <div className="col-md-7 border border-danger">
            {data && <Line data={data} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
