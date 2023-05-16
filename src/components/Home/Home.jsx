import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Data from "../Data/Data";
import Confirmation from "../Confirmation/Confirmation";
const URL = process.env.REACT_APP_API;
const Home = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [formDisplay, setFormDisplay] = useState(false);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({});
  const [update, setUpdate] = useState({});
  const [onDel, setOnDel] = useState(false);
  const [onConfirm, setOnConfirm] = useState("");
  const addNew = () => {
    setFormDisplay(true);
  };
  const onEdit = (id) => {
    // setIsEdit(true);
    console.log(id);
    setEditId(id);
  };
  const onDelete = async (id) => {
    console.log(id);
    setOnDel(true);
    setIsEdit(true);
    setOnConfirm(id);
  };
  const onSave = async () => {
    // setIsEdit(false);
    console.log(update);
    const { name, email, country, state, city, language } = update;
    const data = await axios.put(`${URL}/update/${update._id}`, {
      name,
      email,
      country,
      state,
      city,
      language,
    });
    console.log(data);
    setEditId("");
  };
  const onCancel = () => {
    // setIsEdit(false);
    setEditId("");
  };

  useEffect(() => {
    const getData = async () => {
      const userData = await axios.get(`${URL}/getall`);
      setData(userData.data);
    };
    getData();
  }, [editId, isEdit]);

  useEffect(() => {
    const dataEdit = data.filter((items) => {
      return items._id === editId;
    });
    setUpdate(...dataEdit);
    if (update) {
      setEditData({
        name: update.name,
        email: update.email,
        country: update.country,
        state: update.state,
        city: update.city,
        language: update.language,
      });
    }
  }, [editId]);

  return (
    <>
      {onDel && (
        <Confirmation
          cancel={setOnDel}
          confirm={onConfirm}
          refresh={setIsEdit}
          refVal={isEdit}
        />
      )}
      <div className="home">
        <div className="userlist">
          <div className="head">
            <h1>CUSTOMER LIST</h1>
            <button onClick={addNew}>ADD NEW</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Languages</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, key) => {
                let date = new Date(items.createdAt);
                let format = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                return (
                  <React.Fragment key={items._id}>
                    {editId === items._id && update ? (
                      <tr key={items._id}>
                        <td>{key + 1}</td>
                        <td>
                          <input
                            type="text"
                            value={update.name}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, name: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={update.email}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, email: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={update.country}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, country: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={update.state}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, state: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={update.city}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, city: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={update.language}
                            className="editinput"
                            onChange={(e) =>
                              setUpdate({ ...update, language: e.target.value })
                            }
                          />
                        </td>
                        <td>{format}</td>

                        <td className="action">
                          <button onClick={() => onSave(items._id)}>
                            Save
                          </button>
                          <button onClick={onCancel}>Cancel</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={items._id}>
                        <td>{key + 1}</td>
                        <td>{items.name}</td>
                        <td>{items.email}</td>
                        <td>{items.country}</td>
                        <td>{items.state}</td>
                        <td>{items.city}</td>
                        <td>{items.language}</td>
                        <td>{format}</td>
                        <td className="action">
                          <button onClick={() => onEdit(items._id)}>
                            Edit
                          </button>
                          <button onClick={() => onDelete(items._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {formDisplay && (
          <Data visible={setFormDisplay} refresh={setIsEdit} refVal={isEdit} />
        )}
      </div>
    </>
  );
};

export default Home;
