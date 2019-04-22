import React from "react";

const UpdateFilter = (props) => {
  return (
    <a className="dropdown-item" onClick={props.updateClickHandler} href="#">{props.itemFilter}</a>
  )
}

export default UpdateFilter;
