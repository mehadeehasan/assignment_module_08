import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = (props) => {
  return (
    <div>
      <div>
        <div className="navbar fixed z-50 top-0 shadow bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to={"/"}>Home</NavLink>{" "}
                </li>
                <li>
                  <NavLink to={"/income"}>Income</NavLink>
                </li>
                <li>
                  <NavLink to={"/expense"}>Expense</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <h3 className="navbar-start">Income and Expense Tracker</h3>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to={"/"}>Home</NavLink>{" "}
              </li>
              <li>
                <NavLink to={"/income"}>Income</NavLink>
              </li>
              <li>
                <NavLink to={"/expense"}>Expensive</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {props.children}
      <ToastContainer
        className="italic text-sm font-white"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default layout;
