import React, {Component} from "react";
import "./table.css";
import TableRow from "./table-row/row";
import ItemFilter from "./filter-item/filter-item";
import UpdateFilter from "./filter-update/filter-update";
import {
  createUniqueList,
  sortByNewest,
  sortByOldest,
  searchActiveEl
} from "../../tools/tools";
import Button from "./button/button";

class Table extends Component {
  state = {
    data: this.props.data,
    dataFilter: this.props.data
  }

  createLangList = (data) => {
    let list = [];
    data.forEach((item) => list.push(item.language));
    const uniqueList = createUniqueList(list);
    return uniqueList;
  }

  langClickHandler = (evt) => {
    evt.preventDefault();
    const langList = document.getElementById("lang");
    const updateList = document.getElementById("update");
    const langLinks = langList.querySelectorAll(".dropdown-item");
    langLinks.forEach((link) => link.classList.remove("active"));
    evt.target.classList.add("active");
    let filterName = evt.target.innerText;
    if(evt.target.innerText === "content") {
      filterName = null;
    }

    let dataFilter;

    filterName !== "all"
    ? dataFilter = {
      items: this.state.data.items.filter(item => item.language === filterName)
    } : dataFilter = {
      items: this.state.data.items
    }

    const activeUpdate = searchActiveEl(updateList) || undefined;

    if(activeUpdate) {
      if(activeUpdate.innerText === "newest") dataFilter.items = sortByNewest(dataFilter.items);
      if(activeUpdate.innerText === "oldest") dataFilter.items = sortByOldest(dataFilter.items);
    }

    this.setState({
      dataFilter: dataFilter
    })
  }

  updateClickHandler = (evt) => {
    evt.preventDefault();
    const updateList = document.getElementById("update");
    const updateLinks = updateList.querySelectorAll(".dropdown-item");
    updateLinks.forEach((link) => link.classList.remove("active"));
    evt.target.classList.add("active");
    let filterName = evt.target.innerText;

    let sortData = {};
    filterName === "newest" ? sortData.items = sortByNewest([...this.state.dataFilter.items]) : sortData.items = sortByOldest([...this.state.dataFilter.items]);
    this.setState({
      dataFilter: sortData
    });
  }

  resetFilters = () => {
    this.setState({
      dataFilter: this.state.data
    })
  }

  render() {
    const langList = this.createLangList(this.state.data.items);
    langList.push("content","all");

    return (
      <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Avatar</th>
          <th scope="col">Name</th>
          <th scope="col">Login</th>
          <th scope="col">Rating</th>
          <th scope="col">
            <div className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Language</a>
              <div className="dropdown-menu" id="lang" x-placement="bottom-start">
                {langList.map((item) => <ItemFilter langClickHandler={this.langClickHandler} itemFilter={item} key={item} />)}
              </div>
            </div>
          </th>
          <th scope="col">
            <div className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Update</a>
              <div className="dropdown-menu" id="update" x-placement="bottom-start">
                {["newest", "oldest"].map((item, i) => <UpdateFilter updateClickHandler={this.updateClickHandler} itemFilter={item} key={i} />)}
              </div>
            </div>
          </th>
          <th scope="col">Link</th>
          <th className="th-button" scope="col">
            <Button name="Reset filters" resetFilters={this.resetFilters} />
          </th>
        </tr>
      </thead>

      <tbody id="reps-list">
        {this.state.dataFilter.items.map((item) => <TableRow item={item} key={item.id} />)}
      </tbody>
    </table>)
  }
}

export default Table;
