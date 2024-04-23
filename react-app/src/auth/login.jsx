import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CustomRequest from "../utils/customRequest.jsx";
import {
  selectAuthToken,
  setUserLoginStatus,
} from "../features/UserAuthSlice.js";

import {jwtDecode} from 'jwt-decode'



function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  // component on load logic
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate]);



// handle user login
  const onLogin = async (e) => {
    e.preventDefault();
    const data = {
          email: form.email,
          password: form.password,
        };

    try {
      const resp = await CustomRequest.post("/auth/login", data);
      const token = await resp.data?.token;
      const user = jwtDecode(token);
      dispatch(setUserLoginStatus({ token, user }));
      toast.success(resp.data?.msg);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg);
    }
  };






  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center">
                      <img
                        src="%PUBLIC_URL%/../img/avatars/avatar.jpg"
                        alt="Charles Hall"
                        className="img-fluid rounded-circle"
                        width="132"
                        height="132"
                      />
                    </div>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          value={form.email}
                          name="email"
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          placeholder="Enter your password"
                        />
                        <small>
                          <a href="#">Forgot password?</a>
                        </small>
                      </div>
                      <div>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            onChange={(e) =>
                              setForm({ ...form, remember_me: e.target.value })
                            }
                            name="remember-me"
                          />
                          <span className="form-check-label">
                            Remember me next time
                          </span>
                        </label>
                      </div>
                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary"
                          onClick={onLogin}
                        >
                          Sign in
                        </button>
                        <NavLink to={"/register"} className="ms-3">
                          Register
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Login;
