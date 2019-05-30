import * as d3 from "d3";
import Tooltip from "./TooltipHelper";

export function BubbleChartHelper(width, height, labels, selectors) {
  const smallScreen = width < 600;
  const tooltip = Tooltip();
  const center = { x: width / 2, y: height / 2 };
  const maxRange = width / 30 + 20;
  const strength = 0.05;
  let sortType = null;

  function getLabelsByIndex(index) {
    return Object.entries(labels)[index][1].map(item => item.label);
  }

  const color = d3
    .scaleOrdinal()
    .domain(getLabelsByIndex(0))
    .range(["#E08E79", "#C0ADDB", "#ECE5CE", "#C5E0DC"]);

  const getNodes = data => {
    const maxValue = d3.max(data, item => {
      return item[selectors.attr[selectors.radiusIndex]];
    });

    const radiusScale = d3
      .scalePow()
      .exponent(2)
      .range([10, maxRange])
      .domain([0, maxValue]);

    const nodes = data.map(item => {
      const nodeObj = {};
      nodeObj.radius = radiusScale(item[selectors.attr[selectors.radiusIndex]]);
      selectors.attr.forEach(attr => {
        nodeObj[attr] = item[attr];
      });

      nodeObj.x = Math.random();
      nodeObj.y = Math.random();
      return nodeObj;
    });

    return nodes.sort(
      (a, b) =>
        b[selectors.attr[selectors.radiusIndex]] -
        a[selectors.attr[selectors.radiusIndex]]
    );
  };

  function updateBubblePositions() {
    bubbles
      .attr("cx", function(item) {
        return item.x;
      })
      .attr("cy", function(item) {
        return item.y;
      });
  }

  function collide(item) {
    return -Math.pow(item.radius, 2) * strength;
  }

  const simulateBubbles = d3
    .forceSimulation()
    .velocityDecay(0.2)
    .force(
      "x",
      d3
        .forceX()
        .strength(strength)
        .x(center.x)
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(strength)
        .y(center.y)
    )
    .force("collide", d3.forceManyBody().strength(collide))
    .on("tick", updateBubblePositions);

  let bubbles;
  let svg;

  const chart = function chart(selector, data) {
    const nodes = getNodes(data);

    svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("data-testid", "d3-svg");

    bubbles = svg.selectAll(".bubble").data(nodes);

    const bubbleElement = bubbles
      .enter()
      .append("circle")
      .classed("bubble", true)
      .attr("r", function(item) {
        return item.radius;
      })
      .attr("fill", function(item) {
        return color(item[selectors.attr[selectors.colorIndex]]);
      })
      .attr("stroke", function(item) {
        return d3
          .rgb(color(item[selectors.attr[selectors.colorIndex]]))
          .darker();
      })
      .attr("stroke-width", 2)
      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip);

    bubbles = bubbles.merge(bubbleElement);

    simulateBubbles.nodes(nodes);

    sortBubbles();
  };

  function sortingForce(centerProp) {
    if (smallScreen) {
      simulateBubbles.force(
        "y",
        d3
          .forceY()
          .strength(strength)
          .y(centerProp)
      );
    } else {
      simulateBubbles.force(
        "x",
        d3
          .forceX()
          .strength(strength)
          .x(centerProp)
      );
    }
  }

  const getSortedLabelsXY = labels => {
    return Object.keys(labels).map(label => {
      let arrLength = labels[label].length;
      labels[label].map(
        (item, i) =>
          (item["x"] = ((width / (arrLength + 1)) * (i + 1)).toFixed(0))
      );
      labels[label].map(
        (item, i) =>
          (item["y"] = (
            ((height - 100) / (arrLength + 1)) * (i + 1) +
            70
          ).toFixed(0))
      );
      return labels;
    });
  };

  getSortedLabelsXY(labels);

  const getLabelsByAttr = attribute => {
    return labels[sortType].map(label => label[attribute]);
  };

  const getLabel = name => {
    return labels[sortType].find(label => label.label === name);
  };

  const getLabelByType = type => {
    return labels[type];
  };

  function getLabelPosition(item, axis) {
    return getLabelByType(sortType).find(
      label => label.label === item[sortType]
    )[axis];
  }

  function getLabelPositionX(item) {
    return getLabelPosition(item, "x");
  }
  function getLabelPositionY(item) {
    return getLabelPosition(item, "y");
  }

  function hideLabels() {
    selectors.sortingLabelsIndex.map(i =>
      svg.selectAll(`.${selectors.attr[i]}`).remove()
    );
  }

  function showLabels(id) {
    const circlesData = getLabelsByAttr("label");
    const circles = svg.selectAll(`.${id}`).data(circlesData);

    let xAttr = function(item) {
      return getLabel(item).x;
    };
    let yAttr = center.y - maxRange * 3.5;

    if (smallScreen) {
      xAttr = width / 6;
      yAttr = function(item) {
        return getLabel(item).y;
      };
    }

    circles
      .enter()
      .append("text")
      .attr("class", id)
      .attr("x", xAttr)
      .attr("y", yAttr)
      .attr("text-anchor", "middle")
      .text(function(item) {
        return item;
      });
  }

  function sortBubbles(id) {
    let sortCenter = center.x;

    if (!id) {
      sortType = null;
      if (smallScreen) {
        sortCenter = center.y;
      }
    }

    hideLabels();
    if (id) {
      sortType = id;
      showLabels(id);
      sortCenter = getLabelPositionX;
      if (smallScreen) {
        sortCenter = getLabelPositionY;
      }
    }
    sortingForce(sortCenter);
    simulateBubbles.alpha(1).restart();
  }

  chart.toggleSort = function(id) {
    if (id !== "all") {
      sortBubbles(id);
    } else {
      sortBubbles();
    }
  };

  function showTooltip(item) {
    d3.select(this).attr("stroke", "#000");

    const content = `
    <div class="card w-40 shadow">
      <div class="card-body">
        <h4 class="card-title">${
          item[selectors.attr[selectors.tooltipIndex[0]]]
        }</h4>
        <h5 class="card-text">Price: $${
          item[selectors.attr[selectors.radiusIndex]]
        }</h5>
      </div>
    </div>`;
    tooltip.showTooltip(content, d3.event);
  }

  function hideTooltip(item) {
    d3.select(this).attr(
      "stroke",
      d3.rgb(color(item[selectors.attr[selectors.colorIndex]])).darker()
    );

    tooltip.hideTooltip();
  }

  return chart;
}
