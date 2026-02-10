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
  const [formData, setFormData] = useState({
    churchName: "",
    location: "",
    roleType: "",
    description: "",
    contact: "",
  });

  const fetchRoles = async () => {
    const res = await fetch("/api/pastor");
    const data = await res.json();
    setRoles(data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/pastor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      churchName: "",
      location: "",
      roleType: "",
      description: "",
      contact: "",
    });

    fetchRoles(); // auto refresh
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Pastor Role Finder 🚀</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <input
          name="churchName"
          placeholder="Church Name"
          value={formData.churchName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="roleType"
          placeholder="Role Type (Senior / Youth / Worship)"
          value={formData.roleType}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Role Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="contact"
          placeholder="Contact Email / Phone"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Submit Role</button>
      </form>

      <hr />

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

