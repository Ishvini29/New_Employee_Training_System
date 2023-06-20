import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const Unit = (props) => (
  <tr>
    <td>{props.unit.unitName}</td>
    <td>{props.unit.unitDesc}</td>
    <td>{props.unit.old_data.unitName}</td>
    <td>{props.unit.old_data.unitDesc}</td>
    <td>{props.unit.updatedby}</td>
    <td>{props.unit.updated_at}</td>
  </tr>
);

const UnitHistory = () => {
  const [editunits, seteditunits] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/editunits/")
      .then((response) => {
        seteditunits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editunitsList = () =>
    editunits.map((currentUnit, i) => <Unit unit={currentUnit} key={i} />);

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Unit Edit History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>Unit Description</th>
                <th>Previous Unit Name</th>
                <th>Previous Unit Description</th>
                <th>Updated By</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>{editunitsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnitHistory;
