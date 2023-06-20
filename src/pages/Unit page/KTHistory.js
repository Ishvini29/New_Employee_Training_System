import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const KT = (props) => (
  <tr>
    <td>{props.ktsession.unitName}</td>
    <td>{props.ktsession.sessionName}</td>
    <td>{props.ktsession.sessionDesc}</td>
    <td>{props.ktsession.old_data.sessionName}</td>
    <td>{props.ktsession.old_data.sessionDesc}</td>
    <td>{props.ktsession.updatedby}</td>
    <td>{props.ktsession.updated_at}</td>
  </tr>
);

const UnitHistory = () => {
  const [editkts, seteditkts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/editkts/")
      .then((response) => {
        seteditkts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editKTsList = () =>
    editkts.map((currentKT, i) => <KT ktsession={currentKT} key={i} />);

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
                <th>Previous KT Session Name</th>
                <th>Previous KT Session Description</th>
                <th>Updated By</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>{editKTsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnitHistory;
