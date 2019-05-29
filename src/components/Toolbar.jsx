import React from "react";

const Toolbar = ({ activeLabel, labels }) => {
  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div id="toolbar">
      <nav className="navbar navbar-light fixed-top bg-transparent">
        <div className="btn-group" role="group">
          <button
            id="all"
            type="button"
            className="button active btn btn-lg btn-light
              shadow-sm"
          >
            {capitalize(activeLabel)}
          </button>

          {labels.map((label, index) => (
            <button
              key={index}
              id={label}
              type="button"
              className="button btn btn-lg btn-light shadow-sm"
            >
              Group by {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Toolbar;
