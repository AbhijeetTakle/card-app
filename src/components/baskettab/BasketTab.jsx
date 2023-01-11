import React, { useState, useEffect } from "react";
import "./BasketTab.css";
import axios from "axios";
import Tab from "./Tab";
import { Link } from "react-router-dom";

const BasketTab = () => {
  const [baskets, setBaskets] = useState(null);
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
    <section className="nav-container">
      <div className="history-tab-container">
        <div className="history-tab">
          <Link to={"/history"}>History</Link>
        </div>
      </div>
      <div className="tabs-container">
        <Tab basket={{ name: "All" }} />
        {baskets != null
          ? baskets.map((tab) => <Tab basket={tab} key={tab._id} />)
          : ""}
      </div>
      <div className="edit-basket-container">
        <div className="edit-basket">
          <Link to={"/editbaskets"}>edit/add baskets</Link>
        </div>
      </div>
    </section>
  );
};

export default BasketTab;
