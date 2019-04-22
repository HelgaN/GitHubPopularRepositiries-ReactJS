import React from "react";

const TableRow = (props) => {
  const item = {...props.item};

  return (
    <tr className="table-light">
      <td><img className="avatar" src={item.owner.avatar_url} alt={item.owner.login} /></td>
      <td>{item.name}</td>
      <td>{item.owner.login}</td>
      <td>{item.stargazers_count}</td>
      <td>{item.language !== null ? item.language : "content"}</td>
      <td>{item.updated_at.slice(0, 10)} {item.updated_at.slice(11, -1)}</td>
      <td colSpan="2">
        <a className="table-link" href={item.svn_url}>{item.svn_url}</a>
      </td>
    </tr>
  )
}

export default TableRow;
