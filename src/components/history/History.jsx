import axios from "axios";
import React, { useEffect, useState } from "react";
import HistoryTab from "./HistoryTab";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState(null);
  useEffect(() => {
    const getHistory = async () => {
      await axios
        .get(`https://card-app-backend.adaptable.app/api/history`)
        .then((res) => {
          setHistory((prev) => res.data.result);
        });
    };
    getHistory();
  }, []);
  return (
    <div className="history-container">
      <h1>History</h1>
      {history != null
        ? history.map((hist) => <HistoryTab history={hist} key={hist._id} />)
        : ""}
    </div>
  );
};

export default History;
