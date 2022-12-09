import React from "react";
import { useNavigate } from "react-router-dom";

const CardEvent = ({ item }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/detail/${item.id}`);
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={item.image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.price}</p>
        <button
          onClick={() => handleDetail(item.id)}
          href="#"
          className="btn btn-primary"
        >
          Go somewhere
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
