import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import "./CardsBar.css";
const CardsBar = () => {
  const { basketName } = useParams();
  const [cards, setCards] = useState(null);
  useEffect(() => {
    const loadCards = async () => {
      await axios
        .get(
          `https://card-app-backend.adaptable.app/api/card/basket/${basketName}`
        )
        .then((res) => {
          setCards((prev) => res.data.cards);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadCards();
  }, [basketName]);
  return (
    <div className="cardsbar-container">
      <div className="cards-container">
        {cards != null
          ? cards.map((card) => <Card card={card} key={card._id} />)
          : ""}
        <Link className="add-card-btn" to={"/addcard"}>
          add
        </Link>
      </div>
    </div>
  );
};

export default CardsBar;
