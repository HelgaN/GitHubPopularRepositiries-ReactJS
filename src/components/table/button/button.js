import React from "react";

const Button = (props) => {
  return (
    <button type="button" onClick={props.resetFilters} className="btn btn-secondary btn-reset">{props.name}</button>
  );
}

export default Button;
