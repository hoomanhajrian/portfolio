import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitHub = (props) => {
  const gitHubContainerStyle = {
    margin: "auto",
  };

  return (
    <>
      <h4>{props.year}</h4>
      <GitHubCalendar
        username="hoomanhajrian"
        blockRadius="50"
        year={props.year}
        hideColorLegend
        hideMonthLabels
        hideTotalCount
        style={gitHubContainerStyle}
      />
    </>
  );
};

export default GitHub;
