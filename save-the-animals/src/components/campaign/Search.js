import React from "react";

function Search(props) {
  return (
    <input type="text" placeholder="Search" onChange={props.handleChange} />
  );
}

export default Search;
