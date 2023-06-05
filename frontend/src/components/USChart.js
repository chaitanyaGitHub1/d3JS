import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import usStatesData from '../us-states.json';

function USChart() {
  const [data, setData] = useState([]);
  const [chartRendered, setChartRendered] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/data/crimes'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && mapRef?.current && !chartRendered) {
      setChartRendered(true);

      const containerWidth = mapRef.current.clientWidth;
      const containerHeight = Math.min(600, containerWidth * 0.75); // Adjust the aspect ratio as needed

      const svg = d3
        .select(mapRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

      const projection = d3
        .geoAlbersUsa()
        .translate([containerWidth / 2, containerHeight / 2])
        .scale(containerWidth * 1.3); // Adjust the scale factor as needed to fit the map

      const path = d3.geoPath().projection(projection);

      const colorScale = d3
        .scaleSequential(d3.interpolateReds)
        .domain([0, d3.max(data, (d) => d.Murder)]);

      svg
        .selectAll('path')
        .data(usStatesData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const stateData = data.find(
            (state) => state.State === d.properties.stateName
          );
          return stateData ? colorScale(stateData.Murder) : 'lightgray';
        });

      // Add text to the chart
      svg
        .append('text')
        .attr('x', containerWidth / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Crime rate in USA');
    }
  }, [data]);

  return <div id='us-chart' ref={mapRef}></div>;
}

export default USChart;
