import React from "react";
import { FaDatabase, FaJsSquare, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiDjango, SiCplusplus } from "react-icons/si";

const programmingCategories = [
  { id: 1, name: "MongoDB", icon: <SiMongodb size={40} /> },
  { id: 2, name: "JavaScript", icon: <FaJsSquare size={40} /> },
  { id: 3, name: "Python", icon: <FaPython size={40} /> },
  { id: 4, name: "HTML5", icon: <FaHtml5 size={40} /> },
  { id: 5, name: "CSS3", icon: <FaCss3Alt size={40} /> },
  { id: 6, name: "React", icon: <FaReact size={40} /> },
  { id: 7, name: "Node.js", icon: <FaNodeJs size={40} /> },
  { id: 8, name: "Django", icon: <SiDjango size={40} /> },
  { id: 9, name: "C++", icon: <SiCplusplus size={40} /> },
  { id: 10, name: "Database Design", icon: <FaDatabase size={40} /> },
];

const popularCategories = () => {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: "#181818", color: "#e0e0e0", padding: "50px 20px" }}>
      <h2 className="text-yellow-400" style={{ textAlign: "center", fontSize: "32px", marginBottom: "40px" }}>
        Popular Programming Categories
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "25px",
      }}>
        {programmingCategories.map(cat => (
          <div key={cat.id} style={{
            backgroundColor: "#242424",
            padding: "25px 15px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
          }}
          >
            <div style={{ marginBottom: "15px", color: "#e0e0e0" }}>
              {cat.icon}
            </div>
            <h3 style={{ fontSize: "18px" }}>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default popularCategories;
