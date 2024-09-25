import React, { useEffect, useState } from "react";
import { memo } from "react";
import "./css/ChartSection.css";
import { Line } from "react-chartjs-2";
import { Chart, scales } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongItem } from "./";
const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspecRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
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
  }, [chart]);

  return (
    <div
      className="position-relative px-4"
      style={{
        marginTop: 24,
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
      <div
        className="p-3 d-flex flex-column gap-4"
        style={{ zIndex: 3, position: "relative" }}
      >
        <div className="">
          <h3 className="fs-2 text-light fw-bold mb-0">#zingchart</h3>
        </div>
        <div className="  row">
          <div className="col-md-4  px-0 d-flex flex-column gap-4">
            {rank
              ?.filter((i, index) => index < 3)
              ?.map((item, index) => (
                <div key={item.encodeId} style={{ width: "100%" }}>
                  <SongItem
                    thumbnail={item.thumbnail}
                    title={item.title}
                    artists={item.artistsNames}
                    sid={item.encodeId}
                    order={index + 1}
                    percent={Math.round(
                      (+item.score * 100) / +chart?.totalScore
                    )}
                  />
                </div>
              ))}
          </div>
          <div className="col-md-8  px-0" style={{ height: 350 }}>
            {data && <Line data={data} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
