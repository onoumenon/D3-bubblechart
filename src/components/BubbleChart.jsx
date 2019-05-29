import React, { Component } from "react";
import PropTypes from "prop-types";

class BubbleChart extends Component {
  static defaultProps = {
    width: 0,
    height: 0,
    data: []
  };

  getUniqueLabels(data, attr) {
    const set = new Set();
    data.map(item => set.add(item[attr]));
    let labels = [];
    set.forEach(item => labels.push({ label: item }));
    return labels;
  }

  componentDidMount() {
    const { data, width, height, labels } = this.props;
    if (data.length > 0) {
      const uniqueLabels = labels.map(label =>
        this.getUniqueLabels(data, label)
      );

      const labelsObj = {};
      labels.forEach((label, index) => {
        labelsObj[label] = uniqueLabels[index];
      });
    }
  }

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
  data: PropTypes.array
};

export default BubbleChart;