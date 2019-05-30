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
