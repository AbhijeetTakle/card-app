import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
const Card = (props) => {
  const navigate = useNavigate();
  const deleteCard = async (e) => {
    await axios.delete(
      `https://card-app-backend.adaptable.app/api/card/update/${props.card._id}`
    );
    window.location.reload();
  };
  return (
    <div
      className="card-container"
      onClick={(e) => navigate(`/card/${props.card._id}`)}
    >
      <div className="video-container">
        <iframe
          src={props.card.cardVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="title-container">{props.card.cardName}</div>
      <div className="links-container">
        <Link to={`/editcard/${props.card._id}`}>Edit</Link>
        <Link onClick={deleteCard}>Delete</Link>
      </div>
    </div>
  );
};

export default Card;
