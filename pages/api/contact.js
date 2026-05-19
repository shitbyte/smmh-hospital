import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
      } else {
        setStatus(data.error || "Failed to send.");
      }
    } catch (error) {
      setStatus("Server error.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Send</button>
      </form>

      <p>{status}</p>
    </div>
  );
}