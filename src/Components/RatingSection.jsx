import React, { useState, useEffect } from "react";
import useAuth from "./Hooks/useAuth";
// import useAxiosSecure from "./Hooks/useAxiosSecure";
import useAxios from "./Hooks/useAxios";
// import useAxios from "../Hooks/useAxios";
// import useAuth from "../Hooks/useAuth"; // যদি auth context থাকে

const RatingSection = ({ postId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [ratings, setRatings] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);

  // Fetch ratings from backend
  const fetchRatings = async () => {
    try {
      const res = await axiosSecure.get(`/rating/${postId}`);
      setRatings(res.data);
    } catch (error) {
      console.error("Failed to fetch ratings", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Add or update rating
  const handleSubmit = async () => {
    if (!stars || !feedback) return;

    try {
      const res = await axiosSecure.post("/rating", { postId, feedback, stars });
      const newRating = res.data;

      // Update local state: remove old rating by this user
      setRatings([newRating, ...ratings.filter(r => r.userId !== user.id)]);
      setFeedback("");
      setStars(0);
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  };

  // Delete rating
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/rating/${id}`);
      setRatings(ratings.filter(r => r._id !== id));
    } catch (error) {
      console.error("Failed to delete rating", error);
    }
  };

  // Sort: user's rating on top, then newest first
  const sortedRatings = [...ratings].sort((a, b) => {
    if (a.userId === user.id) return -1;
    if (b.userId === user.id) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      {/* Add / Update Rating */}
      {user && (
        <div style={{
          marginBottom: "20px", padding: "15px", border: "1px solid #ccc",
          borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>Add / Update Your Rating</h3>
          <div style={{ margin: "10px 0" }}>
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                onClick={() => setStars(n)}
                style={{ cursor: "pointer", fontSize: "24px", color: n <= stars ? "#FFD700" : "#ccc", marginRight: "5px" }}
              >★</span>
            ))}
          </div>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
            rows={3}
            style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleSubmit}
            style={{ marginTop: "10px", padding: "8px 16px", borderRadius: "8px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Ratings List */}
      <div>
        {sortedRatings.map(r => (
          <div key={r._id} style={{
            display: "flex",
            gap: "15px",
            borderBottom: "1px solid #eee",
            padding: "15px 0",
            alignItems: "flex-start"
          }}>
            {/* Profile Pic */}
            <img
              src={r.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
              alt={r.name || "User"}
              style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
            />

            {/* Name + Stars + Feedback */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <strong>{r.userId === user?.id ? "You" : r.name || "Anonymous"}</strong>
                <div>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ color: n <= r.stars ? "#FFD700" : "#ccc", fontSize: "20px" }}>★</span>
                  ))}
                </div>
              </div>
              <p style={{ margin: "5px 0 0 0" }}>{r.feedback}</p>
              {r.userId === user?.id && (
                <button
                  onClick={() => handleDelete(r._id)}
                  style={{ marginTop: "5px", padding: "5px 10px", borderRadius: "5px", border: "1px solid #ff4d4f", backgroundColor: "#fff", color: "#ff4d4f", cursor: "pointer" }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSection;
