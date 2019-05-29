import * as d3 from "d3";

const Tooltip = () => {
  const showTooltip = content => {
    tooltip.style("opacity", 1.0).html(content);
  };

  const hideTooltip = () => {
    tooltip.style("opacity", 0.0);
  };

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("pointer-events", "none");

  hideTooltip();

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip
  };
};

export default Tooltip;
