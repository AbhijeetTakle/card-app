import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasketListItem from "./BasketListItem";
import "./EditBasket.css";

const EditBasket = () => {
  const [baskets, setBaskets] = useState(null);
  const [basketName, setBasketName] = useState("");
  const navigate = useNavigate();
  const submitBasketData = async (e) => {
    e.preventDefault();
    await axios
      .post("https://card-app-backend.adaptable.app/api/basket", {
        name: basketName,
      })
      .then((res) => {
        document.querySelector(".basket-submit-btn").value = res.data.message;
        console.log(
          (document.querySelector(".basket-submit-btn").style.backgroundColor =
            "green")
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        document.querySelector(".basket-submit-btn").value = "Error";
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };
  useEffect(() => {
    const getBaskets = async () => {
      await axios
        .get("https://card-app-backend.adaptable.app/api/basket")
        .then((res) => {
          setBaskets((previous) => res.data.result);
        });
    };
    getBaskets();
  }, []);
  return (
    <div className="editbaskets-container">
      <div className="basket-list-container">
        <h1 style={{ textAlign: "center" }}>Update Baskets</h1>
        {baskets != null
          ? baskets.map((tab) => <BasketListItem basket={tab} key={tab._id} />)
          : ""}
      </div>
      <div className="create-form-container">
        <h1 style={{ textAlign: "center" }}>Create Basket</h1>
        <form onSubmit={submitBasketData}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setBasketName((prev) => e.target.value);
            }}
          />
          <input type="submit" className="basket-submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default EditBasket;
