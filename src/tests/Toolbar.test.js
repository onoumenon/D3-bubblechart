import React from "react";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Toolbar from "./../components/Toolbar";

const labels = ["labelA", "labelB"];
const activeLabel = "labelC";

describe("Toolbar", () => {
  it("should display the labels", () => {
    const { getByText } = render(
      <Toolbar labels={labels} activeLabel={activeLabel} />
    );
    expect(getByText(/labelA/i)).toBeInTheDocument();
    expect(getByText(/labelB/i)).toBeInTheDocument();
    expect(getByText(/labelC/i)).toBeInTheDocument();
  });
});
