import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

import Home from "./containers/Home";

class App extends Component {
  state = { account: '', votingInstance: null, options: [], loading: true };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      console.log(this.state.account);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const votingInstance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ votingInstance });
      const getOptions = await votingInstance.methods.getOptions().call();
      for(let i=0; i < getOptions; i++) {
        const option = await votingInstance.methods.options(i).call();
        this.setState({ options: [...this.state.options, { id: option, numOfVotes: [] }]})
      }
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {
          !this.state.votingInstance || this.state.loading
          ? <Spinner />
          : <Home options={this.state.options} />
        }
      </div>
    );
  }
}

export default App;
