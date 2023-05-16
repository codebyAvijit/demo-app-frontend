import axios from "axios";
import React, { useState } from "react";
import "./Data.css";
const URL = process.env.REACT_APP_API;
const Data = ({ visible, refresh, refVal }) => {
  const [error, setError] = useState("");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
    country: "",
    state: "",
    city: "",
    language: "",
    isActive: false,
  });
  const cancelHandler = () => {
    visible(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(data);
    const { name, email, password, Cpassword, country, state, city, language } =
      data;
    if (
      !name ||
      !email ||
      !password ||
      !Cpassword ||
      !country ||
      !state ||
      !city ||
      !language
    ) {
      setError(`Please Fill All the details`);
    } else if (password !== Cpassword) {
      setError(`Passwords Does Not Match`);
    } else {
      const submitData = async (data) => {
        try {
          let temp = data.isActive === "on" ? true : false;
          const uploadData = await axios.post(`${URL}/create`, {
            ...data,
            isActive: temp,
          });
          refresh(!refVal);
          // console.log(uploadData);
        } catch (err) {
          console.log(err);
        }
      };
      submitData(data);
      visible(false);
      setError(``);
    }
  };
  return (
    <div className="formsection">
      <div className="form-sec-head">
        <h1>MANAGE CUSTOMER</h1>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="name">Full Name</label>
          <input
            placeholder="Enter Full Name"
            type="text"
            value={data.name}
            onChange={(e) => {
              setdata({ ...data, name: e.target.value });
            }}
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Email"
            type="email"
            value={data.email}
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            value={data.password}
            onChange={(e) => {
              setdata({ ...data, password: e.target.value });
            }}
          />
        </div>
        <div className="input">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            placeholder="Enter Confirm Password"
            type="password"
            value={data.Cpassword}
            onChange={(e) => {
              setdata({ ...data, Cpassword: e.target.value });
            }}
          />
        </div>
        <div className="input">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            onChange={(e) => {
              setdata({
                ...data,
                country: e.target.value,
              });
            }}
          >
            <option defaultValue={true}>Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="state">State</label>
          <select
            id="state"
            onChange={(e) => {
              setdata({
                ...data,
                state: e.target.value,
              });
            }}
          >
            <option defaultValue={true}>Select State</option>
            <option value="Delhi">Delhi</option>
            <option value="Mp">Mp</option>
            <option value="Maharastra">Maharastra</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="city">City</label>
          <select
            id="city"
            onChange={(e) => {
              setdata({
                ...data,
                city: e.target.value,
              });
            }}
          >
            <option defaultValue={true}>Select City</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="languages">Languages</label>
          <select
            id="languages"
            onChange={(e) => {
              setdata({
                ...data,
                language: e.target.value,
              });
            }}
          >
            <option defaultValue={true} multiple>
              Select Multiple Languages
            </option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            onChange={(e) => {
              setdata({
                ...data,
                isActive: e.target.value,
              });
            }}
            id="active"
          />
        </div>
        {error && <h3 className="error"> {error}</h3>}
        <div className="inputbtn">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Data;
