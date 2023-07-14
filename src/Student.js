import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = "http://localhost:8081/";


const Student = () => {
  const [students, setStudents] = useState([]);
  const fetchData = async (url) => {
    try {
      const data = await axios.get(url);
      setStudents(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(API);
  }, []);

  const handleDelete = async (id) =>{
    try {
        await axios.delete("http://localhost:8081/student/"+id)
        window.location.reload()
        
    } catch (error) {
        console.error(error)
        
    }

  }

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-75 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success ">Add +</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((data, i) => (
                <tr kay={i}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>
                        <Link to={`update/${data.id}`} className="btn btn-primary">Update</Link>
                        <button onClick={e => handleDelete(data.id)} className="btn btn-danger ms-2">Delete</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
