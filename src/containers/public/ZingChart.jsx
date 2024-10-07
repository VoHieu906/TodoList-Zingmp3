import React, { useEffect, useState, useRef } from "react";
import { apiGetChartHome } from "../../apis";
import { Line } from "react-chartjs-2";
import { Chart, scales } from "chart.js/auto";
import { SongItem, RankList } from "../../components";
import _ from "lodash";
import "./css/Zingchart.css";
const ZingChart = () => {
  const [chartData, setChartData] = useState();
  const [data, setData] = useState(null);
  const chartRef = useRef();
  const [selected, setSelected] = useState(false);
  const [tooltipState, setTooltipState] = useState({
    opcaity: 0,
    top: 0,
    left: 0,
  });
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspecRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.3)", drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "gray" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[
                Object.keys(chartData?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            });
          }
          const rs = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(",", "")
            )
          );
          setSelected(rs.encodeId);

          const newTooltipData = {
            opacity: 1,
            top: tooltip.caretY,
            left: tooltip.caretX,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };
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

  return (
    <div className="px-3 d-flex flex-column">
      <div className="d-flex align-items-center">
        <h3 style={{ fontWeight: "bold", fontSize: 40, color: "#0E8080" }}>
          #zingchart
        </h3>
        <span>icon</span>
      </div>
      <div className="mt-5">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 350,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data && <Line data={data} ref={chartRef} options={options} />}
          <div
            className="tooltip"
            style={{
              top: tooltipState.top,
              left: tooltipState.left,
              opacity: tooltipState.opacity,
              position: "absolute",
            }}
          >
            <SongItem
              thumbnail={
                chartData?.RTChart?.items.find((i) => i.encodeId === selected)
                  ?.thumbnail
              }
              title={
                chartData?.RTChart?.items.find((i) => i.encodeId === selected)
                  ?.title
              }
              artists={
                chartData?.RTChart?.items.find((i) => i.encodeId === selected)
                  ?.artistsNames
              }
              sid={
                chartData?.RTChart?.items.find((i) => i.encodeId === selected)
                  ?.encodeId
              }
              style={"bg-light"}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <RankList data={chartData?.RTChart?.items} />
      </div>
    </div>
  );
};

export default ZingChart;
