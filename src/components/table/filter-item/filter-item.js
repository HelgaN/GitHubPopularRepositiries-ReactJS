import React from "react";

const ItemFilter = (props) => {
  return (
    <a className="dropdown-item" onClick={props.langClickHandler} href="#">{props.itemFilter}</a>
  )
}

export default ItemFilter;
