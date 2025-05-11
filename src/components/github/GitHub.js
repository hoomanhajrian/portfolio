import React from "react";
import GitHubCalendar from "react-github-calendar";


const recentYear = new Date().getFullYear();
const years = new Array(recentYear - 2019).fill(2020);

const GitHub = () => {

  return (
    <div className="github">
      {years.map((year,index) => {
        return (
          <div key={index}>
            <h4 className="header">{year + index}</h4>
            <GitHubCalendar
              username="hoomanhajrian"
              blockRadius="50"
              year={year + index}
              colorScheme="light"
              hideColorLegend
              hideMonthLabels
              hideTotalCount
            />
          </div>
        );
      })}
    </div>
  );

};
export default GitHub;
