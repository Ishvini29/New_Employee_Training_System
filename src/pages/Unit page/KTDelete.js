import React, { useState, useEffect } from "react";
import axios from "axios";

const KT = (props) => (
  <tr>
    <td>{props.ktsession.unitName}</td>
    <td>{props.ktsession.sessionName}</td>
    <td>{props.ktsession.sessionDesc}</td>
    <td>
      {props.ktsession.createdBy?.firstName +
        " " +
        props.ktsession.createdBy?.lastName}
    </td>
    <td>
      {props.ktsession.deletedBy?.firstName +
        " " +
        props.ktsession.deletedBy?.lastName}
    </td>

    <td>{props.ktsession.updated_at}</td>
  </tr>
);

const KTHistory = () => {
  const [deletekts, setdeletekts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/deletekts/")
      .then((response) => {
        setdeletekts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteKTsList = () =>
    deletekts.map((currentKT, i) => <KT ktsession={currentKT} key={i} />);

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>KT Session Edit History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>KT Session Name</th>
                <th>KT Session Description</th>
                <th>Created By</th>
                <th>Deleted By</th>
                <th>Deleted Time</th>
              </tr>
            </thead>
            <tbody>{deleteKTsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KTHistory;
