import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCard.css";

const AddCard = () => {
  const [cardName, setCardName] = useState("");
  const [cardVideo, setCardVideo] = useState("");
  const [cardBasket, setCardBasket] = useState("");
  const [baskets, setBaskets] = useState(null);
  const navigate = useNavigate();
  const submitCardData = async (e) => {
    e.preventDefault();
    await axios
      .post("https://card-app-backend.adaptable.app/api/card/create", {
        cardName,
        cardVideo,
        cardBasket,
      })
      .then((res) => {
        document.querySelector(".submit-btn").value = res.data.message;
        document.querySelector(".submit-btn").style.backgroundColor = "green";
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        document.querySelector(".submit-btn").value = "Error";
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
    <div className="addcard-container">
      <div className="addcard-title">
        <h1>Enter Card Details.</h1>
      </div>
      <form className="addcard-form" onSubmit={submitCardData}>
        <label>Card Name</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setCardName((prev) => e.target.value);
          }}
        />
        <label>Card Video Link</label>
        <input
          type="text"
          placeholder="Link"
          onChange={(e) => {
            setCardVideo((prev) => e.target.value);
          }}
        />
        <label>Card Basket</label>
        <select
          onChange={(e) => {
            setCardBasket((prev) => e.target.value);
          }}
        >
          {baskets != null
            ? baskets.map((basket) => {
                return (
                  <option value={`${basket.name}`} key={`${basket._id}`}>
                    {basket.name}
                  </option>
                );
              })
            : ""}
        </select>
        <input type="submit" value="Create Card" className="submit-btn" />
      </form>
    </div>
  );
};

export default AddCard;
