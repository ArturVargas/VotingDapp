import React, { Component } from "react";
import Swal from 'sweetalert2';

import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

import Home from "./containers/Home";

class App extends Component {
  state = {
    account: '',
    votingInstance: null,
    options: [],
    totalVotes: 0,
    loading: true
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      window.ethereum.on('accountsChanged', () => (
        window.location.reload()
      ));
      this.setState({ account: accounts[0] })

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const votingInstance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ votingInstance });
      const getOptions = await votingInstance.methods.getOptions().call();
      const getResults = await votingInstance.methods.results().call();
      this.setState({ totalVotes: getResults[0] });
      for (let i = 0; i < getOptions; i++) {
        const option = await votingInstance.methods.options(i).call();
        this.setState({ options: [...this.state.options, { id: option, numOfVotes: getResults[1][option] }] })
      }
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: 'Error al Cargar, asegurese de estar en la red Ropsten!!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  emmitedVote(idx) {
    this.setState({ loading: true });
    this.state.votingInstance.methods.vote(idx).send({ from: this.state.account })
      .once('receipt', async (receipt) => {
        Swal.fire({
          position: 'top-end',
          title: 'Ok!',
          text: 'Su voto se registro exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.setState({ loading: false });
          window.location.reload();
        });
      })
      .on('error', async (error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Error!',
          text: 'No puedes votar más de una vez..!!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.setState({ loading: false });
          window.location.reload();
        });
      });
  }

  constructor() {
    super()
    this.emmitedVote = this.emmitedVote.bind(this);
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {
          !this.state.votingInstance || this.state.loading
            ? <Spinner />
            : <Home
              options={this.state.options}
              totalVotes={this.state.totalVotes}
              emmitedVote={this.emmitedVote}
            />
        }
      </div>
    );
  }
}

export default App;
