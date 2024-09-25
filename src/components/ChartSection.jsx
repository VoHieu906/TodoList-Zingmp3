import React, { useEffect, useState, useRef } from "react";
import { memo } from "react";
import "./css/ChartSection.css";
import { Line } from "react-chartjs-2";
import { Chart, scales } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { Link } from "react-router-dom";
import Path from "../ultis/path";
import Icons from "../ultis/Icons";
import _ from "lodash";
const { FaPlay } = Icons;
const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
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
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          // console.log(counters);
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
      className="position-relative px-4 rounded"
      style={{
        marginTop: 24,
      }}
    >
      <div
        className="position-absolute top-0 bottom-0 right-0 left-0 bg-gradient rounded"
        style={{
          backgroundColor: "rgba(51, 16, 76, 0.95)",
          zIndex: 1,
          width: "calc(100% - 3rem)",
        }}
      ></div>
      <div
        className="p-3 d-flex flex-column gap-4"
        style={{ zIndex: 3, position: "relative" }}
      >
        <Link
          to={Path.ZING_CHART}
          style={{ textDecoration: "none" }}
          className="d-flex gap-3 align-items-center text-light zing-chart"
        >
          <h3 className="fs-2  fw-bold mb-0 ">#zingchart</h3>
          <span
            className="text-success rounded-circle bg-light p-2 d-flex align-items-center justify-content-center"
            style={{ width: "30px", height: "30px" }}
          >
            <FaPlay />
          </span>
        </Link>
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
                    style={"text-light song-item-order order-bg-color"}
                  />
                </div>
              ))}
            <Link
              to={Path.ZING_CHART}
              className="text-light px-4 py-2 rounded-pill border border-light m-auto"
              style={{ textDecoration: "none", width: "fit-content" }}
            >
              Xem thêm
            </Link>
          </div>
          <div
            className="col-md-8  px-0 position-relative"
            style={{ height: 350 }}
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
                  rank?.find((i) => i.encodeId === selected)?.thumbnail
                }
                title={rank?.find((i) => i.encodeId === selected)?.title}
                artists={
                  rank?.find((i) => i.encodeId === selected)?.artistsNames
                }
                sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                style={"bg-light"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
