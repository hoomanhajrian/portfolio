import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitHub = (props) => {
  const gitHubContainerStyle = {
    margin: "auto",
    color: "red blue",
  };

  return (
    <>
      <h4>{props.year}</h4>
      <GitHubCalendar
        username="hoomanhajrian"
        blockRadius="50"
        year={props.year}
        colorScheme="light"
        hideColorLegend
        hideMonthLabels
        hideTotalCount
        style={gitHubContainerStyle}
      />
    </>
  );
};

export default GitHub;
