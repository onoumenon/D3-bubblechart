import * as d3 from "d3";

export const setupToolbar = chart => {
  d3.select("#toolbar")
    .selectAll(".button")
    .on("click", function() {
      d3.selectAll(".button").classed("active", false);

      let button = d3.select(this);
      button.classed("active", true);

      let buttonId = button.attr("id");
      chart.toggleSort(buttonId);
    });
};
