import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      {/* <!-- kanban --> */}

      <div className="d-flex flex-row flex-wrap kanban-container">
        <div className="card board">
          <div className="card-header">
            <h1 className="card-title">Queue</h1>
            <p className="card-subtitle">All tasks assigned by project owner</p>
          </div>
          <div className="card-body">
            <ul className="list-unstyled tasks-list">
              <li className="task" draggable="true">
                <div className="d-flex flex-row task-header">
                  <div className="priority flex-fill">
                    <span className="badge bg-danger" title="priority">
                      High
                    </span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#" className="task-link">
                  <h4>Create landing page</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa.
                </p>
                <div className="d-flex flex-row task-footer">
                  <div className="added-by flex-fill">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                    <a className="comments ms-2 text-decoration-none">
                      <i className="fa fa-comments"></i>
                      200+
                    </a>
                  </div>
                  <div className="menu flex-fill text-end ">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg> --> */}
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="task">
                <div className="d-flex flex-row">
                  <div className="priority flex-fill">
                    <span className="badge bg-info">low</span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#">
                  <h4>Fix post comments cystem</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa, harum voluptates quidem porro,
                  possimus maiores ad maxime suscipit. Sequi.
                </p>

                <div className="d-flex flex-row">
                  <div className="added-by flex-fill">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                  </div>
                  <div className="menu flex-fill text-end">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg> --> */}
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="card board">
          <div className="card-header">
            <h1 className="card-title">In-Progress</h1>
            <p className="card-subtitle">All tasks under progress</p>
          </div>
          <div className="card-body">
            <ul className="list-unstyled tasks-list">
              <li className="task" draggable="true">
                <div className="d-flex flex-row task-header">
                  <div className="priority flex-fill">
                    <span className="badge bg-warning" title="priority">
                      Medium
                    </span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#" className="task-link">
                  <h4>Create landing page</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa, harum voluptates quidem porro,
                  possimus maiores ad maxime suscipit. Sequi.
                </p>
                <div className="d-flex flex-row task-footer">
                  <div className="added-by flex-fill d-flex flex-row">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                    <a className="comments ms-2 text-decoration-none">
                      <i className="fa fa-comments"></i>
                      200+
                    </a>
                  </div>
                  <div className="menu flex-fill text-end ">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg> --> */}
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="task">
                <div className="d-flex flex-row">
                  <div className="priority flex-fill">
                    <span className="badge bg-danger">High</span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#">
                  <h4>Fix post comments cystem</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa, harum voluptates quidem porro,
                  possimus maiores ad maxime suscipit. Sequi.
                </p>

                <div className="d-flex flex-row">
                  <div className="added-by flex-fill">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                  </div>
                  <div className="menu flex-fill text-end">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg> --> */}
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="card board">
          <div className="card-header">
            <h1 className="card-title">Complete</h1>
            <p className="card-subtitle">All completed tasks</p>
          </div>
          <div className="card-body">
            <ul className="list-unstyled tasks-list">
              <li className="task" draggable="true">
                <div className="d-flex flex-row task-header">
                  <div className="priority flex-fill">
                    <span className="badge bg-danger" title="priority">
                      High
                    </span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#" className="task-link">
                  <h4>Create landing page</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa, harum voluptates quidem porro,
                  possimus maiores ad maxime suscipit. Sequi.
                </p>
                <div className="d-flex flex-row task-footer">
                  <div className="added-by flex-fill">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                    <a className="comments ms-2 text-decoration-none">
                      <i className="fa fa-comments"></i>
                      200+
                    </a>
                  </div>
                  <div className="menu flex-fill text-end ">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg> --> */}
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="task">
                <div className="d-flex flex-row">
                  <div className="priority flex-fill">
                    <span className="badge bg-danger">High</span>
                  </div>
                  <div className="created_at flex-fill text-end">
                    18 Jul 2018
                  </div>
                </div>
                <a href="#">
                  <h4>Fix post comments cystem</h4>
                </a>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, repellat est quam sit asperiores esse sint unde
                  accusantium doloribus ipsa, harum voluptates quidem porro,
                  possimus maiores ad maxime suscipit. Sequi.
                </p>

                <div className="d-flex flex-row">
                  <div className="added-by flex-fill">
                    <span>
                      Added by: <b>Admin</b>
                    </span>
                  </div>
                  <div className="menu flex-fill text-end">
                    <div className="dropdown position-relative">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="true"
                      >
                        <i className=" fa fa-ellipsis-v"></i>
                      </a>

                      <div
                        className="dropdown-menu dropdown-menu-end "
                        data-bs-popper="static"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!-- kanban --> */}
    </div>
  );
}

export default Dashboard;
