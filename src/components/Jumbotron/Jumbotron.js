import React from "react";
import "./Jumbotron.css";

function Jumbotron(props) {
  const jumbotron__style = {
    // backgroundImage: `url(${props.image})`,
    height: `${props.height}px`,
  };
  return (
    <div>
      <div className="jumbotron__main" style={jumbotron__style}>
        <div className="jumbotron__content">
          <h1 className="jumbotron__title">
            <strong>{props.headline}</strong>
          </h1>
          <img className="jumbotron__logo" src={props.logo}></img>
          <p className="jumbotron__subtitle">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
