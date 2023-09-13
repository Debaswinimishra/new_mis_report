import React from "react";
import "./card.css";

const Card = ({ name, number, Icon, style }) => {
  return (
    <div className="wraper">
      <div>
        <h4>{name}</h4>
        <div>
          <h1>{number}</h1>
        </div>
      </div>

      <div className="icon__cnt " style={style}>
        <Icon className="icon" />
      </div>
    </div>
  );
};

export default Card;
