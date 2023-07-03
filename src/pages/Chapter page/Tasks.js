import Edit from "./EditUnit";
import Delete from "./DeleteUnit";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Tasks = ({ unit, chapterName, chapterID }) => {
  const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
  const userRole = userDocument?.userRole;
  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body' style={{ backgroundColor: '#ADD8E6' }}>
          <div class='col-lg-12'>

            <h3 style={{ font: '25px', color: '#000000' }}>
              <Link to={"/Unit/" + chapterID + "/" + chapterName + "/" + unit._id + "/" + unit.unitName} style={{ textDecoration: "none", color: "#000000" }}>
                {unit.unitName}
              </Link>
            </h3>
            {
              (["Content Creator", "Supervisor"].includes(userRole))
              &&
              <div>
                <Edit key={unit._id} unit={unit} />
              </div>
            }
            <p>{unit.unitDesc} </p>
            {
              (["Content Creator", "Supervisor"].includes(userRole))
              &&
              <div>
                <Delete key={unit._id} unit={unit} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Tasks;