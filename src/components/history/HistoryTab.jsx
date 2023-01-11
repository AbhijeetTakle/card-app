import React from "react";
import { Link } from "react-router-dom";

const HistoryTab = (props) => {
  const date = new Date(props.history.time).toISOString();
  return (
    <div className="history-item-tab">
      <h3>{date}</h3>
      <Link to={`${props.history.link}`}>{props.history.name}</Link>
    </div>
  );
};

export default HistoryTab;
