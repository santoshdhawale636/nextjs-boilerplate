"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    churchName: "",
    location: "",
    roleType: "",
    description: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/pastor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("✅ Role submitted successfully!");
      setFormData({
        churchName: "",
        location: "",
        roleType: "",
        description: "",
        contact: "",
      });
    } else {
      setMessage("❌ Failed to submit role.");
    }
  };

  return (
    <main style={{ padding: "40px", maxWidth: "600px" }}>
      <h1>Pastor Role Finder 🚀</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          name="churchName"
          placeholder="Church Name"
          value={formData.churchName}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          name="roleType"
          placeholder="Role Type (Senior / Youth / Worship)"
          value={formData.roleType}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Role Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Contact Email / Phone"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Role</button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </main>
  );
}
