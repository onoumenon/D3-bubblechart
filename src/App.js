import React, { Component } from "react";
import "./App.css";
import BubbleChart from "./components/BubbleChart";
import Toolbar from "./components/Toolbar";
import * as stalls from "./data/data.json";
import { activeLabel, labels, selectors } from "./data/labels";

class App extends Component {
  state = {
    vw: window.innerWidth,
    vh: window.innerHeight,
    data: stalls.default
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.resize);
  };

  resize = () => {
    let currentWidth = window.innerWidth;
    let currentHeight = window.innerHeight;
    if (currentWidth !== this.state.vw) {
      this.setState({ vw: currentWidth });
    }
    if (currentHeight !== this.state.vh) {
      this.setState({ vh: currentHeight });
    }
  };
  render() {
    const { vw, vh, data } = this.state;
    return (
      <div className="App container">
        <Toolbar labels={labels} activeLabel={activeLabel} />
        <BubbleChart
          data={data}
          width={vw}
          height={vh}
          labels={labels}
          selectors={selectors}
        />
      </div>
    );
  }
}

export default App;
