import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { BubbleChartHelper } from "./D3_components/BubbleChartHelper";
import { setupToolbar } from "./D3_components/ToolbarHelper";

class BubbleChart extends Component {
  state = {
    width: this.props.width,
    height: this.props.height,
    data: this.props.data,
    labels: this.props.labels,
    selectors: this.props.selectors
  };

  getUniqueLabels(data, attr) {
    const set = new Set();
    data.map(item => set.add(item[attr]));
    let labels = [];
    set.forEach(item => labels.push({ label: item }));
    return labels;
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    const { data } = this.state;
    if (data.length > 0) {
      this.createChart();
    }
  }

  createChart = () => {
    const { data, width, height, labels, selectors } = this.state;
    const uniqueLabels = labels.map(label => this.getUniqueLabels(data, label));

    const labelsObj = {};
    labels.forEach((label, index) => {
      labelsObj[label] = uniqueLabels[index];
    });

    const bubbleChart = BubbleChartHelper(width, height, labelsObj, selectors);

    bubbleChart("#root", data);
    setupToolbar(bubbleChart);
  };

  resize = () => {
    d3.select("svg").remove();
    d3.select(".tooltip").remove();
    let currentWidth = window.innerWidth;
    let currentHeight = window.innerHeight;
    if (currentWidth !== this.state.vw) {
      this.setState({ width: currentWidth });
    }
    if (currentHeight !== this.state.vh) {
      this.setState({ height: currentHeight });
    }
    this.createChart();
  };

  render() {
    if (!this.props.data.length) {
      return <div>Loading...</div>;
    }
    return null;
  }
}

BubbleChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  labels: PropTypes.arrayOf(PropTypes.string),
  selectors: PropTypes.object
};

export default BubbleChart;
