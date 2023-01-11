import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateBasket.css";

const UpdateBasket = () => {
  const { basketId } = useParams();
  const [basketName, setBasketName] = useState(null);
  const navigate = useNavigate();
  const updateBasketData = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/basket/${basketId}`, {
        basketName,
      })
      .then((res) => {
        document.querySelector(".basket-update-btn").value = res.data.message;
        console.log(
          (document.querySelector(".basket-update-btn").style.backgroundColor =
            "green")
        );
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
    const getBasket = async () => {
      await axios
        .get(`http://localhost:5000/api/basket/${basketId}`)
        .then((res) => {
          setBasketName((previous) => res.data.result);
          document.querySelector(".basket-name-update").value =
            res.data.result.name;
        });
    };
    getBasket();
  }, [basketId]);
  return (
    <div className="update-form-container">
      <h1 style={{ textAlign: "center" }}>Update Basket</h1>
      <form onSubmit={updateBasketData}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          className="basket-name-update"
          onChange={(e) => {
            setBasketName((prev) => e.target.value);
          }}
        />
        <input type="submit" className="basket-update-btn" />
      </form>
    </div>
  );
};

export default UpdateBasket;
