import React, {Component} from "react";
import "./layout.css";

class Layout extends Component {
  render() {
    return (
      <main className="main">
        <div className={this.props.loading ? "jumbotron preloader" : "jumbotron"}>
          { this.props.children }
        </div>
      </main>
    )
  }
}

export default Layout;
