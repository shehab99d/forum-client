import React, { useState } from "react";

// 20 Dummy Ratings
const dummyRatings = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=5", stars: 5, feedback: "This forum is amazing! I found so many useful resources." },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=6", stars: 4, feedback: "Great platform for discussions and learning." },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=7", stars: 5, feedback: "Loved the community here. Very helpful and friendly!" },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/150?img=8", stars: 3, feedback: "It's good but needs a few improvements in navigation." },
  { id: 5, name: "Eva", avatar: "https://i.pravatar.cc/150?img=9", stars: 4, feedback: "Very informative posts and active members." },
  { id: 6, name: "Frank", avatar: "https://i.pravatar.cc/150?img=10", stars: 5, feedback: "Absolutely love this forum!" },
  { id: 7, name: "Grace", avatar: "https://i.pravatar.cc/150?img=11", stars: 4, feedback: "Nice design and smooth experience." },
  { id: 8, name: "Hannah", avatar: "https://i.pravatar.cc/150?img=12", stars: 5, feedback: "Highly recommend to anyone looking for guidance." },
  { id: 9, name: "Ian", avatar: "https://i.pravatar.cc/150?img=13", stars: 3, feedback: "Good forum but some threads are outdated." },
  { id: 10, name: "Jack", avatar: "https://i.pravatar.cc/150?img=14", stars: 5, feedback: "The best forum I have ever joined!" },
  { id: 11, name: "Kate", avatar: "https://i.pravatar.cc/150?img=15", stars: 4, feedback: "Helpful community and engaging discussions." },
  { id: 12, name: "Leo", avatar: "https://i.pravatar.cc/150?img=16", stars: 5, feedback: "Forum content is well organized and clear." },
  { id: 13, name: "Mia", avatar: "https://i.pravatar.cc/150?img=17", stars: 4, feedback: "Good platform for beginners and experts alike." },
  { id: 14, name: "Nina", avatar: "https://i.pravatar.cc/150?img=18", stars: 5, feedback: "I learned a lot from this forum. Excellent!" },
  { id: 15, name: "Oscar", avatar: "https://i.pravatar.cc/150?img=19", stars: 5, feedback: "Supportive community and active members." },
  { id: 16, name: "Paul", avatar: "https://i.pravatar.cc/150?img=20", stars: 4, feedback: "Great platform, very user-friendly." },
  { id: 17, name: "Quinn", avatar: "https://i.pravatar.cc/150?img=21", stars: 5, feedback: "I found answers to all my questions here." },
  { id: 18, name: "Rachel", avatar: "https://i.pravatar.cc/150?img=22", stars: 4, feedback: "Helpful community and clear discussions." },
  { id: 19, name: "Steve", avatar: "https://i.pravatar.cc/150?img=23", stars: 5, feedback: "Amazing forum with friendly members." },
  { id: 20, name: "Tina", avatar: "https://i.pravatar.cc/150?img=24", stars: 4, feedback: "Very well organized and informative." },
];

const ForumTestimonials = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedRatings = showAll ? dummyRatings : dummyRatings.slice(0, 10);

  return (
    <div style={{ backgroundColor: "#181818", color: "#e0e0e0", padding: "40px 20px" }}>
      <h2 className="text-yellow-400"
      style={{ textAlign: "center", fontSize: "32px", marginBottom: "30px" }}>What Our Forum Members Say</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}>
        {displayedRatings.map(r => (
          <div key={r.id} style={{
            backgroundColor: "#242424",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            transition: "transform 0.2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={r.avatar} alt={r.name} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <strong style={{ fontSize: "16px" }}>{r.name}</strong>
                <div>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ color: n <= r.stars ? "#FFD700" : "#555", fontSize: "18px" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{r.feedback}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "#e0e0e0",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#555"}
          onMouseLeave={e => e.target.style.backgroundColor = "#333"}
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default ForumTestimonials;
