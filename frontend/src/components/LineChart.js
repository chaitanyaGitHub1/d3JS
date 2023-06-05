import React, { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft,
} from "d3";
import axios from "axios";

function LineChart() {
  const chartContainerRef = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/data/movies/yearly"
        ); // Replace with your API endpoint to fetch movie data
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    select(chartContainerRef.current).selectAll("svg").remove();

    const svg = select(chartContainerRef.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "0 0 450 300")
      .style("width", "100%")
      .style("height", "100%")
      .append("g")
      .attr("transform", "translate(80, 20)"); // Apply margin

    const margin = { top: 20, right: 20, bottom: 50, left: 80 };
    const width = 450 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(data.map((d) => getMonthAbbreviation(d._id.month)))
      .range([0, width])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.count))])
      .range([height, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll(".tick text")
      .attr("dy", "0.5em");

    svg.append("g").call(yAxis);

    const line2010 = line()
      .x(
        (d) =>
          xScale(getMonthAbbreviation(d._id.month)) + xScale.bandwidth() / 2
      )
      .y((d) => yScale(d.count));

    const line2011 = line()
      .x(
        (d) =>
          xScale(getMonthAbbreviation(d._id.month)) + xScale.bandwidth() / 2
      )
      .y((d) => yScale(d.count));

    svg
      .append("path")
      .datum(data.filter((d) => d._id.year === 2010))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line2010);

    svg
      .append("path")
      .datum(data.filter((d) => d._id.year === 2011))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line2011);

    svg
      .append("text")
      .attr("x", width + margin.right)
      .attr("y", yScale(0) - 10)
      .attr("text-anchor", "end")
      .text("Count");

    svg
      .append("text")
      .attr("x", width + margin.right)
      .attr("y", yScale(0) - 30)
      .attr("text-anchor", "end")
      .style("fill", "blue")
      .text("Year 2010");

    svg
      .append("text")
      .attr("x", width + margin.right)
      .attr("y", yScale(0) - 50)
      .attr("text-anchor", "end")
      .style("fill", "red")
      .text("Year 2011");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Movies released in current and previous year");
  }, [data]);

  const getMonthAbbreviation = (month) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months[month - 1];
  };

  return <div ref={chartContainerRef}></div>;
}

export default LineChart;
