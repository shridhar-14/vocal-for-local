import React from "react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  let { _id, StoreName, StoreImage } = store;
  const borderColor = "rgb(0, 62, 125)";

  return (
    <div
      className="card"
      style={{ border: `2px solid ${borderColor}` }}
    >
      <img
        src={StoreImage}
        className="card-img-top"
        alt="..."
        style={{ height: "240px", border: `2px solid ${borderColor}` }}
      />
      <div
        className="card-body"
        style={{ borderTop: `2px solid ${borderColor}` }}
      >
        <h5
          className="card-title"
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "cursive",
            color: borderColor,
          }}
        >
          {StoreName}
        </h5>
        <Link
          to={`/${_id}`}
          className="btn"
          style={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgb(0, 159, 173)",
          }}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;
