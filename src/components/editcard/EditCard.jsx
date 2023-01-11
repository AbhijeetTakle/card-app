import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCard.css";

const EditCard = () => {
  const { cardId } = useParams();
  const [cardName, setCardName] = useState("");
  const [cardVideo, setCardVideo] = useState("");
  const [cardBasket, setCardBasket] = useState("");
  const [baskets, setBaskets] = useState(null);
  const navigate = useNavigate();
  const submitCardData = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `https://card-app-backend.adaptable.app/api/card/update/${cardId}`,
        {
          cardName,
          cardVideo,
          cardBasket,
        }
      )
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
    const setCardData = async () => {
      await axios
        .get(`https://card-app-backend.adaptable.app/api/card/cardId/${cardId}`)
        .then((res) => {
          document.querySelector(".card-name").value = res.data.card.cardName;
          document.querySelector(".card-link").value = res.data.card.cardVideo;
          document.querySelector(".card-basket").value =
            res.data.card.cardBasket;
          setCardName((prev) => {
            return document.querySelector(".card-name").value;
          });
          setCardVideo((prev) => {
            return document.querySelector(".card-link").value;
          });
          setCardBasket((prev) => {
            return document.querySelector(".card-basket").value;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setCardData();
    const getBaskets = async () => {
      await axios
        .get("https://card-app-backend.adaptable.app/api/basket")
        .then((res) => {
          setBaskets((previous) => res.data.result);
        });
    };
    getBaskets();
  }, [cardId]);
  return (
    <div className="editcard-container">
      <div className="editcard-title">
        <h1>Enter Card Details.</h1>
      </div>
      <form className="editcard-form" onSubmit={submitCardData}>
        <label>Card Name</label>
        <input
          className="card-name"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setCardName((prev) => e.target.value);
          }}
        />
        <label>Card Video Link</label>
        <input
          className="card-link"
          type="text"
          placeholder="Link"
          onChange={(e) => {
            setCardVideo((prev) => e.target.value);
          }}
        />
        <label>Card Basket</label>
        <select
          className="card-basket"
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

export default EditCard;
