import Tasks from "./Tasks";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UnitList = (props) => {
  const chapterId = props.chapterID;
  console.log("This is a data" + chapterId);
  const [units, setunits] = useState([]);

  useEffect(() => {
    // axios.get(process.env.REACT_APP_API_BASE+`/units?belongsToChapter=${chapterId}`)
    axios
      .get(process.env.REACT_APP_API_BASE + `/units?chapterId=${chapterId}`)
      .then((response) => {
        setunits(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.toDoRefresh, chapterId]);

  return (
    <div>
      <div>
        {units.map((unit) => {
          return (
            <Tasks
              chapterID={props.chapterID}
              chapterName={props.chapterName}
              key={unit._id}
              unit={unit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UnitList;
