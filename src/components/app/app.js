import React, { Component } from "react";
import Layout from "../../hoc/layout/layout";
import Title from "../title/title";
import Table from "../table/table";
import GitHubService from "../../services/github-service";


class App extends Component {
  service = new GitHubService();

  state = {
    data: null,
    loading: true
  }

  async componentDidMount () {
    try {
      const response = await this.service.getPopularRepositories();
      this.setState({
        data: response,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout loading={this.state.loading}>
        <Title/>
        {this.state.loading ? null : <Table loading={this.state.loading} data={this.state.data} />}
      </Layout>
    );
  }
}

export default App;
