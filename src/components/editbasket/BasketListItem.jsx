import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BasketListItem = (props) => {
  return (
    <div
      className="basket-list-item-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <h3>{props.basket.name}</h3>
      <Link to={`/updateBasket/${props.basket._id}`}>Edit</Link>
      <Link
        onClick={async (e) => {
          await axios
            .delete(
              `https://card-app-backend.adaptable.app/api/basket/${props.basket._id}`
            )
            .then((res) => window.location.reload());
        }}
      >
        Delete
      </Link>
    </div>
  );
};

export default BasketListItem;
