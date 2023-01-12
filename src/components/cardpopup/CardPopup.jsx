import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardPopup.css";
const CardPopup = () => {
  const [cardd, setCard] = useState(null);
  const { card } = useParams();
  useEffect(() => {
    const setCardData = async () => {
      await axios
        .get(`https://card-app-backend.adaptable.app/api/card/cardId/${card}`)
        .then((res) => {
          const updateHistory = async () => {
            console.log("history request");
            const d = new Date();
            const time = d.getTime();
            await axios
              .post("https://card-app-backend.adaptable.app/api/history", {
                name: res.data.card.cardName,
                link: `/card/${res.data.card.cardVideo}`,
                time: time,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          };
          updateHistory();
          setCard((prev) => {
            return res.data.card;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setCardData();
  }, [card]);
  return (
    <div className="cardpopup-container">
      <div className="cardpopup-video">
        <iframe
          src={cardd != null ? cardd.cardVideo : ""}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="cardpopup-title">
        <h1>{cardd != null ? cardd.cardName : ""}</h1>
      </div>
    </div>
  );
};

export default CardPopup;
