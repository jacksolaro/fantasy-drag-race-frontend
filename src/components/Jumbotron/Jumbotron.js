import React from "react";
import "./Jumbotron.css";

function Jumbotron(props) {
  const jumbotron__style = {
    backgroundImage: `url(${props.image})`,
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default Jumbotron;
