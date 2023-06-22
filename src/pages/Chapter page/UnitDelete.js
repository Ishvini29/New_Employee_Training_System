import React, { useState, useEffect } from "react";
import axios from "axios";

const Unit = (props) => (
  <tr>
    <td>{props.unit.unitName}</td>
    <td>{props.unit.unitDesc}</td>
    <td>
      {props.unit.createdBy?.firstName + " " + props.unit.createdBy?.lastName}
    </td>
    <td>
      {props.unit.deletedBy?.firstName + " " + props.unit.deletedBy?.lastName}
    </td>

    <td>{props.unit.updated_at}</td>
  </tr>
);

const UnitHistory = () => {
  const [deleteunits, setdeleteunits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/deleteunits/")
      .then((response) => {
        setdeleteunits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteunitsList = () =>
    deleteunits.map((currentUnit, i) => <Unit unit={currentUnit} key={i} />);

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Unit Delete History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>Unit Description</th>
                <th>Created By</th>
                <th>Deleted By</th>
                <th>Deleted Time</th>
              </tr>
            </thead>
            <tbody>{deleteunitsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnitHistory;
