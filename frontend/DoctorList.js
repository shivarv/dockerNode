import React, { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Alice Smith",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Cardiologist with 10 years of experience in heart care."
  },
  {
    id: 2,
    name: "Dr. John Doe",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    description: "Orthopedic surgeon specializing in sports injuries."
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    description: "Pediatrician passionate about child health and wellness."
  }
];

function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Choose a Doctor:</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {doctors.map(doc => (
          <li key={doc.id}>
            <button
              style={{
                background: doc.id === selectedDoctor.id ? "#e0e0e0" : "#fff",
                border: "1px solid #ccc",
                padding: "8px 12px",
                margin: "4px",
                cursor: "pointer"
              }}
              onClick={() => setSelectedDoctor(doc)}
            >
              {doc.name}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <img
          src={selectedDoctor.image}
          alt={selectedDoctor.name}
          style={{ width: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          <h3>{selectedDoctor.name}</h3>
          <p>{selectedDoctor.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;