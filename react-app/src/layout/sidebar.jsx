import react from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">AdminKit</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/"}>
              <i className="align-middle" data-feather="sliders"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

          {/* <li className="sidebar-item">
            <Link className="sidebar-link" to={"/boards"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Board</span>
            </Link>
          </li> */}
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/users"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Team</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/boards"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Boards</span>
            </Link>
          </li>

     


        </ul>

        {/* <div className="sidebar-cta">
          <div className="sidebar-cta-content">
            <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
            <div className="mb-3 text-sm">
              Are you looking for more components? Check out our premium
              version.
            </div>
            <div className="d-grid">
              <a href="upgrade-to-pro.html" className="btn btn-primary">
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
