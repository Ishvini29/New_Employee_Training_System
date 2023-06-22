import KTs from "./KTs";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UnitList = (props) => {
  const { id } = useParams();
  const [KTsessions, setKTsessions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/kts?unitId=${id}`)
      .then((response) => {
        setKTsessions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div>
        {KTsessions.map((KTsession) => {
          return (
            <KTs
              key={KTsession._id}
              KTsession={KTsession}
              unitId={id}
              chapterName={props.chapterName}
              chapterID={props.chapterID}
              unitName={props.unitName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UnitList;
