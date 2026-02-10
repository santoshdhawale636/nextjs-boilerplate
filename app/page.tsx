"use client";

import { useEffect, useState } from "react";

interface PastorRole {
  id: string;
  churchName: string;
  location: string;
  roleType: string;
  description: string;
  contact: string;
}

export default function Home() {
  const [roles, setRoles] = useState<PastorRole[]>([]);

  useEffect(() => {
    fetch("/api/pastor")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Pastor Role Finder 🚀</h1>

      <hr style={{ margin: "40px 0" }} />

      <h2>Open Pastor Roles</h2>

      {roles.length === 0 ? (
        <p>No roles posted yet.</p>
      ) : (
        roles.map((role) => (
          <div
            key={role.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{role.churchName}</h3>
            <p><strong>Location:</strong> {role.location}</p>
            <p><strong>Role:</strong> {role.roleType}</p>
            <p>{role.description}</p>
            <p><strong>Contact:</strong> {role.contact}</p>
          </div>
        ))
      )}
    </div>
  );
}

