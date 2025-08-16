import React, { useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simple frontend validation
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }
    // API call placeholder
    // axios.post("/subscribe", { email }) ...
    setMessage("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div style={{ backgroundColor: "#181818", color: "#e0e0e0", padding: "50px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "15px" }}><span className="text-yellow-400">Stay Updated!</span></h2>
      <p style={{ fontSize: "16px", marginBottom: "25px", maxWidth: "500px", margin: "0 auto 25px" }}>
        Subscribe to our newsletter to get the latest discussions and updates from our forum.
      </p>
      <form onSubmit={handleSubscribe} style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #444",
            outline: "none",
            minWidth: "250px",
            fontSize: "16px",
            backgroundColor: "#242424",
            color: "#e0e0e0"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 25px",
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "#e0e0e0",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#555"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#333"}
        >
          Subscribe
        </button>
      </form>
      {message && <p style={{ marginTop: "15px", fontSize: "14px", color: "#FFD700" }}>{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
