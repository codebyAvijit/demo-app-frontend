import React from "react";
import "./Confirmation.css";
import axios from "axios";
const URL = process.env.REACT_APP_API;

const Confirmation = ({ cancel, confirm, refresh, refVal }) => {
  const onClickCancel = () => {
    cancel(false);
  };
  const onConfirm = async () => {
    const data = await axios.delete(`${URL}/remove/${confirm}`);
    refresh(!refVal);
    cancel(false);
  };
  return (
    <div className="cons-main">
      <div className="confirmation">
        <div className="conf-head">
          <h1>Confirmation</h1>
          <button onClick={onClickCancel}>Cancel</button>
        </div>
        <div className="main-head">
          <h2>Are You Sure You want To Delete This Record?</h2>
        </div>
        <div className="footer">
          <div>
            <button onClick={onClickCancel}>NO</button>
            <button onClick={onConfirm}>YES</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
