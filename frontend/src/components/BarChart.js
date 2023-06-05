import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import axios from "axios";

function BarChart() {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [chartRendered, setChartRendered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/data/weather"
        ); // Replace with your API endpoint to fetch weather data
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartRef.current && !chartRendered) {
      setChartRendered(true);

      const sortedData = data.sort((a, b) => a._id.month - b._id.month);

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(sortedData.map((item) => monthNames[item._id.month - 1]))
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(sortedData, (item) => item.maxTemp)]);

      const colorScale = d3
        .scaleSequential(d3.interpolateReds)
        .domain([0, d3.max(sortedData, (item) => item.maxTemp)]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));

      svg
        .selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (item) => xScale(monthNames[item._id.month - 1]))
        .attr("y", (item) => yScale(item.maxTemp))
        .attr("width", xScale.bandwidth())
        .attr("height", (item) => height - yScale(item.maxTemp))
        .attr("fill", (item) => colorScale(item.maxTemp));

    
       // Add title
       svg
       .append('text')
       .attr('x', width / 2)
       .attr('y', -margin.top / 2)
       .attr('text-anchor', 'middle')
       .style('font-size', '16px')
       .text('Intensity of Heat');
    }
  }, [data, chartRendered]);

  return data.length > 0 ? <div ref={chartRef}></div> : null;
}

export default BarChart;
