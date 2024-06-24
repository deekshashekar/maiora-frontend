import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [reason, setReason] = useState("");
  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3844/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setStudentsList(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleAddName = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newStudent = {
      name: studentName,
      class: studentClass,
      section: studentSection,
      reason: reason,
    };
    try {
      const response = await fetch("http://localhost:3844/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const data = await response.json();
        setStudentsList((prevData) => [...prevData, data]);
        setStudentName("");
        setIsModalOpen(false);
      } else {
        console.error("Failed to add leave");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(studentsList);
  return (
    <div>
      <header className="header-container">
        <div className="school">
          <div>Delhi Public School</div>
        </div>
        <div className="account">
          <div>
            Free Trail <span style={{ color: "#CCCC12" }}>30 Days Trail</span>{" "}
            Buy Now
          </div>
          <div>John Doremono</div>
          <div>🔔</div>
        </div>
      </header>
      <main className="main-container">
        <div className="navbar">
          <div className="student-name">
            <div className="name" style={{ backgroundColor: "#ECB040" }}>
              John Doremon
            </div>
            <div>🕸</div>
          </div>
          <div className="super-admin">
            <div>👁 Go To Super Admin</div>
            <div>📁 My School</div>
            <div>👁 School Management</div>
          </div>
          <div>
            <div className="acad">👁 Academics</div>
            <ul className="acad-list">
              <li>Dashboard</li>
              <li>Class</li>
              <li>Sections</li>
              <li>Subjects</li>
              <li>Time Table</li>
              <li>Attendance</li>
              <li
                style={{
                  backgroundColor: "#27276A",
                  height: "30px",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                Student Leave
              </li>
              <li>Study Materials</li>
              <li>Home Work</li>
              <li>Notice board</li>
              <li>Events</li>
              <li>Live Classes (Go Pro)</li>
            </ul>
          </div>
        </div>

        <div className="student-details">
          <div className="stu">Home/Academic/Subjects</div>
          <div>
            <h1 style={{ marginLeft: "20px" }}>Student Leaves</h1>
            <div className="students">
              <div className="stud-optn">
                <select
                  className="student-options"
                  style={{ marginTop: "20px" }}
                >
                  <option>2022 - 2023</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Student                                 🔍"
                  className="search-student"
                />
              </div>
              <div className="stud-btn">
                <button
                  className="leave-btn"
                  style={{ marginTop: "10px" }}
                  onClick={handleOpenModal}
                >
                  + ADD NEW LEAVE
                </button>
              </div>
            </div>
          </div>
          <div>
            <table className="student-table">
              <thead className="student-heading">
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.map((item) => (
                  <tr key={item.id} className="student-body">
                    <td>{item.name}</td>
                    <td>{item.class}</td>
                    <td>{item.section}</td>
                    <td>{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Add New Leave</h2>
        <form onSubmit={handleAddName} className="leave-form">
          <input
            type="text"
            placeholder="name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="enter class"
            onChange={(e) => setStudentClass(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="enter section"
            onChange={(e) => setStudentSection(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Reasons"
            onChange={(e) => setReason(e.target.value)}
          />
          <br />

          <input type="submit" value="add" />
        </form>
      </Modal>
    </div>
  );
};

export default Home;
