






function PageNotFound(){



    return(
        <main className="d-flex w-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 className="h2 " style={{fontSize:"40px"}}><b>404</b></h1>
                        <p>Page Not Found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}
export default PageNotFound;