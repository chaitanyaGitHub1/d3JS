import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      fill="white"
      fontSize="10"
    >
      {format(data.value)}
    </text>
  </g>
);

const Pie = (props) => {
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeSet3);

  const format = d3.format(".2f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            index={i}
            data={d}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
      </g>
      <g transform={`translate(${props.outerRadius * 2 + 20} 20)`}>
        {props.data.map((d, i) => (
          <g key={i} transform={`translate(0 ${i * 25})`}>
            <rect width="20" height="20" fill={colors(i)} />
            <text x="30" y="14" fontSize="12" fill="black">
              {d.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

function AgePieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/data/mobile"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  const formattedData = Object.entries(data).map(([key, value]) => ({
    value,
    label: key,
  }));

  return (
    <div className="App">
      <h1>Pie Chart to represent all the mobile user age groups</h1>
      <div className="piechart">
        <Pie
          data={formattedData}
          width={400}
          height={400}
          innerRadius={100}
          outerRadius={150}
        />
      </div>
    </div>
  );
}

export default AgePieChart;
