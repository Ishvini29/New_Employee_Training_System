import React from "react";
import { Link } from "react-router-dom";

const EditHistory = () => {
  return (
    <React.Fragment>
      <div
        style={{ backgroundColor: "#fefefe", height: "100vh" }}
        className="d-flex align-items-center"
      >
        <div className="container p-4 text-center">
          <div className="d-grid gap-2 col-6 mx-auto">
            <Link to={"/editunits"}>
              <button type="button" class="btn btn-secondary form-control">
                Unit History
              </button>
            </Link>
            <Link to={"/editkts"}>
              <button type="button" class="btn btn-secondary form-control">
                KT Session History
              </button>
            </Link>
            <Link to={"/editarticles"}>
              <button type="button" class="btn btn-secondary form-control">
                Article History
              </button>
            </Link>
            <Link to={"/editforums"}>
              <button type="button" class="btn btn-secondary form-control">
                Discussion Forum History
              </button>
            </Link>
            <Link to={"/editquestions"}>
              <button type="button" class="btn btn-secondary form-control">
                Quiz Questions History
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditHistory;
