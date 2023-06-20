import KTs from './KTs';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const UnitList = (props) => {
  const { id } = useParams();
  const [KTsessions, setKTsessions] = useState([]);
  // id={id} chapterName={chapterName} chapterID={chapterID} unitName={unitName}

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_API_BASE+'/kts/')
  //     .then(response => {
  //       setKTsessions(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE+`/kts?unitId=${id}`)
      .then(response => {
        setKTsessions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <div>

      <div>
        {KTsessions.map(KTsession => {
          return (
            <KTs
              key={KTsession._id}
              KTsession={KTsession}
              unitId={id}
              chapterName={props.chapterName}
              chapterID={props.chapterID}
              unitName={props.unitName}
            />
          )
        })}
      </div>

    </div>


  );
}

export default UnitList;